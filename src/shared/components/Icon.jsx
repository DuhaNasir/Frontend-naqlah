const icons = {
  arrow: "M19 12H5m6 6-6-6 6-6",
  chevron: "m14 6-6 6 6 6",
  check: "m5 12 4 4L19 6",
  close: "m6 6 12 12M6 18 18 6",
  upload: "M12 16V4m-5 5 5-5 5 5M4 16v4h16v-4",
  file: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Zm0 0v6h6M8 13h8M8 17h5",
  shield: "m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6Zm-4 9 3 3 5-6",
  grid: "M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z",
  book: "M12 6C9 3 5 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-3-1-7-1-10 2Zm0 0v15",
  route: "M5 19h14M7 19v-6h5V6h5V3M15 3h5v5",
  user: "M20 21v-2a7 7 0 0 0-14 0v2M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0",
  settings:
    "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2-6h4l1 3 3 1 3 1-1 4v2l1 4-3 1-3 1-1 3h-4l-1-3-3-1-3-1 1-4v-2L3 7l3-1 3-1Z",
  logout: "M9 4H4v16h5m6-13 5 5-5 5m-8-5h13",
  spark: "m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5Z",
  code: "m8 7-5 5 5 5m8-10 5 5-5 5m-3-13-2 16",
  database:
    "M20 6c0 2-3.5 3-8 3S4 8 4 6s3.5-3 8-3 8 1 8 3Zm0 0v12c0 2-3.5 3-8 3s-8-1-8-3V6m0 6c0 2 3.5 3 8 3s8-1 8-3",
  chart: "M4 3v18h17M8 16v-5m5 5V7m5 9V4",
  cloud: "M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11H6",
  network: "M12 9V3M4 16v-4h16v4M9 3h6v6H9zM1 16h6v6H1zm8 0h6v6H9zm8 0h6v6h-6z",
  lock: "M5 10h14v11H5zm3 0V6a4 4 0 0 1 8 0v4m-4 4v3",
  briefcase: "M3 7h18v14H3zm5 0V3h8v4M3 12c6 4 12 4 18 0m-9 0v4",
  plus: "M12 5v14M5 12h14",
  info: "M12 11v6m0-10v1M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  menu: "M4 6h16M4 12h16M4 18h16",
  home: "m3 10 9-7 9 7v11h-6v-7H9v7H3Z",
  map: "m3 4 6-2 6 3 6-2v17l-6 2-6-3-6 2Zm6-2v17m6-14v17",
  clock: "M12 7v5l3 2M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0",
  edit: "m15 4 5 5M4 20l5-1L21 7l-5-5L4 14Zm0 0h16",
  target: "M12 8a4 4 0 1 0 4 4M12 3a9 9 0 1 0 9 9m-9 0 9-9m-5 0h5v5",
  heart:
    "M20.8 4.6a5.5 5.5 0 0 0-7.8 0l-1 1-1-1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z",
  layers: "m12 3 10 5-10 5L2 8Zm-10 9 10 5 10-5M2 16l10 5 10-5",
  download: "M12 3v12m-5-5 5 5 5-5M4 17v4h16v-4",
};
export default function Icon({ name, size = 20, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d={icons[name] || icons.spark} />
    </svg>
  );
}
