import { Fab } from '@mui/material';
import React from 'react';
import { UseStateSetter } from '../../models/UseStateSetter';

export interface ReportBugButtonProps {
    setIsToolOpen: UseStateSetter<boolean>;
}

const ReportBugButton = ({ setIsToolOpen }: ReportBugButtonProps) => {
    const handleClick = () => {
        setIsToolOpen(true);
    };

    return (
        <Fab
            variant="extended"
            onClick={handleClick}
            size="small"
            sx={{
                position: 'fixed',
                width: '100px',
                top: 'calc(50% - 33px)', // TODO: deal with magic constants + check alignment
                right: '-33px',
                transform: 'rotate(-0.25turn)',
                borderBottomLeftRadius: 0,
                borderBottomRightRadius: 0
            }}
        >
            Feedback
        </Fab>
    );
};

export default ReportBugButton;
