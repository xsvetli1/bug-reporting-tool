import React from "react";
import IssueType from "../../../models/IssueType";
import '../Annotations.css';
export interface AnnotationAreaProps {
    issueType: IssueType;
}

const AnnotationArea = (props: AnnotationAreaProps) => {
    return (
        <svg className="annotation-area">
            {/* <rect fill="#ffffff" fill-opacity="0.3" width="100%" height="100%"/> */}
        </svg>
    );
};

export default AnnotationArea;
