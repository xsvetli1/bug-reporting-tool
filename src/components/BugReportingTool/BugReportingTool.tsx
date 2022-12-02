import React, { useState } from "react";
import FormModal from "../FormModal";
import { IssueType } from "../FormModal/FormModal";
import OptionsModal from "../OptionsModal";
import ReportBugButton from "../ReportBugButton";

export interface BugReportingToolProps {
}

const BugReportingTool = (props: BugReportingToolProps) => {
    const [isToolOpen, setToolIsOpen] = useState(false);
    const [isBugAnnotationOpen, setIsBugAnnotationOpen] = useState(false);
    const [isIdeaAnnotationOpen, setIsIdeaAnnotationOpen] = useState(false);

    return (
        <>
            <ReportBugButton isToolOpen={isToolOpen} setIsToolOpen={setToolIsOpen}></ReportBugButton>
            <OptionsModal isToolOpen={isToolOpen}
                    setIsToolOpen={setToolIsOpen}
                    isBugAnnotationOpen={isBugAnnotationOpen}
                    setIsBugAnnotationOpen={setIsBugAnnotationOpen}
                    isIdeaAmmptatopmOpen={isIdeaAnnotationOpen}
                    setIsIdeaAnnotationOpen={setIsIdeaAnnotationOpen}></OptionsModal>
            <FormModal isToolOpen={isToolOpen}
                    isFormOpen={isBugAnnotationOpen}
                    setIsFormOpen={setIsBugAnnotationOpen}
                    type={IssueType.Bug}></FormModal>
            <FormModal isToolOpen={isToolOpen}
                    isFormOpen={isIdeaAnnotationOpen}
                    setIsFormOpen={setIsIdeaAnnotationOpen}
                    type={IssueType.Idea}></FormModal>
        </>
    );

};

export default BugReportingTool;
