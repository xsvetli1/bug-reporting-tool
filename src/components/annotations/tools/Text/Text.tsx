import { Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';
import React, { createRef, useEffect, useState } from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import CheckIcon from '@mui/icons-material/Check';
import { UseStateSetter } from '../../../../models/UseStateSetter';
import { ISSUE_TYPE_BASED_DARK, ISSUE_TYPE_BASED_LIGHT } from '../../../../models/Colors';

export interface TextProps {
    TYPE: 'TEXT';
    index: number;
    x: number;
    y: number;
    open: boolean;
}

interface TextPropsWithHandlers extends TextProps {
    moveHandlers: AnnotationMouseEventHandlers;
    setSelectedCommentId: UseStateSetter<string>;
}

const Text = ({ index, x, y, open, moveHandlers, setSelectedCommentId }: TextPropsWithHandlers) => {
    const MIN_ROWS = 3;
    const CARD_WIDTH = 250;
    const PADDING = 8;
    const CIRCLE_RADIUS = 17;
    const CARD_X_SHIFT = 8;

    const cardRef = createRef<HTMLDivElement>();
    const [cardHeight, setCardHeight] = useState(0);

    useEffect(() => {
        if (cardRef.current) {
            setCardHeight(cardRef.current.clientHeight);
        }
    }, []);

    const CARD_X =
        x + CIRCLE_RADIUS + CARD_X_SHIFT + CARD_WIDTH + 2 * PADDING >= window.innerWidth
            ? x - (CIRCLE_RADIUS + CARD_X_SHIFT + CARD_WIDTH + 2 * PADDING)
            : x + CIRCLE_RADIUS + CARD_X_SHIFT;

    const CARD_Y = Math.min(y - CIRCLE_RADIUS, window.innerHeight - cardHeight - CIRCLE_RADIUS);

    const inPx = (size: number) => `${size}px`;

    return (
        <g {...moveHandlers}>
            <circle
                cx={x}
                cy={y}
                r={CIRCLE_RADIUS}
                stroke={ISSUE_TYPE_BASED_DARK}
                fill={ISSUE_TYPE_BASED_LIGHT}
            />
            <text
                x={x}
                y={y + 1}
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-annotation-id"
            >
                {index}
            </text>
            {open && (
                <foreignObject
                    x={CARD_X}
                    y={CARD_Y}
                    width={1}
                    height={1}
                    className="text-annotation-comment-wrapper"
                    onMouseDown={(event) => event.stopPropagation()}
                >
                    <Card
                        ref={cardRef}
                        onChange={(event) => setCardHeight(event.currentTarget.clientHeight)}
                        style={{ width: inPx(CARD_WIDTH), padding: inPx(PADDING) }}
                    >
                        <CardContent sx={{ padding: '0' }}>
                            <TextField
                                id={`comment-${index}`}
                                variant="standard"
                                fullWidth
                                multiline
                                minRows={MIN_ROWS}
                                placeholder="Write your comment here..."
                            />
                        </CardContent>
                        <CardActions
                            sx={{
                                padding: '0',
                                paddingTop: inPx(PADDING),
                                flexDirection: 'row-reverse'
                            }}
                        >
                            <IconButton
                                aria-label="submit comment"
                                className="annotation-tools-button"
                                sx={{ padding: 0 }}
                                onClick={() => setSelectedCommentId('')}
                            >
                                <CheckIcon />
                            </IconButton>
                        </CardActions>
                    </Card>
                </foreignObject>
            )}
        </g>
    );
};

export default Text;
