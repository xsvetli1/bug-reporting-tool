import React from "react";
import { DialogContent, DialogTitle, TextField } from "@mui/material";

export interface FormModalContentProps {
    type: IssueType
}

const FormModalContent = (props: FormModalContentProps) => {
    return (
        <div>
            <DialogTitle>{props.type.toString()}</DialogTitle>
            <DialogContent>
                What is your issue about?
                <TextField
                    margin="dense"
                    id="email"
                    label="Email Address"
                    type="email"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="title"
                    label="Title"
                    type="text"
                    fullWidth
                    variant="standard"
                />
                <TextField
                    margin="dense"
                    id="description"
                    label="Description"
                    type="text"
                    multiline
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
        </div>
    );
};

export enum IssueType {
    Bug,
    Idea
}

export default FormModalContent;
