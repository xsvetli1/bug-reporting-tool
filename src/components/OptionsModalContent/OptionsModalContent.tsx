import { Button, DialogActions, DialogContent, DialogContentText } from "@mui/material";
import React from "react";
import { BoolUseStateSetter } from "../BugReportingTool";

export interface OptionsModalContentProps {
    setIsBugAnnotationOpen: BoolUseStateSetter,
    setIsIdeaAnnotationOpen: BoolUseStateSetter,
    handleClose: () => void
}

const OptionsModalContent = (props: OptionsModalContentProps) => {
    const onReportBugClick = () => {
        props.setIsBugAnnotationOpen(true);
    }

    const onSuggestIdeaClick = () => {
        props.setIsIdeaAnnotationOpen(true);
    }

    return (
        <div>
            <DialogContent>
                <DialogContentText>
                    Bug Reporting Tool
                </DialogContentText>
                <Button onClick={onReportBugClick} variant="text">Report a bug</Button>
                <Button onClick={onSuggestIdeaClick} variant="text">Suggest new idea</Button>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
            </DialogActions>
        </div>
    );
};

export default OptionsModalContent;
