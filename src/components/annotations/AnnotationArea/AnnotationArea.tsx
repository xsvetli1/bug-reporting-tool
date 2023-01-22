import React, { ReactNode } from 'react';
import { SelectAreaProps } from '../tools/SelectArea';
import { ReactMouseEvent, ReactTouchEvent, SelectedAreas } from '../types';

type AnnotationToolEventHandlers = {
    onMouseDown: (event: ReactMouseEvent) => void;
    onMouseUp: (event: ReactMouseEvent) => void;
    onMouseMove: (event: ReactMouseEvent) => void;
    onTouchStart: (event: ReactTouchEvent) => void;
    onTouchMove: (event: ReactTouchEvent) => void;
};

export interface AnnotationAreaProps {
    selectedAreas: SelectedAreas;
    mouseEventHandlers: AnnotationToolEventHandlers;
    children: ReactNode;
}

const AnnotationArea = (props: AnnotationAreaProps) => {
    const rectToPathData = ({ x, y, width, height }: SelectAreaProps) =>
        `M ${x} ${y} h ${width} v ${height} h ${-width} Z`;

    const pathDataFromSelectedAreas = () =>
        Object.keys(props.selectedAreas).map((key: string) => {
            return rectToPathData(props.selectedAreas[key]);
        });

    const width = window.innerWidth;
    const height = window.innerHeight;

    const background = rectToPathData({
        x: 0,
        y: 0,
        width: width,
        height: height
    });
    const d = [background, ...pathDataFromSelectedAreas()].join('\n');

    return (
        <svg className="annotation-area" {...props.mouseEventHandlers}>
            <path fill="#ffffff" fillOpacity="0.3" fillRule="evenodd" d={d}></path>
            {props.children}
        </svg>
    );
};

export default AnnotationArea;
