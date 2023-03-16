import React, { RefObject, useContext, useEffect, useRef } from 'react';
import {
    Button,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    TextFieldProps
} from '@mui/material';
import IssueType from '../../../models/IssueType';
import { IssueInfo } from '../../../integration/models/IssueInfo';
import { FormFields, FormProps } from '../../../models/FormProps';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { ToolContext } from '../../BugReportingTool/ToolContext';

export interface FormModalContentProps {
    formState: FormProps;
    setFormState: React.Dispatch<React.SetStateAction<FormProps>>;
    type: IssueType;
    newIssue: (issueInfo: IssueInfo) => Promise<boolean>;
    setSnackbarShown: UseStateSetter<boolean>;
    setSnackbarSuccess: UseStateSetter<boolean>;
    setTheme: UseStateSetter<string>;
    handleAnnotate: () => void;
    handleClose: () => void;
}

const FormModalContent = (props: FormModalContentProps) => {
    const { annotations, screenshots } = useContext(ToolContext);

    const emailRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const extractComments = () => {
        const comments: string[] = [];
        Object.values(annotations).forEach((annotation) => {
            if (annotation.type === 'TEXT') {
                comments.push(annotation.comment ?? '');
            }
        });
        return comments;
    };

    const handleSend = async () => {
        props.handleClose();
        props.setFormState({});
        const success = await props.newIssue({
            type: props.type,
            email: emailRef.current?.value ?? '',
            title: titleRef.current?.value ?? '',
            description: descriptionRef.current?.value ?? '',
            screenshots,
            comments: extractComments()
        });
        props.setSnackbarSuccess(success);
        props.setSnackbarShown(true);
    };

    const textFieldProps = (
        id: FormFields,
        label: string,
        type: string,
        ref: RefObject<HTMLInputElement>,
        multiline = false
    ): TextFieldProps => {
        return {
            margin: 'dense',
            id: id,
            label: label,
            type: type,
            fullWidth: true,
            multiline: multiline,
            rows: 8,
            variant: 'standard',
            inputRef: ref,
            defaultValue: props.formState[id],
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                props.setFormState((state) => ({
                    ...state,
                    ...{ [id]: event.target.value }
                }))
        };
    };

    useEffect(() => props.setTheme(props.type.getLabel()), []);

    return (
        <div>
            <DialogTitle>{props.type.getTitle()}</DialogTitle>
            <DialogContent>
                <TextField {...textFieldProps('email', 'Email Address', 'email', emailRef)} />
                <TextField {...textFieldProps('title', 'Title', 'text', titleRef)} />
                <TextField
                    {...textFieldProps('description', 'Description', 'text', descriptionRef, true)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleAnnotate}>Annotate</Button>
                <Button onClick={handleSend}>Send</Button>
            </DialogActions>
        </div>
    );
};

export default FormModalContent;
