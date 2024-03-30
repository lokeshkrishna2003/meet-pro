'use client'
import { useRouter } from 'next/router'
import Image from 'next/image'
import React, { useState } from 'react'
import HomeCard from './HomeCard'
import MeetingModal from './MeetingModal'

const MeetingTypeList = () => {

    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    const createMeeting = () => {
        
    }

  return (
    <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
      <HomeCard 
        img='/icons/add-meeting.svg'
        title='New Meeting'
        description='Start an instant meeting'
        handleClick={()=>setMeetingState('isJoiningMeeting')}
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
