import { Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';
import React from 'react';
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
    const CIRCLE_RADIUS = 17;
    const MIN_ROWS = 3;
    const CARD_WIDTH = '250px';
    const PADDING = '8px';

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
                    x={x + CIRCLE_RADIUS + 8}
                    y={y - (CIRCLE_RADIUS + 3)}
                    width={1}
                    height={1}
                    className="text-annotation-comment-wrapper"
                    onMouseDown={(event) => event.stopPropagation()}
                >
                    <Card style={{ width: CARD_WIDTH, padding: PADDING }}>
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
                            sx={{ padding: '0', paddingTop: PADDING, flexDirection: 'row-reverse' }}
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
