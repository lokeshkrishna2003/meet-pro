import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  

interface MeetingModalProps {
    buttonText:string,
    isOpen:boolean,
children?:React.ReactNode,
    onClose:()=>void,
    className?:string,
    title:string,
    handleClick?:()=>void,
    image?:string,
    buttonIcon?:string
    
}
const MeetingModal = ({buttonText,isOpen,onClose,className,children,image,buttonIcon,title,handleClick}:MeetingModalProps) => {
  return (
    <Dialog>
  <DialogTrigger>Open</DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you absolutely sure?</DialogTitle>
      <DialogDescription>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>

  )
}

export default MeetingModal
