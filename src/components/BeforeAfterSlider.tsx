import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
}

const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({
  beforeImage,
  afterImage,
  beforeLabel = "Avant",
  afterLabel = "Après"
}) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const preloadImages = async () => {
      const loadImage = (src: string) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      };

      try {
        await Promise.all([loadImage(beforeImage), loadImage(afterImage)]);
        setIsLoaded(true);
      } catch (error) {
        console.error('Error loading images:', error);
      }
    };

    preloadImages();
  }, [beforeImage, afterImage]);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;

    setSliderPosition(percentage);
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      handleMove(e.touches[0].clientX);
    } else {
      handleMove(e.clientX);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchend', handleEnd);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div 
      ref={containerRef}
      className={`relative w-full aspect-w-16 aspect-h-9 overflow-hidden select-none transition-opacity duration-500 rounded-2xl shadow-[0_0_30px_rgba(176,38,255,0.2)] border border-[#B026FF]/20 ${
        isLoaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <img 
        src={beforeImage}
        alt="Avant"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'none', clipPath: 'none' }}
        draggable="false"
      />

      <div 
        className="absolute inset-0 overflow-hidden"
        style={{
          clipPath: `polygon(${sliderPosition}% 0, 100% 0, 100% 100%, ${sliderPosition}% 100%)`
        }}
      >
        <img 
          src={afterImage}
          alt="Après"
          className="absolute inset-0 w-full h-full object-cover"
          draggable="false"
        />
        <div className="absolute top-4 right-4 bg-[#B026FF] text-white px-4 py-2 rounded-full">
          <span className="text-sm font-medium">{afterLabel}</span>
        </div>
      </div>

      <div 
        className="absolute top-0 bottom-0 w-[6px] cursor-ew-resize group"
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)'
        }}
      >
        <div className="absolute inset-y-0 left-1/2 w-[6px] bg-[#B026FF] shadow-[0_0_20px_rgba(176,38,255,1)]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="w-8 h-8 rounded-full bg-[#B026FF] flex items-center justify-center shadow-[0_0_25px_rgba(176,38,255,1)]">
            <div className="flex items-center space-x-[4px] text-white">
              <ChevronLeft className="w-5 h-5" />
              <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      <div 
        className="absolute inset-0 cursor-ew-resize"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
      />
    </div>
  );
};

export default BeforeAfterSlider;