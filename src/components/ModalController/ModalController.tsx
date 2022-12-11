import { Alert, Dialog, Snackbar } from "@mui/material";
import React, { useState } from "react";
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
    newIssue: (issueInfo: IssueInfo) => Promise<boolean>;
}

const ModalController = (props: ModalControllerProps) => {
    const [snackbarShown, setSnackbarShown] = useState(false);
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);
    const handleClose = () => {
        props.setIsToolOpen(false);
        props.setIsBugAnnotationOpen(false);
        props.setIsIdeaAnnotationOpen(false);
    };

    const optionsModal = () => {
        if (props.isToolOpen && !props.isBugAnnotationOpen && !props.isIdeaAnnotationOpen) {
            return <OptionsModalContent
                setIsBugAnnotationOpen={props.setIsBugAnnotationOpen}
                setIsIdeaAnnotationOpen={props.setIsIdeaAnnotationOpen}
                handleClose={handleClose}
            />;
        }
    };

    const formModal = (isFormOpen: boolean, type: IssueType) => {
        if (props.isToolOpen && isFormOpen) {
            return <FormModalContent
                type={type}
                newIssue={props.newIssue}
                setSnackbarShown={setSnackbarShown}
                setSnackbarSuccess={setSnackbarSuccess}
                handleClose={handleClose}
            />;
        }
    };

    const handleSnackbarClose = () => setSnackbarShown(false);
    const snackbar = () => {
        const {vertical, horizontal} = {vertical: 'bottom', horizontal: 'right'};
        return <Snackbar anchorOrigin={{ vertical, horizontal }} open={snackbarShown} autoHideDuration={5000} onClose={handleSnackbarClose}>
            <Alert onClose={handleSnackbarClose} severity={snackbarSuccess ? "success" : "error"} sx={{ width: '100%' }}>
                {snackbarSuccess ? "Your feedback has been succesfully submitted!" : "Error occured during feedback submission!"}
            </Alert>
        </Snackbar>
    };

    return (
        <div>
            <Dialog open={props.isToolOpen} onClose={handleClose}>
                {optionsModal()}
                {formModal(props.isBugAnnotationOpen, IssueType.Bug)}
                {formModal(props.isIdeaAnnotationOpen, IssueType.Idea)}
            </Dialog>
            {snackbar()}
        </div>
    );
};

export default ModalController;
