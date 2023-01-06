import React, { useRef } from "react";
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import IssueType from "../../models/IssueType";
import { IssueInfo } from "../../integration/IssueInfo";
import { BoolUseStateSetter } from "../BugReportingTool";

export interface FormModalContentProps {
    type: IssueType,
    newIssue: (issueInfo: IssueInfo) => Promise<boolean>,
    setSnackbarShown: BoolUseStateSetter,
    setSnackbarSuccess: BoolUseStateSetter,
    handleClose: () => void
}

const FormModalContent = (props: FormModalContentProps) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);
    
    const sendHandler = async () => {
        props.handleClose();
        let success = await props.newIssue({
            email: emailRef.current?.value ?? '',
            title: titleRef.current?.value ?? '',
            description: descriptionRef.current?.value ?? '',
            type: props.type
        });
        props.setSnackbarSuccess(success);
        props.setSnackbarShown(true);
    };

    return (
        <div>
            <DialogTitle>{props.type.getTitle()}</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                    inputRef={emailRef}
                />
                <TextField
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                    inputRef={titleRef}
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    multiline
                    rows={8}
                    fullWidth
                    variant="standard"
                    inputRef={descriptionRef}
                />
            </DialogContent>
            <DialogActions>
                <Button>Annotate</Button>
                <Button onClick={sendHandler}>Send</Button>
            </DialogActions>
        </div>
    );
};

export default FormModalContent;
