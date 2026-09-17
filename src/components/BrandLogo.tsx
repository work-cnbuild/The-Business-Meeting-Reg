import React, { useRef } from 'react';
import { useApp } from '../context/AppContext';
import { Upload } from 'lucide-react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'shield' | 'stacked';
  themeOverride?: 'dark' | 'light';
  showUploadTrigger?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'full',
  themeOverride,
  showUploadTrigger = false,
}) => {
  const { customLogoUrl, setCustomLogoUrl } = useApp();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const isDark = themeOverride ? themeOverride === 'dark' : false;
  const textColor = isDark ? '#ffffff' : '#090d16';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result) {
          setCustomLogoUrl(result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // If user has uploaded or set an exact image file
  if (customLogoUrl) {
    return (
      <div className={`relative group inline-flex items-center ${className}`}>
        <img
          src={customLogoUrl}
          alt="Chigozie Nkwo Brand Logo"
          className="h-10 sm:h-12 w-auto max-w-[240px] object-contain drop-shadow-xs transition-transform duration-200 group-hover:scale-105"
        />
        {showUploadTrigger && (
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Replace logo image"
            className="ml-2 p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-600 transition-all opacity-0 group-hover:opacity-100"
          >
            <Upload className="w-3 h-3" />
          </button>
        )}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    );
  }

  // Exact reproduction of the official Chigozie Nkwo Heraldic Shield & Sword Insignia (Shield only)
  const OfficialCrest = (
    <svg
      viewBox="0 0 220 260"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="h-10 sm:h-12 w-auto flex-shrink-0"
      preserveAspectRatio="xMidYMid meet"
      aria-label="Chigozie Nkwo Insignia"
    >
      {/* Sword Tip Piercing Out Bottom */}
      <path d="M103 216 L117 216 L110 252 Z" fill={textColor} />

      {/* Outer Shield Border */}
      <path 
        d="M36 94 L184 94 L184 186 L110 226 L36 186 Z" 
        fill="none" 
        stroke={textColor} 
        strokeWidth="7" 
        strokeLinejoin="miter" 
      />

      {/* Inner Solid Shield */}
      <path 
        d="M44 101 L176 101 L176 182 L110 218 L44 182 Z" 
        fill={textColor} 
      />

      {/* Five Stars in Arch Across Top */}
      {/* Star 1 */}
      <polygon 
        points="68,114 70,119 75,119.5 71,123 72,128 68,125 64,128 65,123 61,119.5 66,119" 
        fill={isDark ? '#090d16' : '#ffffff'} 
      />
      {/* Star 2 */}
      <polygon 
        points="89,110 91,115 96,115.5 92,119 93,124 89,121 85,124 86,119 82,115.5 87,115" 
        fill={isDark ? '#090d16' : '#ffffff'} 
      />
      {/* Star 3 (Center - Highest) */}
      <polygon 
        points="110,107 112,112 117,112.5 113,116 114,121 110,118 106,121 107,116 103,112.5 108,112" 
        fill={isDark ? '#090d16' : '#ffffff'} 
      />
      {/* Star 4 */}
      <polygon 
        points="131,110 133,115 138,115.5 134,119 135,124 131,121 127,124 128,119 124,115.5 129,115" 
        fill={isDark ? '#090d16' : '#ffffff'} 
      />
      {/* Star 5 */}
      <polygon 
        points="152,114 154,119 159,119.5 155,123 156,128 152,125 148,128 149,123 145,119.5 150,119" 
        fill={isDark ? '#090d16' : '#ffffff'} 
      />

      {/* Stylized Monogram "CN" in White */}
      {/* Letter C */}
      <path 
        d="M100 126 L63 126 L55 134 L55 186 L63 194 L100 194 L100 178 L72 178 L68 174 L68 146 L72 142 L100 142 Z" 
        fill={isDark ? '#090d16' : '#ffffff'} 
      />

      {/* Letter N */}
      <path 
        d="M103 126 L120 126 L143 168 L143 126 L164 126 L164 194 L146 194 L123 152 L123 194 L103 194 Z" 
        fill={isDark ? '#090d16' : '#ffffff'} 
      />

      {/* Sword Hilt (Top) */}
      {/* Pommel with Inverted Trapezoid & Crown/Cross Motif */}
      <path d="M96 22 L124 22 L119 32 L101 32 Z" fill={textColor} />
      <path d="M104 25 L106 29 L110 25 L114 29 L116 25 L116 30 L104 30 Z" fill={isDark ? '#090d16' : '#ffffff'} />
      {/* Handle / Grip */}
      <rect x="103" y="32" width="14" height="42" fill={textColor} />
      {/* Horizontal Grip Ridges */}
      <rect x="105" y="38" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
      <rect x="105" y="45" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
      <rect x="105" y="52" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
      <rect x="105" y="59" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
      <rect x="105" y="66" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />

      {/* Crossguard (Curving down both sides) */}
      <path 
        d="M74 88 C88 80 98 74 110 74 C122 74 132 80 146 88 C144 92 136 86 126 84 C117 82 110 82 110 84 C110 82 103 82 94 84 C84 86 76 92 74 88 Z" 
        fill={textColor} 
      />
      {/* Center collar */}
      <rect x="106" y="74" width="8" height="20" fill={textColor} />
    </svg>
  );

  // Variant: Just the Shield / Insignia
  if (variant === 'shield') {
    return (
      <div className={`relative group inline-flex items-center cursor-pointer ${className}`} onClick={() => fileInputRef.current?.click()}>
        {OfficialCrest}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    );
  }

  // Official Full Brand Logo matching "CN Brand logo 2.png" exactly (Shield + "CHIGOZIE NKWO" on a single horizontal line)
  // Unified SVG guarantees locked aspect ratio: mathematically impossible to stretch or deform
  return (
    <div className={`relative group inline-flex items-center cursor-pointer select-none ${className}`}>
      <svg
        viewBox="0 0 830 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 sm:h-11 md:h-12 w-auto max-w-[260px] sm:max-w-[320px] object-contain flex-shrink-0"
        preserveAspectRatio="xMinYMid meet"
        aria-label="Chigozie Nkwo Official Brand Logo"
        onClick={() => fileInputRef.current?.click()}
      >
        {/* Crest: Sword & Shield */}
        <g id="crest">
          {/* Sword Tip Piercing Out Bottom */}
          <path d="M103 216 L117 216 L110 252 Z" fill={textColor} />

          {/* Outer Shield Border */}
          <path 
            d="M36 94 L184 94 L184 186 L110 226 L36 186 Z" 
            fill="none" 
            stroke={textColor} 
            strokeWidth="7" 
            strokeLinejoin="miter" 
          />

          {/* Inner Solid Shield */}
          <path 
            d="M44 101 L176 101 L176 182 L110 218 L44 182 Z" 
            fill={textColor} 
          />

          {/* Five Stars in Arch Across Top */}
          <polygon 
            points="68,114 70,119 75,119.5 71,123 72,128 68,125 64,128 65,123 61,119.5 66,119" 
            fill={isDark ? '#090d16' : '#ffffff'} 
          />
          <polygon 
            points="89,110 91,115 96,115.5 92,119 93,124 89,121 85,124 86,119 82,115.5 87,115" 
            fill={isDark ? '#090d16' : '#ffffff'} 
          />
          <polygon 
            points="110,107 112,112 117,112.5 113,116 114,121 110,118 106,121 107,116 103,112.5 108,112" 
            fill={isDark ? '#090d16' : '#ffffff'} 
          />
          <polygon 
            points="131,110 133,115 138,115.5 134,119 135,124 131,121 127,124 128,119 124,115.5 129,115" 
            fill={isDark ? '#090d16' : '#ffffff'} 
          />
          <polygon 
            points="152,114 154,119 159,119.5 155,123 156,128 152,125 148,128 149,123 145,119.5 150,119" 
            fill={isDark ? '#090d16' : '#ffffff'} 
          />

          {/* Stylized Monogram "CN" */}
          <path 
            d="M100 126 L63 126 L55 134 L55 186 L63 194 L100 194 L100 178 L72 178 L68 174 L68 146 L72 142 L100 142 Z" 
            fill={isDark ? '#090d16' : '#ffffff'} 
          />
          <path 
            d="M103 126 L120 126 L143 168 L143 126 L164 126 L164 194 L146 194 L123 152 L123 194 L103 194 Z" 
            fill={isDark ? '#090d16' : '#ffffff'} 
          />

          {/* Sword Hilt */}
          <path d="M96 22 L124 22 L119 32 L101 32 Z" fill={textColor} />
          <path d="M104 25 L106 29 L110 25 L114 29 L116 25 L116 30 L104 30 Z" fill={isDark ? '#090d16' : '#ffffff'} />
          <rect x="103" y="32" width="14" height="42" fill={textColor} />
          <rect x="105" y="38" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
          <rect x="105" y="45" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
          <rect x="105" y="52" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
          <rect x="105" y="59" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />
          <rect x="105" y="66" width="10" height="2" fill={isDark ? '#090d16' : '#ffffff'} />

          {/* Crossguard */}
          <path 
            d="M74 88 C88 80 98 74 110 74 C122 74 132 80 146 88 C144 92 136 86 126 84 C117 82 110 82 110 84 C110 82 103 82 94 84 C84 86 76 92 74 88 Z" 
            fill={textColor} 
          />
          <rect x="106" y="74" width="8" height="20" fill={textColor} />
        </g>

        {/* Wordmark: Single horizontal line "CHIGOZIE NKWO" */}
        <text 
          x="214" 
          y="186" 
          fontFamily="'Oswald', sans-serif" 
          fontSize="118" 
          fontWeight="700" 
          letterSpacing="0.035em"
          fill={textColor}
        >
          CHIGOZIE NKWO
        </text>
      </svg>

      {showUploadTrigger && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current?.click();
          }}
          title="Upload or change logo file"
          className="ml-1 p-1 rounded-md bg-slate-100 hover:bg-slate-200 text-xs text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <Upload className="w-3 h-3" />
        </button>
      )}

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*"
        className="hidden"
      />
    </div>
  );
};

