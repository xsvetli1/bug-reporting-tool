import React from 'react';
import { Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import '../../styles/annotations.css';

export interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton = ({ onClick }: CloseButtonProps) => {
    return (
        <Fab size="small" aria-label="close" onClick={onClick} className="annotation-close-button">
            <CloseIcon />
        </Fab>
    );
};

export default CloseButton;
