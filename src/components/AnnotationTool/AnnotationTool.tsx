import React from "react";
import { Modal } from "@mui/material";
import IssueType from "../../models/IssueType";

export interface AnnotationToolProps {
    issueType: IssueType;
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = (props: AnnotationToolProps) => {

    return (
        <Modal
            open={props.isOngoingAnnotation}
            onClose={props.handleClose}
        >
            <>{props.issueType.getLabel()}</>
        </Modal>
    );
};

export default AnnotationTool;
