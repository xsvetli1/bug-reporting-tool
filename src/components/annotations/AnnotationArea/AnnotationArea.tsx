import React, { ReactNode, useContext } from 'react';
import { ISSUE_TYPE_BASED } from '../../../models/Colors';
import { AnnotationContext } from '../AnnotationTool/AnnotationContext';
import { getSVGHeigth, getSVGWidth } from '../helpers/CoordinatesHelper';
import { SelectAreaProps } from '../tools/SelectArea';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

export interface AnnotationAreaProps {
    mouseEventHandlers: AnnotationMouseEventHandlers;
    children: ReactNode;
}

const AnnotationArea = (props: AnnotationAreaProps) => {
    const { selectedAreas } = useContext(AnnotationContext);

    const rectToPathData = ({ shift, x, y, width, height }: SelectAreaProps) =>
        `M ${x + shift.x} ${y + shift.y} h ${width} v ${height} h ${-width} Z`;

    const pathDataFromSelectedAreas = () =>
        Object.keys(selectedAreas).map((key: string) => {
            return rectToPathData(selectedAreas[key]);
        });

    const background = rectToPathData({
        type: 'SELECT_AREA',
        shift: { x: 0, y: 0 },
        x: 0,
        y: 0,
        width: getSVGWidth(),
        height: getSVGHeigth()
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
                    <polygon points="2 2, 9 5.5, 2 9" strokeWidth={1} fill={ISSUE_TYPE_BASED} />
                </marker>
            </defs>
            <path fill="#ffffff" stroke="none" fillOpacity="0.3" fillRule="evenodd" d={d}></path>
            {props.children}
        </svg>
    );
};

export default AnnotationArea;
