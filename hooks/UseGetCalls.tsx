import { useUser } from "@clerk/nextjs"
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk"
import { error } from "console"
import { useEffect, useState } from "react"

export const UseGetCalls = ()=>{
const [Calls,setCalls] = useState<Call[]>([])
const [isLoading,setisLoading] = useState(false)
const client = useStreamVideoClient()
const {user} = useUser()

useEffect(()=>{
    const loadCalls = async ()=>{
        if(!client || !user?.id) return
        setisLoading(true)
        try{
            const {calls} = await client.queryCalls({
                sort:[{
                    field:'starts_at' ,direction:-1
                }],
                filter_conditions:{
                    starts_at:{$exists:true},
                    $or : [{created_by_user_id:user.id},
                    {members:{$in:[user.id]}}]
                }
            })
            setCalls(calls)
        }
        catch(err){
            console.log(err)
        }
        finally{
            setisLoading(false)
        }
    }
    loadCalls()

},[client,user?.id])
const now = new Date()
const endedCalls = Calls.filter(({state:{startsAt,endedAt}}:Call)=>{
    return (startsAt && new Date(startsAt) < now || !!endedAt)
})
const upcomingCalls = Calls.filter(({state:{startsAt}}:Call)=>{
return (startsAt && new Date(startsAt) > now)
})
let CallRecordings;
return {
    endedCalls, CallRecordings:Calls, upcomingCalls , isLoading
}
}