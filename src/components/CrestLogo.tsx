import React from 'react';

interface CrestLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const CrestLogo: React.FC<CrestLogoProps> = ({
  className = '',
  size = 40,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 group cursor-pointer ${className}`}>
      {/* Golden Circular Crest Outer Frame */}
      <div
        className="relative rounded-full p-[1.5px] bg-gradient-to-tr from-[#f2ca7a] via-[#d4af62] to-[#b88f3e] shadow-[0_2px_12px_rgba(212,175,98,0.25)] group-hover:shadow-[0_4px_18px_rgba(212,175,98,0.45)] transition-all duration-300"
        style={{ width: size, height: size }}
      >
        <div className="w-full h-full rounded-full overflow-hidden bg-[#19061f] flex items-center justify-center p-1">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCNjUrDE1B-qFRSoR7gHQeBRitXq69e1UHSM8kcQYlgLYe0mjWafFqwyiNbEF_rJ2LUbDVM93FfvLHnYgVMWANuM_34VP7F004ATJmG1fsf-HFoTP8EOacD6vLZ2sJLI3Vx3KVlQS1YZdosPbOU2TIAiCXBAvjRoYSzC3NU2HNIz38m35NPt5UwWOYAkbdkSSrbpH2DvNLFCprR-3rQVrLCBRjP7UqlsX8MGNrpYS6gWwrOQ-34yHWdHqrcqDiohHLrRA"
            alt="Jessa's Beauty Parlor Crest"
            className="w-full h-full object-contain"
            onError={(e) => {
              // Graceful SVG fallback if network is restricted
              const target = e.currentTarget;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <svg viewBox="0 0 100 100" class="w-full h-full fill-[#f2ca7a]">
                    <circle cx="50" cy="50" r="46" fill="none" stroke="#f2ca7a" stroke-width="2"/>
                    <path d="M50 20 L55 35 L70 30 L60 45 L75 55 L58 55 L50 75 L42 55 L25 55 L40 45 L30 30 L45 35 Z" fill="#d4af62" opacity="0.8"/>
                    <text x="50" y="85" font-family="'Playfair Display', serif" font-size="12" font-weight="bold" text-anchor="middle" fill="#f2ca7a">J</text>
                  </svg>
                `;
              }
            }}
          />
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif text-[19px] md:text-[21px] font-semibold text-[#f2ca7a] tracking-wide leading-none group-hover:text-[#ffdea0] transition-colors">
            Jessa's
          </span>
          <span className="text-[9.5px] uppercase tracking-[0.2em] text-[#d1c5b3] font-medium mt-0.5">
            Beauty Parlor
          </span>
        </div>
      )}
    </div>
  );
};
