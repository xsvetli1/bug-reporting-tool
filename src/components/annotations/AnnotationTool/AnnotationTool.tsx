import React, { useState } from "react";
import IssueType from "../../../models/IssueType";
import AnnotationArea from "../AnnotationArea";
import '../Annotations.css';
import CloseButton from "../CloseButton";
import { AnnotationProps } from "../tools/AnnotationProps";
import SelectArea, { useSelectArea } from "../tools/SelectArea";
import { SelectedAreas } from "../types/SelectedAreas";

export interface AnnotationToolProps {
    issueType: IssueType;
    isOngoingAnnotation: boolean;
    handleClose: () => void;
};

const AnnotationTool = (props: AnnotationToolProps) => {

    const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});

    const annotate = (annotation: AnnotationProps) => setAnnotations([
        ...annotations,
        annotation
    ]);

    const selectAreaTool = useSelectArea({
        annotations: annotations,
        annotate: annotate,
        selectedAreas: selectedAreas,
        setSelectedAreas: setSelectedAreas
    });    

    const tool = () => {
        if (props.isOngoingAnnotation) {
            return (
                <div>
                    <AnnotationArea selectedAreas={selectedAreas} mouseEvents={selectAreaTool}>
                        {annotations.map((annotationProps, index) => 
                            <SelectArea key={index} {...annotationProps} />
                        )}
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
