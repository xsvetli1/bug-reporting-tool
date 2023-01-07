import React from "react";
import { Modal } from "@mui/material";
import IssueType from "../../../models/IssueType";
import Canvas from "../Canvas";

export interface AnnotationToolProps {
    issueType: IssueType;
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = (props: AnnotationToolProps) => {

    const canvas = () => {
        if (props.isOngoingAnnotation) {
            return <Canvas/>;
        }
    };

    return (
        <div>
            {canvas()}
        </div>
    );
};

export default AnnotationTool;
