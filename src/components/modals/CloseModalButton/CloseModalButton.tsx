import React from 'react';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CloseModalButtonProps {
    handleSafeClose: () => void;
}

/**
 * Close button for modal windows
 */
const CloseModalButton = ({ handleSafeClose }: CloseModalButtonProps) => (
    <IconButton
        aria-label="close"
        onClick={handleSafeClose}
        sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500]
        }}
    >
        <CloseIcon />
    </IconButton>
);

export default CloseModalButton;
