import React from 'react';

interface AppLogoIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    // size?:
    //     | 'text-xs'
    //     | 'text-sm'
    //     | 'text-base'
    //     | 'text-lg'
    //     | 'text-xl'
    //     | 'text-2xl'
    //     | 'text-3xl'
    //     | 'text-4xl'
    //     | 'text-5xl'
    //     | 'text-6xl'
    //     | 'text-7xl'
    //     | 'text-8xl'
    //     | 'text-9xl';
}

export default function AppLogoIcon({ className, ...props }: AppLogoIconProps) {
    return (
        <span
            className={`material-symbols-outlined w-fit ${className || ''}`}
            {...props}
        >
            rice_bowl
        </span>
    );
}
