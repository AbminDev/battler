import { useState, useEffect } from "react";

export const useUserInteraction = () => {
  const [hasInteracted, setHasInteracted] = useState(() => {
    return sessionStorage.getItem('hasInteracted') === 'true';
  });

  useEffect(() => {
    const handleUserInteraction = () => {
      if (!hasInteracted) {
        setHasInteracted(true);
        sessionStorage.setItem('hasInteracted', 'true');
      }
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [hasInteracted]);

  return hasInteracted;
};
