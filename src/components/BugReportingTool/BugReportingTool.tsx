import React, { useState } from "react";
import FormModal from "../FormModal";
import { IssueType } from "../FormModal";
import OptionsModal from "../OptionsModal";
import ReportBugButton from "../ReportBugButton";

export type BoolUseStateSetter = React.Dispatch<React.SetStateAction<boolean>>

export interface BugReportingToolProps {
}

const BugReportingTool = (props: BugReportingToolProps) => {
    const [isToolOpen, setToolIsOpen] = useState(false);
    const [isBugAnnotationOpen, setIsBugAnnotationOpen] = useState(false);
    const [isIdeaAnnotationOpen, setIsIdeaAnnotationOpen] = useState(false);

    const mainButton = () => {
        if (!isToolOpen) {
            return <ReportBugButton setIsToolOpen={setToolIsOpen}></ReportBugButton>
        }
    }

    const optionsModal = () => {
        if (isToolOpen && !isBugAnnotationOpen && !isIdeaAnnotationOpen) {
            return (
                <OptionsModal setIsToolOpen={setToolIsOpen}
                    setIsBugAnnotationOpen={setIsBugAnnotationOpen}
                    setIsIdeaAnnotationOpen={setIsIdeaAnnotationOpen}></OptionsModal>
            );
        }
    }

    const formModal = (isFormOpen: boolean, setIsFormOpen: BoolUseStateSetter, type: IssueType) => {
        if (isToolOpen && isFormOpen) {
            return <FormModal setIsFormOpen={setIsFormOpen} type={type}></FormModal>;
        }
    }

    return (
        <>
            {mainButton()}
            {optionsModal()}
            {formModal(isBugAnnotationOpen, setIsBugAnnotationOpen, IssueType.Bug)}
            {formModal(isIdeaAnnotationOpen, setIsIdeaAnnotationOpen, IssueType.Idea)}
        </>
    );
};

export default BugReportingTool;
