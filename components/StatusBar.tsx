/**
 * iOS-style status bar. Pick a time that fits your demo's scene — avoid
 * 9:41 (the Apple keynote trope); an ordinary time signals "real" recording.
 * Time renders in the sans face (not mono) to match iOS, with tabular-nums
 * so the colon stays put.
 */
export function StatusBar() {
  return (
    <div className="relative h-[54px] flex items-center justify-between px-8 pt-4 text-ink-900 select-none">
      <span className="text-[15px] font-semibold tracking-tight tabular">
        3:42
      </span>
      <div className="flex items-center gap-[6px]">
        <SignalIcon />
        <WifiIcon />
        <BatteryIcon />
      </div>
    </div>
  );
}

function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="currentColor" aria-hidden>
      <rect x="0" y="7" width="3" height="4" rx="0.5" />
      <rect x="4.5" y="5" width="3" height="6" rx="0.5" />
      <rect x="9" y="2.5" width="3" height="8.5" rx="0.5" />
      <rect x="13.5" y="0" width="3" height="11" rx="0.5" />
    </svg>
  );
}

function WifiIcon() {
  return (
    <svg width="16" height="11" viewBox="0 0 16 11" fill="currentColor" aria-hidden>
      <path d="M8 11 5.5 8.2a3.5 3.5 0 0 1 5 0L8 11Z" />
      <path d="M8 7.2a5.5 5.5 0 0 0-3.9 1.6L2.7 7.4a7.5 7.5 0 0 1 10.6 0l-1.4 1.4A5.5 5.5 0 0 0 8 7.2Z" />
      <path d="M8 3.2a9.5 9.5 0 0 0-6.7 2.8L0 4.6a11.5 11.5 0 0 1 16 0l-1.3 1.4A9.5 9.5 0 0 0 8 3.2Z" />
    </svg>
  );
}

function BatteryIcon() {
  return (
    <svg width="27" height="13" viewBox="0 0 27 13" aria-hidden>
      <rect
        x="0.5"
        y="0.5"
        width="22"
        height="12"
        rx="3"
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.4"
      />
      <rect x="2" y="2" width="19" height="9" rx="1.5" fill="currentColor" />
      <rect
        x="24"
        y="4"
        width="2"
        height="5"
        rx="0.6"
        fill="currentColor"
        fillOpacity="0.4"
      />
    </svg>
  );
}
