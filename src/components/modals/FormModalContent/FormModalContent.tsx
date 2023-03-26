import React, { RefObject, useContext, useEffect, useRef } from 'react';
import {
    Button,
    Chip,
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
import { ToolContext } from '../../../contexts/ToolContext';
import '../../../styles/modals.css';

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
    const { setAnnotations, screenshots, setScreenshots, consoleOutput } = useContext(ToolContext);

    const emailRef = useRef<HTMLInputElement>(null);
    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    const validateFields = () => {
        let areValid = true;

        Object.entries(props.formState).forEach(([key, fieldProps]) => {
            if (!fieldProps.required) return;
            if (fieldProps.value.length === 0) {
                areValid = false;
                if (!fieldProps.error) {
                    fieldProps.error = true;
                    props.setFormState((state) => ({
                        ...state,
                        ...{ [key]: fieldProps }
                    }));
                }
            }
        });

        return areValid;
    };

    const handleSend = async () => {
        if (!validateFields()) return;
        props.handleClose();
        props.setFormState({});
        const success = await props.newIssue({
            type: props.type,
            email: emailRef.current?.value ?? '',
            title: titleRef.current?.value ?? '',
            description: descriptionRef.current?.value ?? '',
            screenshots,
            consoleOutput
        });
        props.setSnackbarSuccess(success);
        props.setSnackbarShown(true);
        setAnnotations({});
        setScreenshots([]);
    };

    const textFieldProps = (
        id: FormFields,
        label: string,
        type: string,
        ref: RefObject<HTMLInputElement>,
        multiline = false
    ): TextFieldProps => {
        const required = props.formState[id]?.required;
        return {
            margin: 'dense',
            id: id,
            label: label,
            type: type,
            fullWidth: true,
            multiline: multiline,
            rows: 8,
            required: required,
            error: required && props.formState[id]?.error,
            helperText: required && props.formState[id]?.error ? 'This field is required' : '',
            variant: 'standard',
            inputRef: ref,
            defaultValue: props.formState[id]?.value,
            onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                props.setFormState((state) => ({
                    ...state,
                    ...{
                        [id]: {
                            value: event.target.value,
                            required: required,
                            error: event.target.value.length === 0
                        }
                    }
                }))
        };
    };

    useEffect(() => {
        props.setTheme(props.type.getLabel());
        props.setFormState({
            email: { value: '', required: false, error: false },
            title: { value: '', required: true, error: false },
            description: { value: '', required: true, error: false }
        });
    }, []);

    return (
        <div>
            <DialogTitle>{props.type.getTitle()}</DialogTitle>
            <DialogContent>
                <TextField {...textFieldProps('email', 'Email Address', 'email', emailRef)} />
                <TextField {...textFieldProps('title', 'Title', 'text', titleRef)} />
                <TextField
                    {...textFieldProps('description', 'Description', 'text', descriptionRef, true)}
                />
                <div className="screenshot-chips">
                    {screenshots.map((screenshot, i) => (
                        <Chip
                            key={i}
                            label={`Screenshot ${i + 1}`}
                            onClick={() => window.open(screenshot.dataUrl, '_blank', 'noreferrer')}
                            onDelete={() => {
                                setScreenshots([
                                    ...screenshots.filter((_, current_i) => current_i != i)
                                ]);
                            }}
                        />
                    ))}
                </div>
            </DialogContent>
            <DialogActions>
                <Button onClick={props.handleAnnotate}>Annotate</Button>
                <Button onClick={handleSend}>Send</Button>
            </DialogActions>
        </div>
    );
};

export default FormModalContent;
