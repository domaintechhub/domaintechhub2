import React, { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

interface AnimatedCounterProps {
  value: string; // e.g. "65+", "45+", "98%", "4.6x", "$1.8M+", "< 15m"
  duration?: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

export function parseCounterValue(raw: string) {
  const match = raw.match(/^([^\d.]*)([\d.]+)(.*)$/);
  if (!match) {
    return { prefix: '', number: 0, suffix: raw, decimals: 0, isNumeric: false };
  }
  const prefix = match[1] || '';
  const numStr = match[2];
  const suffix = match[3] || '';
  const number = parseFloat(numStr);
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0;
  return { prefix, number, suffix, decimals, isNumeric: true };
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1.8,
  className = '',
  prefix: overridePrefix,
  suffix: overrideSuffix
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const { prefix: parsedPrefix, number, suffix: parsedSuffix, decimals, isNumeric } = parseCounterValue(value);

  const prefix = overridePrefix !== undefined ? overridePrefix : parsedPrefix;
  const suffix = overrideSuffix !== undefined ? overrideSuffix : parsedSuffix;

  const [displayValue, setDisplayValue] = useState<string>(isNumeric ? (0).toFixed(decimals) : value);

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) setDisplayValue(value);
      return;
    }

    const controls = animate(0, number, {
      duration: duration,
      ease: [0.16, 1, 0.3, 1], // easeOutExpo
      onUpdate: (latest) => {
        setDisplayValue(latest.toFixed(decimals));
      }
    });

    return () => controls.stop();
  }, [isInView, number, decimals, duration, isNumeric, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
