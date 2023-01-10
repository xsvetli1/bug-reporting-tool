import React, { RefObject, useRef } from "react";
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import IssueType from "../../../models/IssueType";
import { IssueInfo } from "../../../integration/IssueInfo";
import { FormFields, FormProps } from "../../../models/FormProps";
import { UseStateSetter } from "../../../models/UseStateSetter";

export interface FormModalContentProps {
    formState: FormProps,
    setFormState: React.Dispatch<React.SetStateAction<FormProps>>,
    type: IssueType,
    newIssue: (issueInfo: IssueInfo) => Promise<boolean>,
    setSnackbarShown: UseStateSetter<boolean>,
    setSnackbarSuccess: UseStateSetter<boolean>,
    handleAnnotate: () => void,
    handleClose: () => void
}

const FormModalContent = (props: FormModalContentProps) => {
    const emailRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const handleSend = async () => {
        props.handleClose();
        props.setFormState({});
        let success = await props.newIssue({
            email: emailRef.current?.value ?? '',
            title: titleRef.current?.value ?? '',
            description: descriptionRef.current?.value ?? '',
            type: props.type
        });
        props.setSnackbarSuccess(success);
        props.setSnackbarShown(true);
    };

    const textField = (
        id: FormFields,
        label: string,
        type: string,
        ref: RefObject<HTMLInputElement>,
        multiline=false
    ) => {
        return <TextField
            margin="dense"
            id={id}
            label={label}
            type={type}
            fullWidth
            multiline={multiline}
            rows={8}
            variant="standard"
            inputRef={ref}
            defaultValue={props.formState[id]}
            onChange={event => props.setFormState(
                state => ({
                    ...state,
                    ...{[id]: event.target.value}
                }))
            }
        />
    };

    return (
        <div>
            <DialogTitle>{props.type.getTitle()}</DialogTitle>
            <DialogContent>
                {textField('email', 'Email Address', 'email', emailRef)}
                {textField('title', 'Title', 'text', titleRef)}
                {textField('description', 'Description', 'text', descriptionRef, true)}
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleAnnotate}>Annotate</Button>
                <Button onClick={handleSend}>Send</Button>
            </DialogActions>
        </div>
    );
};

export default FormModalContent;
