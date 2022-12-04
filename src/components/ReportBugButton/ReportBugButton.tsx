import { Fab } from "@mui/material";
import React from "react";
import { BoolUseStateSetter } from "../BugReportingTool";

export interface ReportBugButtonProps {
    setIsToolOpen: BoolUseStateSetter
}

const ReportBugButton = (props: ReportBugButtonProps) => {
    const handleClick = () => {
        props.setIsToolOpen(true);
    }

    return (
        <Fab
            variant="extended"
            onClick={handleClick}
            sx={{
                position: "fixed",
                top: "50%",
                right: 0,
                transform: "rotate(-0.25turn)"
            }}
        >
            Feedback
        </Fab>
    );
};

export default ReportBugButton;
