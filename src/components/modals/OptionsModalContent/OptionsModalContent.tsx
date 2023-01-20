import { Button, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React from 'react';
import { UseStateSetter } from '../../../models/UseStateSetter';

export interface OptionsModalContentProps {
    setIsBugAnnotationOpen: UseStateSetter<boolean>;
    setIsIdeaAnnotationOpen: UseStateSetter<boolean>;
    handleClose: () => void;
}

const OptionsModalContent = (props: OptionsModalContentProps) => {
    const onReportBugClick = () => {
        props.setIsBugAnnotationOpen(true);
    };

    const onSuggestIdeaClick = () => {
        props.setIsIdeaAnnotationOpen(true);
    };

    return (
        <div>
            <DialogTitle>Bug Reporting Tool</DialogTitle>
            <DialogContent>
                <Button onClick={onReportBugClick} variant="text" fullWidth>
                    Report a bug
                </Button>
                <Button onClick={onSuggestIdeaClick} variant="text" fullWidth>
                    Suggest new idea
                </Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
        </div>
    );
};

export default OptionsModalContent;
