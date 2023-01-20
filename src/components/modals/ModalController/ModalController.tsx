import React, { useState } from 'react';
import { Alert, Dialog, Snackbar, SnackbarOrigin } from '@mui/material';
import IssueType from '../../../models/IssueType';
import { IssueInfo } from '../../../integration/IssueInfo';
import FormModalContent from '../FormModalContent';
import OptionsModalContent from '../OptionsModalContent';
import { FormProps } from '../../../models/FormProps';
import { UseStateSetter } from '../../../models/UseStateSetter';

export interface ModalControllerProps {
    isToolOpen: boolean;
    setIsToolOpen: UseStateSetter<boolean>;
    isBugAnnotationOpen: boolean;
    setIsBugAnnotationOpen: UseStateSetter<boolean>;
    isIdeaAnnotationOpen: boolean;
    setIsIdeaAnnotationOpen: UseStateSetter<boolean>;
    isOngoingAnnotation: boolean;
    setIsOngoingAnnotation: UseStateSetter<boolean>;
    setTheme: UseStateSetter<string>;
    newIssue: (issueInfo: IssueInfo) => Promise<boolean>;
}

const ModalController = (props: ModalControllerProps) => {
    const [formState, setFormState] = useState<FormProps>({});
    const [snackbarShown, setSnackbarShown] = useState(false);
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);

    const handleClose = () => {
        props.setIsToolOpen(false);
        props.setIsBugAnnotationOpen(false);
        props.setIsIdeaAnnotationOpen(false);
        setFormState({});
    };

    const optionsModal = () => {
        if (props.isToolOpen && !props.isBugAnnotationOpen && !props.isIdeaAnnotationOpen) {
            return (
                <OptionsModalContent
                    setIsBugAnnotationOpen={props.setIsBugAnnotationOpen}
                    setIsIdeaAnnotationOpen={props.setIsIdeaAnnotationOpen}
                    handleClose={handleClose}
                />
            );
        }
    };

    const formModal = (isFormOpen: boolean, type: IssueType) => {
        if (props.isToolOpen && isFormOpen) {
            return (
                <FormModalContent
                    formState={formState}
                    setFormState={setFormState}
                    type={type}
                    newIssue={props.newIssue}
                    setSnackbarShown={setSnackbarShown}
                    setSnackbarSuccess={setSnackbarSuccess}
                    setTheme={props.setTheme}
                    handleAnnotate={() => props.setIsOngoingAnnotation(true)}
                    handleClose={handleClose}
                />
            );
        }
    };

    const handleSnackbarClose = () => setSnackbarShown(false);
    const snackbar = () => {
        const anchor = { vertical: 'bottom', horizontal: 'right' } as SnackbarOrigin;
        return (
            <Snackbar
                anchorOrigin={anchor}
                open={snackbarShown}
                autoHideDuration={5000}
                onClose={handleSnackbarClose}
            >
                <Alert
                    onClose={handleSnackbarClose}
                    severity={snackbarSuccess ? 'success' : 'error'}
                    sx={{ width: '100%' }}
                >
                    {snackbarSuccess
                        ? 'Your feedback has been succesfully submitted!'
                        : 'Error occured during feedback submission!'}
                </Alert>
            </Snackbar>
        );
    };

    return (
        <div>
            <Dialog open={props.isToolOpen && !props.isOngoingAnnotation} onClose={handleClose}>
                {optionsModal()}
                {formModal(props.isBugAnnotationOpen, IssueType.Bug)}
                {formModal(props.isIdeaAnnotationOpen, IssueType.Idea)}
            </Dialog>
            {snackbar()}
        </div>
    );
};

export default ModalController;
