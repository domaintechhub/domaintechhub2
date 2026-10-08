import React, { useEffect, useRef, useState } from 'react';

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
  const [isInView, setIsInView] = useState(false);
  const { prefix: parsedPrefix, number, suffix: parsedSuffix, decimals, isNumeric } = parseCounterValue(value);

  const prefix = overridePrefix !== undefined ? overridePrefix : parsedPrefix;
  const suffix = overrideSuffix !== undefined ? overrideSuffix : parsedSuffix;

  const [displayValue, setDisplayValue] = useState<string>(
    isNumeric ? number.toFixed(decimals) : value
  );

  useEffect(() => {
    const element = ref.current;
    if (!element || !('IntersectionObserver' in window)) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsInView(true);
        observer.disconnect();
      }
    }, { rootMargin: '-50px' });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isInView || !isNumeric) {
      if (!isNumeric) setDisplayValue(value);
      return;
    }

    const startTime = performance.now();
    const durationMs = Math.max(duration * 1000, 1);
    let frameId = 0;

    const update = (now: number) => {
      const progress = Math.min((now - startTime) / durationMs, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 4);
      setDisplayValue((number * easedProgress).toFixed(decimals));
      if (progress < 1) frameId = requestAnimationFrame(update);
    };

    frameId = requestAnimationFrame(update);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, number, decimals, duration, isNumeric, value]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </span>
  );
};
