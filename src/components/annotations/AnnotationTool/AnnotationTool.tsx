import React, { useState } from "react";
import IssueType from "../../../models/IssueType";
import AnnotationArea from "../AnnotationArea";
import '../Annotations.css';
import CloseButton from "../CloseButton";
import { SelectAreaProps } from "../components/SelectArea";
import { useSelectAreaTool } from "../tools/SelectAreaTool/SelectAreaTool";

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

const AnnotationTool = (props: AnnotationToolProps) => {

    const [annotations, setAnnotations] = useState<JSX.Element[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});

    const selectAreaTool = useSelectAreaTool({
        annotations: annotations,
        setAnnotations: setAnnotations,
        selectedAreas: selectedAreas,
        setSelectedAreas: setSelectedAreas
    });

    const tool = () => {
        if (props.isOngoingAnnotation) {
            return (
                <div>
                    <AnnotationArea selectedAreas={selectedAreas} mouseEvents={selectAreaTool}>
                        {annotations}
                    </AnnotationArea>
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
