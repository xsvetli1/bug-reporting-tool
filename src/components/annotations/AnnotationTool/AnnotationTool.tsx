import React from "react";
import IssueType from "../../../models/IssueType";
import AnnotationArea from "../AnnotationArea";
import '../Annotations.css';
import CloseButton from "../CloseButton";

export interface AnnotationToolProps {
    issueType: IssueType;
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = (props: AnnotationToolProps) => {

    const annotationArea = () => {
        if (props.isOngoingAnnotation) {
            return (
                <div>
                    <AnnotationArea issueType={props.issueType}/>
                    <div className="annotation-area-content">
                        <CloseButton onClick={props.handleClose}/>
                    </div>
                </div>
            );
        }
    };

    return <div>{annotationArea()}</div>;
};

export default AnnotationTool;
