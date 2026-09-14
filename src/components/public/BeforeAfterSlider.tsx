import React, { useState, useRef, useCallback, useEffect } from 'react';
import { ArrowLeftRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = 'Before Transformation',
  afterLabel = 'Completed Handover',
  className = '',
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // If only one image is available, render it cleanly with a status badge
  if (!beforeImage && afterImage) {
    return (
      <div className={`relative overflow-hidden bg-stone-950 aspect-[16/9] ${className}`}>
        <img src={afterImage} alt={afterLabel} className="w-full h-full object-cover" />
        <span className="absolute top-4 right-4 px-3 py-1 bg-black/80 backdrop-blur-xs text-[#c5a059] text-xs uppercase tracking-widest font-semibold border border-[#c5a059]/30">
          {afterLabel}
        </span>
      </div>
    );
  }

  if (beforeImage && !afterImage) {
    return (
      <div className={`relative overflow-hidden bg-stone-950 aspect-[16/9] ${className}`}>
        <img src={beforeImage} alt={beforeLabel} className="w-full h-full object-cover" />
        <span className="absolute top-4 left-4 px-3 py-1 bg-black/80 backdrop-blur-xs text-stone-300 text-xs uppercase tracking-widest font-semibold border border-stone-700">
          {beforeLabel}
        </span>
      </div>
    );
  }

  if (!beforeImage && !afterImage) {
    return null;
  }

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const width = rect.width;
    let percentage = (x / width) * 100;
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleTouchStart = () => {
    setIsDragging(true);
  };

  useEffect(() => {
    const handleMouseUp = () => {
      setIsDragging(false);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('touchmove', handleTouchMove);
      window.addEventListener('touchend', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging, handleMove]);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden aspect-[16/9] w-full bg-stone-950 group ${className}`}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      onClick={(e) => handleMove(e.clientX)}
    >
      {/* 1. After Image (Background / Base) */}
      <img
        src={afterImage}
        alt={afterLabel}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />
      
      {/* After Tag */}
      <span className="absolute top-4 right-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-md text-[#c5a059] text-[11px] uppercase tracking-widest font-semibold border border-[#c5a059]/40 pointer-events-none shadow-md">
        {afterLabel}
      </span>

      {/* 2. Before Image (Clipped Overlay) */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{ clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />
        {/* Before Tag */}
        <span className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/80 backdrop-blur-md text-stone-300 text-[11px] uppercase tracking-widest font-semibold border border-stone-700 pointer-events-none shadow-md">
          {beforeLabel}
        </span>
      </div>

      {/* 3. Divider Line & Interactive Handle */}
      <div
        className="absolute top-0 bottom-0 z-20 pointer-events-none"
        style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
      >
        {/* Vertical Line */}
        <div className="w-0.5 h-full bg-[#c5a059] shadow-[0_0_10px_rgba(197,160,89,0.8)]" />

        {/* Circular Drag Button */}
        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 left-1/2 w-10 h-10 rounded-full bg-[#1e1b18] border-2 border-[#c5a059] text-[#c5a059] shadow-2xl flex items-center justify-center cursor-ew-resize transition-transform group-hover:scale-110">
          <ArrowLeftRight className="w-4 h-4" />
        </div>
      </div>

      {/* 4. Bottom Interaction Hint */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 pointer-events-none bg-black/70 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] uppercase tracking-widest text-stone-300 opacity-80 group-hover:opacity-100 transition-opacity flex items-center gap-1.5">
        <ArrowLeftRight className="w-3 h-3 text-[#c5a059]" />
        <span>Drag or click to compare transformation</span>
      </div>
    </div>
  );
};
