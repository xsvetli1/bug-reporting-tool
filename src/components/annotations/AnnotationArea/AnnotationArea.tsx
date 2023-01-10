import React, { useEffect, useRef } from "react";
import IssueType from "../../../models/IssueType";
import '../Annotations.css';
export interface AnnotationAreaProps {
    issueType: IssueType;
}

const AnnotationArea = (props: AnnotationAreaProps) => {
    const htmlClasses = "annotation-area "
        + (props.issueType == IssueType.Bug
            ? "bug-annotation-area"
            : "issue-annotation-area");
    
    const issueColor = () => {
        return props.issueType == IssueType.Bug
            ? "var(--bug-color)"
            : "var(--issue-color)";
    }

    return (
        <svg className={htmlClasses}>
            {/* <rect fill="#ffffff" fill-opacity="0.3" width="100%" height="100%"/> */}
        </svg>
    );
};

export default AnnotationArea;
