import React, { ReactNode } from 'react';
import { SelectAreaProps } from '../tools/SelectArea';
import { SelectedAreas } from '../types';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

export interface AnnotationAreaProps {
    selectedAreas: SelectedAreas;
    mouseEventHandlers: AnnotationMouseEventHandlers;
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
        TYPE: 'SELECT_AREA',
        x: 0,
        y: 0,
        width: width,
        height: height
    });
    const d = [background, ...pathDataFromSelectedAreas()].join('\n');

    return (
        <svg className="annotation-area" {...props.mouseEventHandlers}>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="11"
                    markerHeight="11"
                    refX="9"
                    refY="5.5"
                    orient="auto"
                >
                    <polygon
                        points="2 2, 9 5.5, 2 9"
                        strokeWidth={1}
                        fill={'var(--issue-type-based)'}
                    />
                </marker>
            </defs>
            <path fill="#ffffff" stroke="none" fillOpacity="0.3" fillRule="evenodd" d={d}></path>
            {props.children}
        </svg>
    );
};

export default AnnotationArea;
