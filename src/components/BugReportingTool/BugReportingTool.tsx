import React, { useState } from "react";
import ModalController from "../ModalController";
import ReportBugButton from "../ReportBugButton";

export type BoolUseStateSetter = React.Dispatch<React.SetStateAction<boolean>>

export interface BugReportingToolProps {
}

const BugReportingTool = (props: BugReportingToolProps) => {
    const [isToolOpen, setIsToolOpen] = useState(false);
    const [isBugAnnotationOpen, setIsBugAnnotationOpen] = useState(false);
    const [isIdeaAnnotationOpen, setIsIdeaAnnotationOpen] = useState(false);

    const mainButton = () => {
        if (!isToolOpen) {
            return <ReportBugButton setIsToolOpen={setIsToolOpen}></ReportBugButton>
        }
    }

    return (
        <>
            {mainButton()}
            <ModalController
                isToolOpen={isToolOpen}
                setIsToolOpen={setIsToolOpen}
                isBugAnnotationOpen={isBugAnnotationOpen}
                setIsBugAnnotationOpen={setIsBugAnnotationOpen}
                isIdeaAnnotationOpen={isIdeaAnnotationOpen}
                setIsIdeaAnnotationOpen={setIsIdeaAnnotationOpen}
            />
        </>
    );
};

export default BugReportingTool;
