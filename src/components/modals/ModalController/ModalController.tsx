import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Alert,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Snackbar,
    SnackbarOrigin
} from '@mui/material';
import IssueType from '../../../models/IssueType';
import { IssueInfo } from '../../../integration/models/IssueInfo';
import FormModalContent from '../FormModalContent';
import OptionsModalContent from '../OptionsModalContent';
import { FormProps } from '../../../models/FormProps';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { ToolContext } from '../../../contexts/ToolContext';

export interface ModalControllerProps {
    isEmailRequired: boolean;
    isToolOpen: boolean;
    setIsToolOpen: UseStateSetter<boolean>;
    isBugAnnotationOpen: boolean;
    setIsBugAnnotationOpen: UseStateSetter<boolean>;
    isIdeaAnnotationOpen: boolean;
    setIsIdeaAnnotationOpen: UseStateSetter<boolean>;
    setTheme: UseStateSetter<string>;
    newIssue: (issueInfo: IssueInfo) => Promise<boolean>;
}

/**
 * Component controlling issue type options modal and report form modal.
 *
 * It contains MUI Dialog component and based on some properties changes the content
 * between OptionsModalContent and FormModalContent.
 * It also shows Snackbar with success or error message after the issue is submitted
 */
const ModalController = (props: ModalControllerProps) => {
    const { isOngoingAnnotation, setIsOngoingAnnotation, setScreenshots } = useContext(ToolContext);
    const [formState, setFormState] = useState<FormProps>({});
    const [snackbarShown, setSnackbarShown] = useState(false);
    const [snackbarSuccess, setSnackbarSuccess] = useState(false);
    const [isCloseToolDialogShown, setIsCloseToolDialogShown] = useState(false);

    const screenshotUrlsRef = useRef<string[]>([]);
    const revokeScreenshotUrls = () => {
        screenshotUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
        screenshotUrlsRef.current = [];
    };

    const handleClose = () => {
        props.setIsToolOpen(false);
        props.setIsBugAnnotationOpen(false);
        props.setIsIdeaAnnotationOpen(false);
        setFormState({});
        setScreenshots([]);
    };

    const handleSafeClose = () => setIsCloseToolDialogShown(true);

    const handleSnackbarClose = () => setSnackbarShown(false);

    const formModalProps = (type: IssueType) => {
        return {
            isEmailRequired: props.isEmailRequired,
            formState: formState,
            setFormState: setFormState,
            type: type,
            newIssue: props.newIssue,
            setSnackbarShown: setSnackbarShown,
            setSnackbarSuccess: setSnackbarSuccess,
            setTheme: props.setTheme,
            handleAnnotate: () => setIsOngoingAnnotation(true),
            handleClose: handleClose,
            handleSafeClose: handleSafeClose
        };
    };

    const anchor: SnackbarOrigin = { vertical: 'bottom', horizontal: 'right' };

    useEffect(() => {
        if (!props.isToolOpen) revokeScreenshotUrls();
    }, [props.isToolOpen]);

    return (
        <div>
            <Dialog
                open={props.isToolOpen && !isOngoingAnnotation}
                onClose={() => {
                    if (props.isBugAnnotationOpen || props.isIdeaAnnotationOpen) {
                        handleSafeClose();
                    } else {
                        handleClose();
                    }
                }}
            >
                {props.isToolOpen && !props.isBugAnnotationOpen && !props.isIdeaAnnotationOpen && (
                    <OptionsModalContent
                        setIsBugAnnotationOpen={props.setIsBugAnnotationOpen}
                        setIsIdeaAnnotationOpen={props.setIsIdeaAnnotationOpen}
                        handleClose={handleClose}
                    />
                )}
                {props.isToolOpen && props.isBugAnnotationOpen && (
                    <FormModalContent
                        screenshotUrlsRef={screenshotUrlsRef}
                        {...formModalProps(IssueType.Bug)}
                    />
                )}
                {props.isToolOpen && props.isIdeaAnnotationOpen && (
                    <FormModalContent
                        screenshotUrlsRef={screenshotUrlsRef}
                        {...formModalProps(IssueType.Idea)}
                    />
                )}
            </Dialog>
            <Dialog open={isCloseToolDialogShown} sx={{ zIndex: 2147483647 }}>
                <DialogTitle>Close Bug Reporting Tool</DialogTitle>
                <DialogContent>
                    Are you sure want to close Bug Reporting Tool?
                    <br />
                    <br />
                    Please note that closing the tool will result in the loss of all your progress
                    and annotations.
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => setIsCloseToolDialogShown(false)}>
                        No
                    </Button>
                    <Button
                        onClick={() => {
                            setIsCloseToolDialogShown(false);
                            handleClose();
                        }}
                    >
                        Yes
                    </Button>
                </DialogActions>
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
