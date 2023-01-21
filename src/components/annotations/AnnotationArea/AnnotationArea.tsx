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
    mouseEvents: AnnotationToolEventHandlers;
    children: ReactNode;
}

const AnnotationArea = ({ selectedAreas, mouseEvents, children }: AnnotationAreaProps) => {
    const rectToPathData = (selectAreaProps: SelectAreaProps) => {
        const { x, y, width, height } = selectAreaProps;
        return `M ${x} ${y} h ${width} v ${height} h ${-width} Z`;
    };

    const pathDataFromSelectedAreas = () => {
        return Object.keys(selectedAreas).map((key: string) => {
            return rectToPathData(selectedAreas[key]);
        });
    };

    const areaPath = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const background = rectToPathData({
            x: 0,
            y: 0,
            width: width,
            height: height
        });
        const d = [background, ...pathDataFromSelectedAreas()].join('\n');

        return <path fill="#ffffff" fillOpacity="0.3" fillRule="evenodd" d={d}></path>;
    };

    return (
        <svg className="annotation-area" {...mouseEvents}>
            {areaPath()}
            {children}
        </svg>
    );
};

export default AnnotationArea;
