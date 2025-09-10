import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number; 
}

const AnimateNumber = ({ value, duration = 0.5 }: AnimatedNumberProps) => {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.floor(latest));

  useEffect(() => {
    const controls = animate(count, value, { duration });
    return controls.stop; 
  }, [value, duration, count]);

  return (
    <motion.span>
      {rounded}
    </motion.span>
  );
};

export default AnimateNumber;
