"use client"
import { JSX, ReactNode, useEffect, useState } from 'react';

interface CardProps {
    children: ReactNode;
    className?: string;
    onClick?: () => void;
}

const getRandomHue = () => Math.floor(Math.random() * 360);

const Card = ({ children, className, onClick }: CardProps) => {
    const [hueRotate, setHueRotate] = useState(0);

    useEffect(() => {
        const randomHue = getRandomHue();
        setHueRotate(randomHue);
        document.documentElement.style.setProperty('--hue-rotate-start', `${randomHue}deg`);
        document.documentElement.style.setProperty('--border-color', `hsl(${randomHue}, 100%, 50%)`);
        document.documentElement.style.setProperty('--shadow-color', `hsla(${randomHue}, 100%, 50%, 0.5)`);
    }, []);

    return (
        <div className={`card ${className}`} onClick={onClick} style={{ filter: `hue-rotate(${hueRotate}deg)` }}>
            {children}
        </div>
    );
}

export default Card;