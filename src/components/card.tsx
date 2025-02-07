"use client";
import { JSX, ReactNode, useEffect, useState } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
  rotateHue?: boolean;
  onClick?: () => void;
}

const getRandomHue = () => Math.floor(Math.random() * 360);

const Card = ({
  children,
  className,
  rotateHue = true,
  onClick,
}: CardProps) => {
  const [hueRotate, setHueRotate] = useState(0);

  useEffect(() => {
    const randomHue = getRandomHue();
    setHueRotate(randomHue);
  }, []);

  return (
    <div
      className={`card ${className}`}
      onClick={onClick}
      style={
        {
          "--hue-rotate-start": rotateHue ? `${hueRotate}deg` : "0deg",
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
};

export default Card;
