import React from 'react';
import { Button } from '@mui/material';
import DeleteForeverSharpIcon from '@mui/icons-material/DeleteForeverSharp';

export interface DeleteButtonProps {
    deleteCallback?: () => void;
}

export const DeleteButton = ({ deleteCallback }: DeleteButtonProps) => {
    return (
        <Button
            className="delete-button"
            variant="contained"
            color="error"
            aria-label="delete"
            onClick={deleteCallback}
            data-html2canvas-ignore
        >
            <DeleteForeverSharpIcon />
        </Button>
    );
};
