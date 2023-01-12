import React, { useEffect, useState } from "react";
import IssueType from "../../../models/IssueType";
import AnnotationArea from "../AnnotationArea";
import '../Annotations.css';
import CloseButton from "../CloseButton";
import SelectArea, { SelectAreaProps } from "../tools/SelectArea";

export interface AnnotationToolProps {
    issueType: IssueType;
    isOngoingAnnotation: boolean;
    handleClose: () => void;
};

export type SelectedAreas = {
    [id: string]: SelectAreaProps;
};

type ReactMouseEvent = React.MouseEvent<SVGSVGElement, MouseEvent>;
export type MouseEvents = {
    onMouseDown: (event: ReactMouseEvent) => void;
    onMouseUp: (event: ReactMouseEvent) => void;
    onMouseMove: (event: ReactMouseEvent) => void;
};

const AnnotationTool = (props: AnnotationToolProps) => {

    const [annotations, setAnnotations] = useState<JSX.Element[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const annotate = (annotation: JSX.Element) => setAnnotations([
        ...annotations,
        annotation
    ]);

    const selectArea = (selectAreaProps: SelectAreaProps, id=annotations.length) => {
        selectedAreas[id] = selectAreaProps;
        setSelectedAreas({...selectedAreas}); // Needs to be shallow copy to make setState re-render
        
        if (id === annotations.length) {
            annotate(<SelectArea key={id} {...selectAreaProps} />);
        }
    }

    const getX = (event: ReactMouseEvent) => {
        const element = event.currentTarget.getBoundingClientRect();
        return event.clientX - element.left - 3; // 3 is border-width
    }

    const getY = (event: ReactMouseEvent) => {
        const element = event.currentTarget.getBoundingClientRect();
        return event.clientY - element.top - 3; // 3 is border-width
    }

    const handleMouseDown = (event: ReactMouseEvent) => {
        setStartX(getX(event));
        setStartY(getY(event));
        setSelecting(true);

        selectArea({
            x: startX,
            y: startY,
            width: 0,
            height: 0
        });
    }

    const handleMouseUp = (event: ReactMouseEvent) => {
        setSelecting(false);
    }

    const handleMouseMove = (event: ReactMouseEvent) => {
        if (!selecting) {
            return;
        }

        const [x, y] = [getX(event), getY(event)];
        
        selectArea(
            {
                x: startX,
                y: startY,
                width: x - startX,
                height: y - startY
            },
            annotations.length-1
        );
    }

    const handleTouchStart = (event: ReactMouseEvent) => {
    }

    const handleTouchMove = (event: ReactMouseEvent) => {
    }

    const allMouseEvents = {
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseMove: handleMouseMove
    };
    
    const tool = () => {
        if (props.isOngoingAnnotation) {
            return (
                <div>
                    <AnnotationArea selectedAreas={selectedAreas} mouseEvents={allMouseEvents}>
                        {annotations}
                    </AnnotationArea>
                    <div className="annotation-area-content">
                        <CloseButton onClick={props.handleClose}/>
                    </div>
                </div>
            );
        }
    };

    return <div>{tool()}</div>;
};

export default AnnotationTool;
