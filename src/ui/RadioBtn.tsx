import clsx from 'clsx'
import React from 'react'

interface RadioButtonProps {
  width?: number;
  height?: number; 
  knobSize?: number; 
  knobColor?: string;
  trackColor?: string;
  inActiveKnobColor?:string;
  inActiveTrackColor?:string;
  isActive?: boolean;
  onClick?: () => void;
}
const RadioBtn: React.FC<RadioButtonProps> = ({
  width = 25,
  height = 15,
  knobSize = 12,
  knobColor = "white",
  trackColor = "black",
  inActiveTrackColor='#E4E4E4',
  inActiveKnobColor='white',
  isActive = false,
  onClick,
}) => {
  return (
   <button
      className={clsx("relative rounded-full transition-all duration-300 cursor-pointer")}
      style={{ width: `${width}px`, height: `${height}px`, backgroundColor:isActive ? trackColor : inActiveTrackColor }}
      onClick={onClick}
    >
      <div
        className={clsx("absolute rounded-full")}
        style={{
          width: `${knobSize}px`,
          height: `${knobSize}px`,
          top: "50%",
          left: isActive ? `${width - knobSize - 2}px` : "2px",
          transform: "translateY(-50%)",
          transition: "left 0.3s",
          backgroundColor:knobColor
        }}
      />
    </button>
  )
}

export default RadioBtn