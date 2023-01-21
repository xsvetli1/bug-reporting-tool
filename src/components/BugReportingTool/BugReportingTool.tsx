import React, { ReactNode, useState } from 'react';
import IssueControllerFactory from '../../integration/IssueControllerFactory';
import { IssueInfo } from '../../integration/IssueInfo';
import Platform from '../../integration/Platform';
import { PlatformProps } from '../../integration/PlatformProps';
import AnnotationTool from '../annotations/AnnotationTool';
import ModalController from '../modals/ModalController';
import ReportBugButton from '../ReportBugButton';
import '../../styles/colors.css';

export interface BugReportingToolProps {
    platform: Platform;
    platformProps: PlatformProps;
    children?: ReactNode;
}

const BugReportingTool = ({ platform, platformProps, children }: BugReportingToolProps) => {
    const [isToolOpen, setIsToolOpen] = useState(false);
    const [isBugAnnotationOpen, setIsBugAnnotationOpen] = useState(false);
    const [isIdeaAnnotationOpen, setIsIdeaAnnotationOpen] = useState(false);
    const [isOngoingAnnotation, setIsOngoingAnnotation] = useState(false);
    const [theme, setTheme] = useState('');
    const issueController = IssueControllerFactory.get(platform, platformProps);

    const mainButton = () => {
        if (!isToolOpen) {
            return <ReportBugButton setIsToolOpen={setIsToolOpen}></ReportBugButton>;
        }
    };

    const annotationTool = () => {
        return (
            <AnnotationTool
                isOngoingAnnotation={isOngoingAnnotation}
                handleClose={() => setIsOngoingAnnotation(false)}
            ></AnnotationTool>
        );
    };

    return (
        <div data-theme={theme}>
            {mainButton()}
            <ModalController
                isToolOpen={isToolOpen}
                setIsToolOpen={setIsToolOpen}
                isBugAnnotationOpen={isBugAnnotationOpen}
                setIsBugAnnotationOpen={setIsBugAnnotationOpen}
                isIdeaAnnotationOpen={isIdeaAnnotationOpen}
                setIsIdeaAnnotationOpen={setIsIdeaAnnotationOpen}
                isOngoingAnnotation={isOngoingAnnotation}
                setIsOngoingAnnotation={setIsOngoingAnnotation}
                setTheme={setTheme}
                newIssue={(issueInfo: IssueInfo) => issueController.newIssue(issueInfo)}
            />
            {annotationTool()}
            {children}
        </div>
    );
};

export default BugReportingTool;
