import React, { ReactNode, useState } from "react";
import IssueControllerFactory from "../../integration/IssueControllerFactory";
import { IssueInfo } from "../../integration/IssueInfo";
import Platform from "../../integration/Platform";
import { PlatformProps } from "../../integration/PlatformProps";
import ModalController from "../ModalController";
import ReportBugButton from "../ReportBugButton";

export type BoolUseStateSetter = React.Dispatch<React.SetStateAction<boolean>>

export interface BugReportingToolProps {
    platform: Platform,
    props: PlatformProps,
    children?: ReactNode
}

const BugReportingTool = (props: BugReportingToolProps) => {
    const [isToolOpen, setIsToolOpen] = useState(false);
    const [isBugAnnotationOpen, setIsBugAnnotationOpen] = useState(false);
    const [isIdeaAnnotationOpen, setIsIdeaAnnotationOpen] = useState(false);
    const issueController = IssueControllerFactory.get(props.platform, props.props);

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
                newIssue={(issueInfo: IssueInfo) => issueController.newIssue(issueInfo)}
            />
            {props.children}
        </>
    );
};

export default BugReportingTool;
