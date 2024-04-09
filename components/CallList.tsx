
"use client"
import { UseGetCalls } from "@/hooks/UseGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import Recordings from "./Recordings";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const { upcomingCalls, endedCalls, CallRecordings, isLoading } =
    UseGetCalls();
  const router = useRouter();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [error, setError] = useState<string | null>(null); // Error state

  // Function to determine which calls to display based on the 'type' prop
  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "upcoming":
        return upcomingCalls;
      case "recordings":
        return recordings;
      default:
        return [];
    }
  };

  // Function to get the message when no calls are found
  const getNoCallMessage = () => {
    switch (type) {
      case "ended":
        return "No previous calls found";
      case "upcoming":
        return "No upcoming calls found";
      case "recordings":
        return "No recordings found";
      default:
        return "";
    }
  };

  // Effect to fetch recordings if the type is 'recordings'
  useEffect(() => {
    const fetchRecordings = async () => {
      console.log("Attempting to fetch recordings..."); // Log when fetch operation starts
      try {
        const callData = await Promise.all(CallRecordings.map((meeting) => meeting.queryRecordings()));
        const Recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings);
        setRecordings(Recordings);
        // console.log("Successfully fetched recordings:", Recordings); // Log successful fetch
      } catch (error) {
        console.error("Failed to fetch recordings:", error); // Log errors
        setError('Failed to fetch recordings. Please try again later.'); // Set error state
      }
    };
  
    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, CallRecordings]);
  

  const calls = getCalls();
  const noCallMessage = getNoCallMessage();

  // Loader display
  if (isLoading) {
    return <Loader />;
  }

  // Error display
  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  // Main component render
  return (
    <div className='grid grid-cols-1 gap-5 xl:grid-cols-2'>
        {calls && calls.length > 0 ? calls.map((meeting, index) => {
            // Generate a unique key for each item. If meeting.id is not unique across all types,
            // you can prepend the type or use the index as a fallback.
            const keyPrefix = type; // 'ended', 'upcoming', or 'recordings'
            const key = meeting.id ? `${keyPrefix}-${meeting.id}` : `${keyPrefix}-${index}`;

            return (
                <MeetingCard
                    key={key}
                    icon={type==='ended'?'/icons/previous.svg':type==='upcoming'?'/icons/upcoming.svg':'/icons/Video.svg'}
                    title={(meeting as Call).state?.custom.description.substring(0,20)|| meeting.filename.substring(0,20)  || 'No title'}
                    date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as Call).start_time.toLocaleString()}
                    isPreviousMeeting={type==='ended'}
                    buttonIcon1={type==='recordings'?'/icons/play.svg':undefined}
                    handleClick={type==='recordings'?()=><Recordings/>:()=>router.push(`meeting/${meeting.id}`)}
                    link={type==='recordings'?`${<Recordings/>}`:`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
                    buttonText={type==='recordings'?'Play':'Start'}
                />
            );
        }) : (
            <h1>{noCallMessage}</h1>
        )}
    </div>
);
};

export default CallList;
