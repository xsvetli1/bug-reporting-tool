import { Card, CardActions, CardContent, IconButton, TextField } from '@mui/material';
import React from 'react';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';
import CheckIcon from '@mui/icons-material/Check';
import { UseStateSetter } from '../../../../models/UseStateSetter';

export interface TextProps {
    TYPE: 'TEXT';
    index: number;
    x: number;
    y: number;
    open: boolean;
}

interface TextPropsWithHandlers extends TextProps {
    moveHandlers: AnnotationMouseEventHandlers;
    setSelectedCommentId: UseStateSetter<number>;
}

const Text = ({ index, x, y, open, moveHandlers, setSelectedCommentId }: TextPropsWithHandlers) => {
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
                {index}
            </text>
            {open && (
                <foreignObject
                    x={x + 25}
                    y={y - 20}
                    width={1}
                    height={1}
                    className="text-annotation-comment-wrapper"
                >
                    <Card className="text-annotation-comment">
                        <CardContent sx={{ padding: '0' }}>
                            <TextField
                                id={`comment-${index}`}
                                variant="standard"
                                fullWidth
                                multiline
                                minRows={3}
                                placeholder="Write your comment here..."
                            />
                        </CardContent>
                        <CardActions
                            sx={{ padding: '0', paddingTop: '8px', flexDirection: 'row-reverse' }}
                        >
                            <IconButton
                                aria-label="submit comment"
                                className="annotation-tools-button"
                                sx={{ padding: 0 }}
                                onClick={() => setSelectedCommentId(-1)}
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
