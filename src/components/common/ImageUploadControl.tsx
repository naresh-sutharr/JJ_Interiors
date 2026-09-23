import React, { useRef } from 'react';
import { Upload, Link as LinkIcon, Image as ImageIcon } from 'lucide-react';
import { useApp } from '../../context/AppContext.tsx';

interface ImageUploadControlProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}

export const ImageUploadControl: React.FC<ImageUploadControlProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://...',
  className = '',
  required = false
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { showToast } = useApp();

  const compressImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 1200;
          const MAX_HEIGHT = 1200;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            // Compress to webp or jpeg
            const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
            resolve(dataUrl);
          } else {
            resolve(event.target?.result as string); // fallback
          }
        };
        img.onerror = (err) => reject(err);
      };
      reader.onerror = (err) => reject(err);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select a valid image file', 'error');
      return;
    }

    try {
      showToast('Optimizing and uploading image...', 'info');
      const base64Str = await compressImage(file);
      onChange(base64Str);
      showToast('Image uploaded successfully!', 'success');
    } catch (err) {
      console.error(err);
      showToast('Failed to upload image.', 'error');
    } finally {
      // Reset input so the same file can be uploaded again if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className={className}>
      <label className="block text-[11px] uppercase tracking-wider font-bold text-stone-700 mb-1 flex items-center justify-between">
        <span>{label} {required && '*'}</span>
      </label>
      
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <LinkIcon className="w-4 h-4 text-stone-400 absolute left-3 top-2.5" />
          <input
            type="text"
            required={required && !value.startsWith('data:image')}
            placeholder={placeholder}
            value={value.startsWith('data:image') ? '[Local Image Attached - Clear to add URL]' : value}
            onChange={(e) => {
              onChange(e.target.value);
            }}
            className={`w-full pl-9 pr-3 py-2 border border-stone-300 rounded text-xs text-stone-900 font-mono focus:border-[#c5a059] focus:outline-none ${value.startsWith('data:image') ? 'bg-stone-100 text-stone-500 cursor-pointer' : ''}`}
            onClick={(e) => {
              if (value.startsWith('data:image')) {
                // Select all text to make it easy to delete and paste
                (e.target as HTMLInputElement).select();
              }
            }}
          />
        </div>
        
        <div className="text-stone-400 text-xs font-bold uppercase shrink-0">OR</div>
        
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="shrink-0 px-3 py-2 bg-stone-100 hover:bg-stone-200 border border-stone-300 text-stone-800 rounded text-xs font-semibold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Upload</span>
        </button>
        
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          accept="image/*" 
          className="hidden" 
        />
      </div>
      
      {value && value.startsWith('data:image') && (
        <div className="mt-2 flex items-center gap-2 bg-emerald-50 text-emerald-800 p-2 rounded border border-emerald-100 text-xs">
          <ImageIcon className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="truncate flex-1">Local image uploaded and optimized.</span>
          <button 
            type="button" 
            onClick={() => onChange('')} 
            className="text-emerald-700 hover:text-emerald-900 font-bold shrink-0 ml-2 cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
};
