'use client'
import { DeviceSettings, VideoPreview, useCall } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'


const MeetingSetup = ({setIsSetUpComplete}:{setIsSetUpComplete : (value : boolean)=> void}) => {
    const [isMicCamToggleOn, setIsMicCamToggleOn] = useState(false)

    const call = useCall()
    if(!call){
        throw new Error('use call must be used within stream call component')
    }
    useEffect(()=>{
        if(isMicCamToggleOn){
            call?.microphone.disable()
            call?.camera.disable()
        } else{
            call?.microphone.enable()
            call?.camera.enable()
        }

    },[isMicCamToggleOn , call?.microphone,call?.camera])
  return (
    <div className='flex max-h-[300px] w-[400px] flex-col items-center justify-center gap-3 text-white'>
        <h1 className='text-2xl font-bold'>
            Setup
        </h1>
        <VideoPreview />
        <div className='flex h-16 items-center justify-center gap-3'>
            <label className='flex items-center justify-center gap-2 font-medium'>

            
            <input type='checkbox' checked={isMicCamToggleOn} onChange={(e)=>setIsMicCamToggleOn(e.target.checked)}/>
            join with mic and camera off
            </label>
            <DeviceSettings/>
        </div>
        <Button className='rounded-md bg-green-500  px-4 py-2.5' onClick={()=>{
            call.join()
            setIsSetUpComplete(true)
        }}>
            Join Meeting
        
        </Button>
     
    </div>
  )
}

export default MeetingSetup
