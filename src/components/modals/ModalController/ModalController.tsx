import React, { useContext, useState } from 'react';
import { Alert, Dialog, Snackbar, SnackbarOrigin } from '@mui/material';
import IssueType from '../../../models/IssueType';
import { IssueInfo } from '../../../integration/models/IssueInfo';
import FormModalContent from '../FormModalContent';
import OptionsModalContent from '../OptionsModalContent';
import { FormProps } from '../../../models/FormProps';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { ToolContext } from '../../BugReportingTool/ToolContext';

export interface ModalControllerProps {
    isToolOpen: boolean;
    setIsToolOpen: UseStateSetter<boolean>;
    isBugAnnotationOpen: boolean;
    setIsBugAnnotationOpen: UseStateSetter<boolean>;
    isIdeaAnnotationOpen: boolean;
    setIsIdeaAnnotationOpen: UseStateSetter<boolean>;
    setTheme: UseStateSetter<string>;
    newIssue: (issueInfo: IssueInfo) => Promise<boolean>;
}

const ModalController = (props: ModalControllerProps) => {
    const { isOngoingAnnotation, setIsOngoingAnnotation } = useContext(ToolContext);
    const [formState, setFormState] = useState<FormProps>({});
    const [snackbarShown, setSnackbarShown] = useState(false);
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);

    const handleClose = () => {
        props.setIsToolOpen(false);
        props.setIsBugAnnotationOpen(false);
        props.setIsIdeaAnnotationOpen(false);
        setFormState({});
    };

    const handleSnackbarClose = () => setSnackbarShown(false);

    const formModalProps = (type: IssueType) => {
        return {
            formState: formState,
            setFormState: setFormState,
            type: type,
            newIssue: props.newIssue,
            setSnackbarShown: setSnackbarShown,
            setSnackbarSuccess: setSnackbarSuccess,
            setTheme: props.setTheme,
            handleAnnotate: () => setIsOngoingAnnotation(true),
            handleClose: handleClose
        };
    };

    const anchor: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };

    return (
        <div>
            <Dialog open={props.isToolOpen && !isOngoingAnnotation} onClose={handleClose}>
                {props.isToolOpen && !props.isBugAnnotationOpen && !props.isIdeaAnnotationOpen && (
                    <OptionsModalContent
                        setIsBugAnnotationOpen={props.setIsBugAnnotationOpen}
                        setIsIdeaAnnotationOpen={props.setIsIdeaAnnotationOpen}
                        handleClose={handleClose}
                    />
                )}
                {props.isToolOpen && props.isBugAnnotationOpen && (
                    <FormModalContent {...formModalProps(IssueType.Bug)} />
                )}
                {props.isToolOpen && props.isIdeaAnnotationOpen && (
                    <FormModalContent {...formModalProps(IssueType.Idea)} />
                )}
            </Dialog>
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
        </div>
    );
};

export default ModalController;
