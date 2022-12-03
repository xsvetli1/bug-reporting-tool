import React from "react";
import { BoolUseStateSetter } from "../BugReportingTool";
import "./ReportBugButton.css";

export interface ReportBugButtonProps {
    setIsToolOpen: BoolUseStateSetter
}

const ReportBugButton = (props: ReportBugButtonProps) => {
    const handleClick = () => {
        props.setIsToolOpen(true);
    }

    return (
        <button id="report-bug-button" onClick={handleClick}>
            Report a bug!
        </button>
    );
};

export default ReportBugButton;
