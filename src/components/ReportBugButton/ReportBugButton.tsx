import React from "react";

export interface ReportBugButtonProps {
}

const ReportBugButton = (props: ReportBugButtonProps) => {
    return (
        <button onClick={handleClick}>
            Report a bug!
        </button>
    );
};

function handleClick() {
    confirm("You have clicked the button!");
}

export default ReportBugButton;
