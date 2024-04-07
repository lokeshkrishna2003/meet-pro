'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'



const MeetingTypeList = () => {
    const router = useRouter()


    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    //stream video and audio 
    const {user } = useUser()
    const client = useStreamVideoClient()
    const [values, setValues] = useState({
      dateTime: new Date(),
      description:'',
      link:'',
    })
    const [callDetails, setCallDetails] = useState<Call>()
    const { toast } = useToast()
    
    const createMeeting =async () => {
      if(!user || !client) return;

      try{
        if(!values.dateTime){
          toast({
            title: "Please select a date and time",
          })
          return
        }
        const id = crypto.randomUUID()
        const call = client.call('default',id)
        if(!call) throw new Error('failed to create a call')
        const startsAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString()
      const description = values.description || 'instant meeting'

      await call.getOrCreate({
        data:{
          starts_at:startsAt,
          custom:{
            description
          }
        }
      })
      setCallDetails(call)
      if(!values.description){
        router.push(`/meeting/${id}`)  
      }
      toast({
        title: "Meeting created successfully",
      })

      }
      catch(error){
        console.log(error)
        toast({
          title: "Failed to create meeting",
        })
      }
    }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard 
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={()=>setMeetingState('isInstantMeeting')}
        color='bg-orange-1'
      
      />
      <HomeCard 
      img='/icons/schedule.svg'
      title='schedule Meeting'
      description='plan your meeting'
      handleClick={()=>setMeetingState('isScheduleMeeting')}
      color='bg-blue-1'
      />
      <HomeCard 
      img='/icons/recordings.svg'
      title='view recordings'
      description='checkout your recordings'
      handleClick={()=>{
        const router = useRouter()
        router.push('/recordings')
      
      }}
      color='bg-purple-1'
      />
      <HomeCard 
      img='/icons/join-meeting.svg'
      title='join Meeting'
      description='via invitation Link'
      handleClick={()=>setMeetingState('isJoiningMeeting')}
      color='bg-yellow-1'
      />

      <MeetingModal
      isOpen={meetingState ==='isInstantMeeting'}
      onClose={()=>setMeetingState(undefined)}
      title='Start an instant meeting'
      className = 'text-center'
      buttonText='Start Meeting'
      handleClick = {createMeeting}

        
      
      />
    </section>
  )
}

export default MeetingTypeList
