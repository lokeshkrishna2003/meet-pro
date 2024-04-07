import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { Button } from './ui/button'
  

interface MeetingModalProps {
    buttonText?:string,
    isOpen:boolean,
children?:React.ReactNode,
    onClose:()=>void,
    className?:string,
    title?:string,
    handleClick?:()=>void,
    image?:string,
    buttonIcon?:string
    
}
const MeetingModal = ({buttonText,isOpen,onClose,className,children,image,buttonIcon,title,handleClick}:MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}> 

  <DialogContent className='flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white'>
   <div className='flex flex-col gap-6'>
    {
        image && (
            <div className='flex justify-center'>
                <Image src={image} width={72} height={72} alt='image' />
            </div>
        )
    }
    <h1 className={cn('text-3xl font-bold leading-[42px]',className)}>{title}</h1>
    {children}
    <Button onClick={handleClick} className='bg-blue-1 rounded-[7px] focus-visible:ring-0 focus-visible:ring-offset-0 '>
        {buttonIcon && (<Image src={buttonIcon} width={13} height={13} alt='icon' />)} &nbsp;
        {buttonText || 'Start Meeting'} 
        </Button>
   </div>
  </DialogContent>
</Dialog>

  )
}

export default MeetingModal
