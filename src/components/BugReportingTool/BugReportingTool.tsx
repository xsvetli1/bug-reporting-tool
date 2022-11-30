import React from "react";
import ReportBugButton from "../ReportBugButton";

export interface BugReportingToolProps {
    label: string;
}

const BugReportingTool = (props: BugReportingToolProps) => {
    return <ReportBugButton></ReportBugButton>;
};

export default BugReportingTool;
