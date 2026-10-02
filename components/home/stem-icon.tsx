type StemIconType = "science" | "technology" | "engineering" | "mathematics";

export function StemIcon({ type }: { type: StemIconType }) {
  return (
    <svg
      width="38"
      height="38"
      viewBox="0 0 32 32"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {type === "science" && (
        <>
          <path d="M11 4h10M13 4v9L6 25a2 2 0 0 0 2 3h16a2 2 0 0 0 2-3l-7-12V4M10 20h12" />
          <circle cx="13" cy="24" r="1" fill="currentColor" stroke="none" />
        </>
      )}
      {type === "technology" && (
        <>
          <rect x="8" y="8" width="16" height="16" rx="3" />
          <rect x="12" y="12" width="8" height="8" rx="1" />
          <path d="M12 4v4m8-4v4M12 24v4m8-4v4M4 12h4m-4 8h4m16-8h4m-4 8h4" />
        </>
      )}
      {type === "engineering" && (
        <>
          <circle cx="16" cy="16" r="9" />
          <circle cx="16" cy="16" r="3" />
          <path d="M16 3v4m0 18v4M3 16h4m18 0h4M7 7l3 3m12 12 3 3M7 25l3-3M22 10l3-3" />
        </>
      )}
      {type === "mathematics" && <path d="M5 8h22M12 8v12c0 4-2 6-4 7M22 8v15c0 3 2 4 5 3" />}
    </svg>
  );
}
