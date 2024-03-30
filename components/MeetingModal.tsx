import React from 'react'

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
    <div>
      Meeting Modal
    </div>
  )
}

export default MeetingModal
