'use client';

import { cn } from '@/lib/utils';
import { useEffect, useRef, useState } from 'react';
import { HexColorInput, HexColorPicker } from 'react-colorful';

type ColorPickerPropsType = {
  value: string;
  onPickerChange: (color: string) => void;
};

export default function ColorPicker({
  value,
  onPickerChange,
}: Readonly<ColorPickerPropsType>) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative w-fit">
      <button
        type="button"
        className="flex flex-row items-center gap-3"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div
          className="size-5 rounded border border-input"
          style={{ backgroundColor: value }}
        />
        <div className="flex items-center gap-1">
          <span className="text-foreground">#</span>
          <HexColorInput
            color={value}
            onChange={onPickerChange}
            className="hex-input"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </button>
      {isOpen && (
        <div
          className={cn(
            'hex-color-picker',
            isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
          )}
        >
          <HexColorPicker color={value} onChange={onPickerChange} />
        </div>
      )}
    </div>
  );
}
