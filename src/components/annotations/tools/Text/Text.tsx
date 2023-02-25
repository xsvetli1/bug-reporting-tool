import React, { createRef, useEffect, useState } from 'react';
import { Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import { UseStateSetter } from '../../../../models/UseStateSetter';
import { ISSUE_TYPE_BASED_DARK, ISSUE_TYPE_BASED_LIGHT } from '../../../../models/Colors';
import CheckIcon from '@mui/icons-material/Check';
import { getSVGHeigth, getSVGWidth } from '../CoordinatesHelper';
import { AnnotationProps } from '../AnnotationProps';

export interface TextProps extends AnnotationProps<'TEXT'> {
    id: string;
    index: number;
    x: number;
    y: number;
    open: boolean;
}

interface TextPropsWithHandlers extends TextProps {
    moveHandlers: AnnotationMouseEventHandlers;
    setSelectedCommentIds: UseStateSetter<string[]>;
}

const Text = ({
    xShift,
    yShift,
    id,
    index,
    x,
    y,
    open,
    moveHandlers,
    setSelectedCommentIds
}: TextPropsWithHandlers) => {
    const cardRef = createRef<HTMLDivElement>();
    const [cardHeight, setCardHeight] = useState(0);
    const [comment, setComment] = useState('');

    const MIN_ROWS = 3;
    const CARD_WIDTH = 250;
    const PADDING = 8;
    const CIRCLE_RADIUS = 17;
    const CARD_X_SHIFT = 8;

    x = Math.min(Math.max(x, CIRCLE_RADIUS), getSVGWidth() - CIRCLE_RADIUS);
    y = Math.min(Math.max(y, CIRCLE_RADIUS), getSVGHeigth() - CIRCLE_RADIUS);

    // Condition x + xShift >= CIRCLE_RADIUS AND x + xShift < getSVGWidth() - CIRCLE_RADIUS
    // impies following xShift and analogically yShift adjustments
    xShift = Math.min(Math.max(xShift, CIRCLE_RADIUS - x), getSVGWidth() - CIRCLE_RADIUS - x);
    yShift = Math.min(Math.max(yShift, CIRCLE_RADIUS - y), getSVGHeigth() - CIRCLE_RADIUS - y);

    const CARD_X =
        x + xShift + CIRCLE_RADIUS + CARD_X_SHIFT + CARD_WIDTH + 2 * PADDING >= window.innerWidth
            ? x - (CIRCLE_RADIUS + CARD_X_SHIFT + CARD_WIDTH + 2 * PADDING)
            : x + CIRCLE_RADIUS + CARD_X_SHIFT;

    const CARD_Y =
        y + yShift - CIRCLE_RADIUS > window.innerHeight - cardHeight - CIRCLE_RADIUS
            ? window.innerHeight - cardHeight - CIRCLE_RADIUS - yShift
            : y - CIRCLE_RADIUS;

    useEffect(() => {
        if (cardRef.current) {
            setCardHeight(cardRef.current.clientHeight);
        }
    }, []);

    const inPx = (size: number) => `${size}px`;

    return (
        <g style={{ transform: `matrix(1, 0, 0, 1, ${xShift}, ${yShift})` }} {...moveHandlers}>
            <g className="annotation">
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
            </g>
            {open && (
                <foreignObject
                    x={CARD_X}
                    y={CARD_Y}
                    width={1}
                    height={1}
                    className="text-annotation-comment-wrapper"
                    onMouseDown={(event) => event.stopPropagation()}
                >
                    <Card ref={cardRef} style={{ width: inPx(CARD_WIDTH), padding: inPx(PADDING) }}>
                        <CardContent sx={{ padding: '0' }}>
                            <TextField
                                id={`comment-${index}`}
                                variant="standard"
                                fullWidth
                                multiline
                                rows={MIN_ROWS}
                                placeholder="Write your comment here..."
                                defaultValue={comment}
                                onChange={(event) => setComment(event.currentTarget.value)}
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
                                onClick={() =>
                                    setSelectedCommentIds((selectedCommentIds) =>
                                        selectedCommentIds.filter((commentId) => commentId != id)
                                    )
                                }
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
