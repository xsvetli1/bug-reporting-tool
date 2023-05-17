import React, { ReactNode, useContext } from 'react';
import { ISSUE_TYPE_BASED } from '../../../models/Colors';
import { AnnotationContext } from '../../../contexts/AnnotationContext';
import { getSVGHeigth, getSVGWidth } from '../helpers/CoordinatesHelper';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';
import { rectToPathData } from '../helpers/RectangleHelper';

export interface AnnotationAreaProps {
    mouseEventHandlers: AnnotationMouseEventHandlers;
    children: ReactNode;
}

/**
 * Wrapper for the main SVG element covering whole screen.
 *
 * It defines also a tip of arrow as a <marker>. It contains a function for
 * displaying a rectangle.
 */
const AnnotationArea = (props: AnnotationAreaProps) => {
    const { selectedAreas } = useContext(AnnotationContext);

    const pathDataFromSelectedAreas = () =>
        Object.keys(selectedAreas).map((key: string) => {
            return rectToPathData(selectedAreas[key]);
        });

    const d = [background, ...pathDataFromSelectedAreas()].join('\n');

    return (
        <svg id="annotation-area" {...props.mouseEventHandlers}>
            <defs>
                <marker
                    id="arrowhead"
                    markerWidth="11"
                    markerHeight="11"
                    refX="9"
                    refY="5.5"
                    orient="auto"
                >
                    <polygon points="2 2, 9 5.5, 2 9" strokeWidth={1} fill={ISSUE_TYPE_BASED} />
                </marker>
            </defs>
            <path fill="#ffffff" stroke="none" fillOpacity="0.3" fillRule="evenodd" d={d}></path>
            {props.children}
        </svg>
    );
};

const background = rectToPathData({
    type: 'SELECT_AREA',
    shift: { x: 0, y: 0 },
    x: 0,
    y: 0,
    width: getSVGWidth(),
    height: getSVGHeigth()
});

export default AnnotationArea;
