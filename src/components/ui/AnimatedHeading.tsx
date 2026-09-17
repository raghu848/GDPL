'use client';

import React, { useEffect, useState } from 'react';

interface AnimatedHeadingProps {
  text: string;
  className?: string;
}

const AnimatedHeading: React.FC<AnimatedHeadingProps> = ({ text, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const initialDelay = 200;
  const charDelay = 30;
  const transitionDuration = 500;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, initialDelay);
    return () => clearTimeout(timer);
  }, []);

  const lines = text.split('\n');

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        // Calculate the starting index for this line to maintain continuous staggering
        const previousLinesLength = lines
          .slice(0, lineIndex)
          .reduce((acc, l) => acc + l.length, 0);

        return (
          <span key={lineIndex} className="block overflow-hidden">
            {line.split('').map((char, charIndex) => {
              const globalIndex = previousLinesLength + charIndex;
              const delay = globalIndex * charDelay;

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all"
                  style={{
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: `${transitionDuration}ms`,
                    transitionDelay: `${delay}ms`,
                    transitionTimingFunction: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
                    whiteSpace: char === ' ' ? 'pre' : 'normal',
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              );
            })}
          </span>
        );
      })}
    </h1>
  );
};

export default AnimatedHeading;
