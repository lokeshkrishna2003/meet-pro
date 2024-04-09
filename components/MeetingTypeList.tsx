'use client'

import Image from 'next/image'
import React, { useState } from 'react'
import { useToast } from "@/components/ui/use-toast"

import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import { Textarea } from './ui/textarea'
import ReactDatePicker from 'react-datepicker'




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
    const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`

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
      {!callDetails ? (
        <MeetingModal
        isOpen={meetingState ==='isScheduleMeeting'}
        onClose={()=>setMeetingState(undefined)}
        title='creating meeting'
        handleClick = {createMeeting}>
          <div className='flex flex-col gap-2.5'> 
          <label className='text-base text-normal leading-[22px] text-sky-2'>
          Add a description
          <Textarea className='border-none bg-dark-2 focus-visible:ring-0 focus-visible-ring-offseet-0' onChange={(e)=>{
            setValues({...values , description : e.target.value})
          }}/>
          </label>
          </div>
          <div className='flex w-full flex-col gap-2.5'>
          <label className='text-base text-normal leading-[22px] text-sky-2'>
            Select Date and Time
            </label>
            <ReactDatePicker 
            selected={values.dateTime}
            onChange={(e)=>{setValues({...values,dateTime : e!})}}
            showTimeSelect
            timeFormat='HH:mm'
            timeIntervals={15}
            timeCaption='time'
            dateFormat='MMMM d,yyyy h:mm aa'
            className='w-full rounded bg-dark-2 p-2 focus:outline-none'
            />

          </div>
        </MeetingModal>
      ):(
        <MeetingModal
      isOpen={meetingState ==='isScheduleMeeting'}
      onClose={()=>setMeetingState(undefined)}
      title='meeting created'
      className = 'text-center'
      buttonText='copy meeting Link'
      handleClick = {()=>{
        navigator.clipboard.writeText(meetingLink)
        toast({
          title : 'Link copied'
        })
      
      }}
      image='/icons/checked.svg'
      buttonIcon='/icons/copy.svg'
      
/>
      )}

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
