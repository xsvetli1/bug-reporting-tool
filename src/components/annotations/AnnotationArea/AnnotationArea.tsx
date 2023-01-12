import React from "react";
import { MouseEvents, SelectedAreas } from "../AnnotationTool";
import { SelectAreaProps } from "../tools/SelectArea";

export interface AnnotationAreaProps {
    selectedAreas: SelectedAreas;
    mouseEvents: MouseEvents;
    children: JSX.Element[];
}

const AnnotationArea = (props: AnnotationAreaProps) => {

    const rectToPathData = (selectAreaProps: SelectAreaProps) => {
        const {x, y, width, height} = selectAreaProps;
        return `M ${x} ${y} h ${width} v ${height} h ${-width} Z`;
    };
    
    const pathDataFromSelectedAreas = () => {
        return Object.keys(props.selectedAreas).map((key: string, _: number) => {
            return rectToPathData(props.selectedAreas[key]);
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
        <svg className="annotation-area" {...props.mouseEvents}>
            {areaPath()}
            {props.children}
        </svg>
    );
};

export default AnnotationArea;
