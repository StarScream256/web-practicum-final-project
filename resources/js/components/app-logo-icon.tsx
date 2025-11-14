import { BadgeJapaneseYen } from 'lucide-react';
import React from 'react';

interface AppLogoIconProps extends React.HTMLAttributes<HTMLSpanElement> {
    size?: number;
}

export default function AppLogoIcon({
    className,
    size = 18,
    ...props
}: AppLogoIconProps) {
    return <BadgeJapaneseYen size={size} className={className} />;
}
