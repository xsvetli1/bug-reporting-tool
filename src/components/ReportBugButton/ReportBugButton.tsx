import React from "react";
import "./ReportBugButton.css";

export interface ReportBugButtonProps {
    isToolOpen: boolean,
    setIsToolOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ReportBugButton = (props: ReportBugButtonProps) => {
    const computeDisplayProperty = () => {
        // TODO: "block" value in display should be injected, not hardcoded
        return props.isToolOpen ? "none" : "block";
    }

    const handleClick = () => {
        props.setIsToolOpen(true);
    }

    return (
        <button id="report-bug-button" onClick={handleClick} style={{display: computeDisplayProperty()}}>
            Report a bug!
        </button>
    );
};

export default ReportBugButton;
