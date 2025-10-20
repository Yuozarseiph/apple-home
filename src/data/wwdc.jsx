export const wwdcEvent = {
  title: "WWDC25",
  subtitle: "Apple Worldwide Developers Conference.",
  date: "June 9–13",
  description:
    "Join us online June 9–13 for an inspiring week of technology and community. Discover the latest Apple platforms, tools, and technologies. Connect with Apple engineers and the global developer community.",

  logo: (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mx-auto mb-4"
    >
      <circle cx="60" cy="60" r="56" fill="#fff" stroke="#00a4c4" strokeWidth="4" />
      <path
        d="M60 30c-10 0-18 8-18 18 0 7 4 13 10 16v10h16V64c6-3 10-9 10-16 0-10-8-18-18-18zm0 4c7.7 0 14 6.3 14 14 0 5.5-3.2 10.2-8 12.3V72h-12V60.3c-4.8-2.1-8-6.8-8-12.3 0-7.7 6.3-14 14-14z"
        fill="#00a4c4"
      />
      <circle cx="60" cy="60" r="6" fill="#222" />
    </svg>
  ),

  banner: (
    <svg
      viewBox="0 0 600 200"
      width="100%"
      height="100%"
      className="w-full h-auto"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="banner-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>

        <linearGradient
          id="wwdc-gradient"
          x1="0"
          y1="0"
          x2="600"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00a4c4" />
          <stop offset="100%" stopColor="#b554d5" />
        </linearGradient>
      </defs>
      
      <rect width="600" height="200" rx="32" fill="#f8f9fa" />

      <rect width="600" height="200" rx="32" fill="url(#wwdc-gradient)" opacity="0.85" />

      <rect width="600" height="200" rx="32" fill="url(#banner-glow)" />

      <text
        x="50%"
        y="45%"
        textAnchor="middle"
        fontSize="64"
        fontWeight="bold"
        fill="#222"
        style={{ letterSpacing: 2 }}
      >
        WWDC25
      </text>
      <text
        x="50%"
        y="65%"
        textAnchor="middle"
        fontSize="28"
        fill="#222"
        opacity="0.85"
      >
        June 9–13, 2025
      </text>
      <text
        x="50%"
        y="80%"
        textAnchor="middle"
        fontSize="20"
        fill="#222"
        opacity="0.7"
      >
        Apple Worldwide Developers Conference
      </text>
    </svg>
  ),

  calendarLink: "https://www.apple.com/apple-events/", 
  calendarText: "Add to your calendar",
  calendarIcon: (
    <svg
      className="inline w-4 h-4 ml-1"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  ),

  wwdcColors: [
    "#00a4c4",
    "#34C759",
    "#FFD60A",
    "#FF9500",
    "#FF2D55",
    "#AF52DE",
  ],

  highlights: [
    {
      title: "Keynote",
      desc: "See the future of Apple platforms and products.",
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" fill="#00a4c4" />
          <path
            d="M8 12l2.5 2.5L16 9"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      title: "Sessions",
      desc: "Learn from Apple engineers and designers.",
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect x="4" y="6" width="16" height="12" rx="3" fill="#b554d5" />
          <rect x="8" y="10" width="8" height="2" rx="1" fill="#fff" />
        </svg>
      ),
    },
    {
      title: "Labs",
      desc: "Get one-on-one guidance from Apple experts.",
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <rect x="6" y="6" width="12" height="12" rx="6" fill="#FFD60A" />
          <circle cx="12" cy="12" r="3" fill="#222" />
        </svg>
      ),
    },
    {
      title: "Community",
      desc: "Connect with developers worldwide.",
      icon: (
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="8" cy="12" r="4" fill="#34C759" />
          <circle cx="16" cy="12" r="4" fill="#FF2D55" />
        </svg>
      ),
    },
  ],
};
