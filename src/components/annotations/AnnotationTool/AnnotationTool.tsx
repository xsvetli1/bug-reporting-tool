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
}

export type SelectedAreas = {
    [id: string]: SelectAreaProps;
};

const AnnotationTool = (props: AnnotationToolProps) => {

    const [annotations, setAnnotations] = useState<JSX.Element[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({})

    const annotate = (annotation: JSX.Element) => useEffect(
        () => setAnnotations([
            ...annotations,
            annotation
        ]),
        []
    );

    const selectArea = (selectAreaProps: SelectAreaProps) => {
        const id = annotations.length;
        
        useEffect(() => setSelectedAreas({
            ...selectedAreas,
            [id]: selectAreaProps
        }), []);
        
        annotate(<SelectArea key={id} {...selectAreaProps} />);
    }
    
    const tool = () => {
        if (props.isOngoingAnnotation) {
            return (
                <div>
                    <AnnotationArea selectedAreas={selectedAreas}>
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
