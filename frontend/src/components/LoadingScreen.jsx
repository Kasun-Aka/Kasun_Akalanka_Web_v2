import React, { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import '../styles/loading.css';

const LoadingScreen = ({ onComplete }) => {
    const typedRef = useRef(null);

    useEffect(() => {
        const bootText = `
<div class="terminal-line"><span class="prompt">></span> KasunAkalankaWeb v2.0</div>
<div class="terminal-line"><span class="prompt">></span> Verifying system integrity... <span class="color-green">PASSED</span></div>
<div class="terminal-line"><span class="prompt">></span> Loading Software Engineering profile... <span class="color-green">COMPLETE</span></div>
<div class="terminal-line"><span class="prompt">></span> Importing curiosity... <span class="color-green">∞</span></div>
<div class="terminal-line"><span class="prompt">></span> Connecting to GitHub... <span class="color-green">repositories synchronized</span></div>
<div class="terminal-line"><span class="prompt">></span> Formulating optimal racing line... <span class="color-green">DRS enabled</span></div>
<div class="terminal-line"><span class="prompt">></span> <span class="color-cyan">Welcome to Kasun's Universe</span></div>
`;

        const typed = new Typed(typedRef.current, {
            strings: [bootText],
            typeSpeed: 5,
            showCursor: true,
            cursorChar: '_',
            onComplete: () => {
                setTimeout(() => {
                    onComplete();
                }, 2000);
            },
        });

        return () => {
            typed.destroy();
        };
    }, [onComplete]);

    return (
        <div className="loading-screen">
            <div className="terminal-container">
                <h1 className="os-title">
                    <i className='bx bx-desktop'></i> GhostDevKA
                </h1>

                <div className="terminal-lines" style={{ display: 'block' }}>
                    <span ref={typedRef}></span>
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
