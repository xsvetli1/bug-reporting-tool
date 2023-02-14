import { Card, CardContent, TextareaAutosize } from '@mui/material';
import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';

export interface TextProps {
    TYPE: 'TEXT';
    id: number;
    x: number;
    y: number;
}

interface TextPropsWithHandlers extends TextProps {
    moveHandlers: AnnotationMouseEventHandlers;
}

const Text = ({ id, x, y, moveHandlers }: TextPropsWithHandlers) => {
    return (
        <g {...moveHandlers}>
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
            <foreignObject
                x={x + 17}
                y={y}
                width={1}
                height={1}
                className="text-annotation-comment-wrapper"
            >
                <Card className="text-annotation-comment">
                    <CardContent>
                        <TextareaAutosize />
                    </CardContent>
                </Card>
            </foreignObject>
        </g>
    );
};

export default Text;
