//@ts-nocheck
'use client'
import { UseGetCalls } from '@/hooks/UseGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
import MeetingCard from './MeetingCard'
import Loader from './Loader'


const CallList = ({type}:{type : 'ended' | 'upcoming' | 'recordings'}) => {
    const {upcomingCalls,endedCalls,recordings, isLoading} = UseGetCalls()
    const router = useRouter()
    const getCalls = ()=>{
        switch(type){
            case 'ended':
                return endedCalls
            case 'upcoming':
                return upcomingCalls
            case 'recordings':
                return recordings
            default:
              return []
            
        }
    }
    const getNoCallMessage = ()=>{
        switch(type){
            case 'ended':
                return 'No previous calls found'
            case 'upcoming':
                return 'No upcoming calls found'
            case 'recordings':
                return 'No recordings found'
            default:
              return ''
            
        }
    }
    const calls = getCalls()
    const noCallMessage = getNoCallMessage()
    if(isLoading){
        return <Loader/>
    }
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length>0 ? calls.map((meeting:Call|CallRecording)=>(
        <MeetingCard
        key={(meeting as Call).id}
        icon ={type==='ended'?'/icons/previous.svg':type==='upcoming'?'/icons/upcoming.svg':'/icons/Video.svg'}
        title ={(meeting as Call).state.custom.description.substring(0,20)}
        date ={(meeting as Call).state.startsAt?.toLocaleString()||(meeting as Call).start_time.toLocaleString()}
        isPreviousMeeting ={type==='ended'}
        buttonIcon1 ={type==='recordings'?'/icons/play.svg':undefined}
        handleClick ={type==='recordings'?()=>router.push(`${meeting.url}`):()=>router.push(`meeting/${meeting.id}`)}
        link ={type==='recordings'?`${meeting.url}`:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
        buttonText =
        {type==='recordings'?'play':'start'}             
      />
      )) : (
        <h1>
          {noCallMessage}
        </h1>
      ) }
    </div>
  )
}

export default CallList
