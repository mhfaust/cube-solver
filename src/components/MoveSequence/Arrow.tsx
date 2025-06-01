import { MoveCode } from "@/utils/moveCodes";

type ArrowProps = {
    moveCode: MoveCode
    width: number;
}
export default function Arrow ({ moveCode, width }: ArrowProps) {
  return (
    <svg 
      viewBox="70 28 60 44" 
      width={`${width}px`} 
      height={`${width/2}px`}
      className="border border-gray-300"
    >
      {/* Arrow shaft */}
      <line
        x1="64"
        y1="50"
        x2="130"
        y2="50"
        stroke="#374151"
        strokeWidth="3"
      />
      
      {/* Arrow head */}
      <polygon
        points="180,40 190,50 180,60"
        fill="#374151"
        transform="translate(-50, 0)"
      />
      
      {/* Circle background */}
      <circle
        cx="100"
        cy="50"
        r="20"
        fill="white"
        stroke="#374151"
        strokeWidth="2"
      />
      
      {/* Move code text */}
      <text
        x="100"
        y="50"
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="20"
        fontWeight="bold"
        fill="#374151"
      >
        {moveCode}
      </text>
    </svg>
  );
}