'use client'
import MeetingTypeList from '@/components/MeetingTypeList';
import React, { useEffect, useState } from 'react'


const page = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    // Function to update the current date and time every minute
    const updateDateTime = () => {
      setCurrentDateTime(new Date());
    };
    // Set timeout to update the date and time every minute (60000 milliseconds)
    const timerId = setTimeout(updateDateTime, 1000);

    // Clear timeout on component unmount
    return () => clearTimeout(timerId);
  }, [currentDateTime]);


  // Function to format the date as "Saturday, March 29, 2024"
  const formatDate = (date:Date) => {
    let dateOptions: Intl.DateTimeFormatOptions = {
      weekday: 'long', // 'long', 'short', or 'narrow'
      year: 'numeric', // 'numeric' or '2-digit'
      month: 'long', // 'numeric', '2-digit', 'long', 'short', or 'narrow'
      day: 'numeric' // 'numeric' or '2-digit'
  };
    return date.toLocaleDateString('en-US', dateOptions);
  };

  // Function to format the time as "11:30 AM"
  const formatTime = (date:Date) => {
    let timeOptions: Intl.DateTimeFormatOptions = {
      hour: '2-digit',  // Allowed values: 'numeric' or '2-digit'
      minute: '2-digit', // Allowed values: 'numeric' or '2-digit'
      hour12: true // Boolean value is correctly assigned
    };
    return date.toLocaleTimeString('en-US', timeOptions);
  };

  // Define options for formatting the date
  





  return (
    <section className='flex size-full flex-col gap-10 text-white'>
        <div className='h-[300px] w-full rounded-[20px] bg-hero bg-cover'>
            <div className='flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11'>
                <h2 className=' glassmorphism max-w-[270px] rounded py-2 text-center text-base font-noraml '>Upcoming meeting is at 12:30 PM</h2>
                <div className='flex flex-col gap-2'> 
                <h1 className='text-4xl font-extrabold lg:text-7xl '>
                  {formatTime(currentDateTime)}
                </h1>
                <p className='text-lg font-medium text-sky-1 lg:text-2xl '> {formatDate(currentDateTime)} </p>
                </div>

            </div>

        </div>
        <MeetingTypeList />
    </section>
  )
}

export default page
