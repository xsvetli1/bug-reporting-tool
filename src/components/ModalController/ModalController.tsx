import { Dialog } from "@mui/material";
import React from "react";
import IssueType from "../../common/IssueType";
import { IssueInfo } from "../../integration/IssueInfo";
import { BoolUseStateSetter } from "../BugReportingTool";
import FormModalContent from "../FormModalContent";
import OptionsModalContent from "../OptionsModalContent";

export interface ModalControllerProps {
    isToolOpen: boolean,
    setIsToolOpen: BoolUseStateSetter,
    isBugAnnotationOpen: boolean,
    setIsBugAnnotationOpen: BoolUseStateSetter,
    isIdeaAnnotationOpen: boolean,
    setIsIdeaAnnotationOpen: BoolUseStateSetter,
    newIssue: (issueInfo: IssueInfo) => Promise<void>;
}

const ModalController = (props: ModalControllerProps) => {
    const handleClose = () => {
        props.setIsToolOpen(false);
        props.setIsBugAnnotationOpen(false); // Should be unnecessary
        props.setIsIdeaAnnotationOpen(false); // Should be unnecessary
    }

    const optionsModal = () => {
        if (props.isToolOpen && !props.isBugAnnotationOpen && !props.isIdeaAnnotationOpen) {
            return <OptionsModalContent
                setIsBugAnnotationOpen={props.setIsBugAnnotationOpen}
                setIsIdeaAnnotationOpen={props.setIsIdeaAnnotationOpen}
                handleClose={handleClose}
            />;
        }
    }

    const formModal = (isFormOpen: boolean, type: IssueType) => {
        if (props.isToolOpen && isFormOpen) {
            return <FormModalContent type={type} newIssue={props.newIssue}/>;
        }
    }

    return (
        <div>
        <Dialog open={props.isToolOpen} onClose={handleClose}>
            {optionsModal()}
            {formModal(props.isBugAnnotationOpen, IssueType.Bug)}
            {formModal(props.isIdeaAnnotationOpen, IssueType.Idea)}
        </Dialog>
    </div>
    );
};

export default ModalController;
