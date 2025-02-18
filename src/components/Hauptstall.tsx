import React from "react";
import { useAppContext } from "../context/AppContextProvider";

interface StallProps {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke?: string;
  strokeWidth?: number;
  stallNumber?: number;
  horseName?: string;
}

const Stall: React.FC<StallProps> = ({
  x,
  y,
  width,
  height,
  stroke = "#6B8E23",
  strokeWidth = 5,
  stallNumber,
  horseName,
}) => (
  <>
    <rect
      x={x}
      y={y}
      width={width}
      height={height}
      fill="#D2B48C"
      stroke={stroke}
      strokeWidth={strokeWidth}
      key={stallNumber}
    />
    {horseName && (
      <text
        x={x + width / 2}
        y={y + height / 2}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize="24"
        fill="#000"
      >
        {horseName}
      </text>
    )}
  </>
);

const HauptstallLocation: React.FC = () => {
  const { stalls } = useAppContext();

  const defaultStalls = [
    { x: 0, y: 244, width: 135, height: 115, stallNumber: 1 },
    { x: 0, y: 122, width: 135, height: 115, stallNumber: 2 },
    { x: 0, y: 0, width: 135, height: 115, stallNumber: 3 },
    { x: 207, y: 0, width: 135, height: 115, stallNumber: 4 },
    { x: 207, y: 122, width: 135, height: 115, stallNumber: 5 },
    { x: 207, y: 244, width: 135, height: 115, stallNumber: 6 },
    { x: 207, y: 366, width: 135, height: 115, stallNumber: 7 },
    { x: 207, y: 488, width: 135, height: 115, stallNumber: 8 },
    { x: 0, y: 366, width: 54, height: 115 },
    { x: 54, y: 366, width: 81, height: 115 },
  ];

  const mappedStalls = defaultStalls.map((stall, index) => {
    const currentStall = stalls.find((s) => s.stallNumber === index + 1);
    const horseName = currentStall?.horse?.name || "";
    return { ...stall, horseName };
  });

  return (
    <div className="stall-location">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="75vw"
        height="55vh"
        viewBox="0 0 342 603"
        fill="none"
      >
        <rect width="342" height="603" fill="#1E1E1E" />
        <rect
          x="2.5"
          y="2.5"
          width="337"
          height="597"
          fill="#F5F5DC"
          stroke="#6B8E23"
          strokeWidth="5"
        />
        {mappedStalls.map((stall, index) => (
          <Stall key={index} {...stall} />
        ))}
      </svg>
    </div>
  );
};

export default HauptstallLocation;
