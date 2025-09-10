import { useState } from "react";
import {motion,AnimatePresence} from 'framer-motion';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
  icon?:React.ReactNode | null
}

const Tooltip = ({ text, children,icon:Icon }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative flex items-center"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
    <AnimatePresence>
      {isVisible && ( 
          <motion.div
          key={text}
          initial={{scale:0,opacity:0}}
          animate={{scale: isVisible ? 1 : 0,opacity: isVisible ? 1 : 0}}
          exit={{scale:0,opacity:0}}
          transition={{duration:0.1}}
          className="max-h-[20px] flex gap-1 items-center text-[12px] absolute bottom-[90%] font-semibold left-1/2 -translate-x-1/2 mb-2 px-1 py-[2px]
          text-white bg-gray-700 rounded-sm shadow-lg whitespace-nowrap z-50 min-w-fit">
            {Icon}
            <p>{text}</p>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
