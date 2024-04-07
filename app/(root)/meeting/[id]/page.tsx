"use client"
import { useUser } from '@clerk/nextjs'
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const Meeting = ({params}:{params:{id:string}}) => {
  const {user, isLoaded} = useUser()
  const [isSetUpComplete, setIsSetUpComplete] = useState(false)
  return (
   <main className='h-screen w-full text-white'>
    <StreamCall>
      <StreamTheme>
        {!isSetUpComplete ? (
          'meeting setup'
        ): (
          'meeting room'
        )}
      </StreamTheme>
    </StreamCall>

   </main>
  )
}

export default Meeting
