import React, { useRef, useState } from "react";
import IssueType from "../../../models/IssueType";
import AnnotationArea from "../AnnotationArea";
import '../Annotations.css';
import CloseButton from "../CloseButton";
import { SelectAreaProps } from "../components/SelectArea";
import SelectAreaTool from "../tools/SelectAreaTool";

export interface AnnotationToolProps {
    issueType: IssueType;
    isOngoingAnnotation: boolean;
    handleClose: () => void;
};

export type SelectedAreas = {
    [id: string]: SelectAreaProps;
};

export type ReactMouseEvent = React.MouseEvent<SVGSVGElement, MouseEvent>;
export type ReactTouchEvent = React.TouchEvent<SVGSVGElement>;

export type AnnotationToolEventHandlers = {
    onMouseDown: (event: ReactMouseEvent) => void;
    onMouseUp: (event: ReactMouseEvent) => void;
    onMouseMove: (event: ReactMouseEvent) => void;
    onTouchStart: (event: ReactTouchEvent) => void;
    onTouchMove: (event: ReactTouchEvent) => void;
}

const AnnotationTool = (props: AnnotationToolProps) => {

    const [annotations, setAnnotations] = useState<JSX.Element[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});

    const selectAreaHandlersRef = useRef<AnnotationToolEventHandlers>(null);

    const allMouseEvents = {
        onMouseDown: (event: ReactMouseEvent) => selectAreaHandlersRef.current?.onMouseDown(event),
        onMouseUp: (event: ReactMouseEvent) => selectAreaHandlersRef.current?.onMouseUp(event),
        onMouseMove: (event: ReactMouseEvent) => selectAreaHandlersRef.current?.onMouseMove(event),
        onTouchStart: (event: ReactTouchEvent) => selectAreaHandlersRef.current?.onTouchStart(event),
        onTouchMove: (event: ReactTouchEvent) => selectAreaHandlersRef.current?.onTouchMove(event)
    };

    const tool = () => {
        if (props.isOngoingAnnotation) {
            return (
                <div>
                    <AnnotationArea selectedAreas={selectedAreas} mouseEvents={allMouseEvents}>
                        {annotations}
                    </AnnotationArea>
                    <SelectAreaTool
                        annotations={annotations} setAnnotations={setAnnotations}
                        selectedAreas={selectedAreas} setSelectedAreas={setSelectedAreas}
                        ref={selectAreaHandlersRef}
                    ></SelectAreaTool>
                    <div className="annotation-area-content">
                        <CloseButton onClick={props.handleClose} />
                    </div>
                </div>
            );
        }
    };

    return <div>{tool()}</div>;
};

export default AnnotationTool;
