import React, { useState, useEffect } from 'react';
import '../styles/style.css';

const SkillItem = ({ icons, title, percentage }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [currentPercentage, setCurrentPercentage] = useState(0);

    useEffect(() => {
        let interval;
        if (isHovered) {
            // Animate from 0 to percentage
            let current = 0;
            const step = Math.max(1, Math.floor(percentage / 20)); // Adjust speed based on target
            interval = setInterval(() => {
                current += step;
                if (current >= percentage) {
                    current = percentage;
                    clearInterval(interval);
                }
                setCurrentPercentage(current);
            }, 30); // Interval speed
        } else {
            // Reset when not hovered
            setCurrentPercentage(0);
        }

        return () => clearInterval(interval);
    }, [isHovered, percentage]);

    return (
        <div
            className={`skill-list-item ${isHovered ? 'hovered' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="skill-item-header">
                <div className="skill-icons">
                    {icons.map((iconClass, index) => (
                        <i key={index} className={iconClass}></i>
                    ))}
                </div>
                <div className="skill-title-container">
                    <span className="skill-title">{title}</span>
                </div>
            </div>
            <div className="skill-progress-container" style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div className="skill-progress-bg" style={{ flex: 1 }}>
                    <div
                        className="skill-progress-fill"
                        style={{ width: isHovered ? `${percentage}%` : '0%' }}
                    ></div>
                </div>
                <span className="skill-percent-text">{currentPercentage}%</span>
            </div>
        </div>
    );
};

export default SkillItem;
