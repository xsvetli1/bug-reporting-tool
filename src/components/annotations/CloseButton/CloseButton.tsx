import React from "react";
import { Fab } from "@mui/material";
import { blue, red } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import IssueType from "../../../models/IssueType";
import '../Annotations.css';

export interface CloseButtonProps {
    onClick: () => void;
}

const CloseButton = (props: CloseButtonProps) => {
    return (
        <Fab size="small"
            aria-label="close"
            onClick={props.onClick}
            className="annotation-close-button"
        >
            <CloseIcon sx={{color: "rgb(255, 255, 255)"}}/>
        </Fab>
    );
}

export default CloseButton;
