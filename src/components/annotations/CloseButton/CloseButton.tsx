import React from "react";
import { Fab } from "@mui/material";
import { blue, red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import IssueType from "../../../models/IssueType";
import '../Annotations.css';

export interface CloseButtonProps {
    issueType: IssueType;
    onClick: () => void;
}

const CloseButton = (props: CloseButtonProps) => {
    const isBug = props.issueType == IssueType.Bug;

    return (
        <Fab size="small"
            aria-label="close"
            onClick={props.onClick}
            className="annotation-close-button"
            sx={[
                {
                    background: isBug ? red.A200 :blue.A200,
                    width: '25px',
                    height: '25px',
                    minHeight: '25px'
                },
                {'&:hover': {
                    background: isBug ? red.A400 :blue.A400
                }}
            ]}
        >
            <CloseIcon sx={{color: "rgb(255, 255, 255)"}}/>
        </Fab>
    );
}

export default CloseButton;
