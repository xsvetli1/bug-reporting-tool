import React from "react";
import "./ReportBugButton.css";

export interface ReportBugButtonProps {
    isToolOpen: boolean,
    setIsToolOpen: React.Dispatch<React.SetStateAction<boolean>>
}

const ReportBugButton = (props: ReportBugButtonProps) => {
    const handleClick = () => {
        props.setIsToolOpen(true);
    }

    return (
        <button id="report-bug-button"
                onClick={handleClick}
                style={{display: (props.isToolOpen ? "none" : "block")}}>
            Report a bug!
        </button>
    );
};

export default ReportBugButton;
