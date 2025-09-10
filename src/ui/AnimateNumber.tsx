import { useEffect, useState } from "react";

interface AnimateNumberProps {
  value: number;     
  duration?: number; 
}

const AnimateNumber = ({ value, duration = 1000 }: AnimateNumberProps) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const steps = value; 
    const stepTime = duration / steps; 
    let current = 0;

    const interval = setInterval(() => {
      current++;
      setCount(current);

      if (current >= value) {
        clearInterval(interval);
      }
    }, stepTime);

    return () => clearInterval(interval); 
  }, [value, duration]);

  return (
    <span>
      {count}
    </span>
  );
};

export default AnimateNumber;
