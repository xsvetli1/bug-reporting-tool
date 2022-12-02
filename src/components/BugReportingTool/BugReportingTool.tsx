import React, { useState } from "react";
import OptionsModal from "../OptionsModal";
import ReportBugButton from "../ReportBugButton";

export interface BugReportingToolProps {
    label: string;
}

const BugReportingTool = (props: BugReportingToolProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <ReportBugButton isToolOpen={isOpen} setIsToolOpen={setIsOpen}></ReportBugButton>
            <OptionsModal isToolOpen={isOpen} setIsToolOpen={setIsOpen}></OptionsModal>
        </>
    );

};

export default BugReportingTool;
