'use client'
import { UseGetCalls } from '@/hooks/UseGetCalls'
import { Call, CallRecording } from '@stream-io/video-react-sdk'
import { useRouter } from 'next/navigation'
import React from 'react'
import MeetingCard from './MeetingCard'


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
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
      {calls && calls.length>0 ? calls.map((meeting:Call|CallRecording)=>(
        <MeetingCard/>
      )) : (
        <h1>
          {noCallMessage}
        </h1>
      ) }
    </div>
  )
}

export default CallList
