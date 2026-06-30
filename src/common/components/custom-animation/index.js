'use client';

const CustomAnimation = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-[var(--apt-offwhite)]">
      {/* Logo mark */}
      <div className="mb-8 flex flex-col items-center gap-3">
        <div className="relative w-16 h-16 flex items-center justify-center">
          {/* Rotating ring */}
          <div
            className="absolute inset-0 rounded-full border-4 border-[var(--apt-red)]/20"
            style={{ borderTopColor: 'var(--apt-red)', animation: 'spin 0.9s linear infinite' }}
          />
          {/* Inner pulsing dot */}
          <div className="w-6 h-6 rounded-full bg-[var(--apt-red)] animate-pulse" />
        </div>
        <span
          className="font-khand text-xl font-extrabold tracking-[0.25em] text-[var(--apt-navy)] uppercase"
          style={{ letterSpacing: '0.25em' }}
        >
          APT WORLD
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-40 h-0.5 bg-[#404040]/20 rounded-full overflow-hidden">
        <div
          className="h-full bg-[var(--apt-red)] rounded-full"
          style={{ animation: 'loaderBar 1.4s ease-in-out infinite' }}
        />
      </div>

      <style jsx>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        @keyframes loaderBar {
          0%   { width: 0%;   margin-left: 0%; }
          50%  { width: 70%;  margin-left: 15%; }
          100% { width: 0%;   margin-left: 100%; }
        }
      `}</style>
    </div>
  );
};

export default CustomAnimation;
