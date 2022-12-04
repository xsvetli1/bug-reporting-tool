import React from "react";
import { Button, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import IssueType from "../../common/IssueType";

export interface FormModalContentProps {
    type: IssueType
}

const FormModalContent = (props: FormModalContentProps) => {
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
                    rows={8}
                    fullWidth
                    variant="standard"
                />
            </DialogContent>
            <DialogActions>
                <Button>Annotate</Button>
                <Button>Send</Button>
            </DialogActions>
        </div>
    );
};

export default FormModalContent;
