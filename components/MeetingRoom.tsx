'use client'
import { PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React from 'react'
import { useState } from 'react'
type CallLayoutType = 'grid' | 'speaker-right' | 'speaker-left'

const MeetingRoom = () => {
    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')
    const CallLayout = ()=>{
        switch(layout){
            case 'grid':
                return <PaginatedGridLayout/>
            case 'speaker-right': 
            return <SpeakerLayout participantsBarPosition="left"/>
            default :
                return <SpeakerLayout participantsBarPosition="right"/>
            
        }
    }
  return (
    <section className='relative h-screen w-full overflow-hidden pt-4 text-white'>
        <div className='relative flex size-full items-center justify-center'>
            <div className='flex size-full max-w-[1000px] items center'>
                
<CallLayout/>
            </div>

        </div>
 
    </section>
  )
}

export default MeetingRoom
