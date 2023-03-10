import React from 'react';
import { DeleteButton } from './DeleteButton';

export interface WrappedDeleteButtonProps {
    x: number;
    y: number;
    deleteCallback?: () => void;
}

export const WrappedDeleteButton = ({ x, y, deleteCallback }: WrappedDeleteButtonProps) => {
    return (
        <foreignObject x={x} y={y} width={1} height={1} className="svg-foreign-object">
            <DeleteButton deleteCallback={deleteCallback} />
        </foreignObject>
    );
};
