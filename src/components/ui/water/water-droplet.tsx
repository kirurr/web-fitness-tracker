interface WaterDropletProps {
  fillPercentage: number;
}

export function WaterDroplet({ fillPercentage }: WaterDropletProps) {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[#348de9]"
        fill="#348de9"
        style={{
          clipPath: `inset(${100 - fillPercentage}% 0 0 0)`,
          transition: "clip-path 0.3s ease-in-out",
        }}
      />
      <path
        d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="stroke-[#348de9]"
        fill="transparent"
      />
    </svg>
  );
}
