'use client';

import { useState } from 'react';

const Letter = ({ children, onClick }) => {
    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {
        setIsActive(true);
        onClick();
    };

    return (
        <button className={`letter ${isActive ? 'active' : ''}`} onClick={handleClick} disabled={isActive}>
            {children}
        </button>
    );
};

export default Letter;