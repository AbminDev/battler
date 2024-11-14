import React, { useState, useEffect } from "react";

const TypingEffect = ({ text, speed = 50, onComplete }: { text: string; speed?: number; onComplete?: () => void }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [index, setIndex] = useState(0);
  const [displayedSpeed, setSpeed] = useState(speed);

  useEffect(() => {
    setSpeed(speed);
  }, [speed]);

  useEffect(() => {
    setDisplayedText("");
    setIsCompleted(false);
    setIndex(0);
  }, [text]);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex(index + 1);
      }, displayedSpeed);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      if (!isCompleted || index === 0) {
        setIsCompleted(true);
        onComplete();
      }
    }
  }, [index, text, displayedSpeed, onComplete]);

  return (<div>{displayedText}</div>);
};

export default TypingEffect;
