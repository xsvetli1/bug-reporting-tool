import React from 'react';

export interface TextProps {
    TYPE: 'TEXT';
    id: number;
    x: number;
    y: number;
}

const Text = ({ id, x, y }: TextProps) => {
    return (
        <g>
            <circle
                cx={x}
                cy={y}
                r={17}
                stroke="var(--issue-type-based-dark)"
                fill="var(--issue-type-based-light)"
            />
            <text
                x={x}
                y={y + 1}
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-annotation-id"
            >
                {id}
            </text>
        </g>
    );
};

export default Text;
