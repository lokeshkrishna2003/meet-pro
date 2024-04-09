'use client'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import React from 'react'


const Table = ({title,description}:{title:string,description:string}) => (
  <div className='flex flex-col items-start gap-2 xl:flex-row'>
    <h1 className='text-base font-medium text-sky-1 lg:text-xl xl:min-w-32'>
      {title} :
    </h1>
    <h1 className='truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl'>
      {description} 
    </h1>
  </div>
)

const PersonalRoom = () => {
  const {user} = useUser()
  const meeting_id = user?.id
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting_id}?personal=true`

  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <h1 className='text-3xl font-bold '>
        PersonalRoom
        </h1>
        <div className='flex w-full flex-col gap-8 xl:max-w-[900px]'>
<Table title='Topic' description={`${user?.username}'s Meeting Room`} />
<Table title='Meeting Id' description={meeting_id!} />
<Table title='Invite Link' description={meetingLink} />
        </div>
        <div className='flex gap-5'>
          <Button className='bg-blue-1' onClick={}>

          </Button>

        </div>
    </section>
  )
}

export default PersonalRoom
