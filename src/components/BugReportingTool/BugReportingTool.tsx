import React, { ReactNode, useState } from 'react';
import IssueControllerFactory from '../../integration/IssueControllerFactory';
import { IssueInfo } from '../../integration/models/IssueInfo';
import Platform from '../../integration/models/Platform';
import { PlatformProps } from '../../integration/models/PlatformProps';
import ModalController from '../modals/ModalController';
import ReportBugButton from '../ReportBugButton';
import '../../styles/colors.css';
import AnnotationToolWrapper from '../annotations/AnnotationTool';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ToolContext } from './ToolContext';

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
    const [isCloseAnnotationToolDialogOpen, setIsCloseAnnotationDialogOpen] = useState(false);
    const [screenshots, setScreenshots] = useState<string[]>([]);
    const [theme, setTheme] = useState('');

    const issueController = IssueControllerFactory.get(platform, platformProps);

    return (
        <ToolContext.Provider
            value={{ screenshots, setScreenshots, isOngoingAnnotation, setIsOngoingAnnotation }}
        >
            <div data-theme={theme}>
                {!isToolOpen && <ReportBugButton setIsToolOpen={setIsToolOpen} />}
                <ModalController
                    isToolOpen={isToolOpen}
                    setIsToolOpen={setIsToolOpen}
                    isBugAnnotationOpen={isBugAnnotationOpen}
                    setIsBugAnnotationOpen={setIsBugAnnotationOpen}
                    isIdeaAnnotationOpen={isIdeaAnnotationOpen}
                    setIsIdeaAnnotationOpen={setIsIdeaAnnotationOpen}
                    setTheme={setTheme}
                    newIssue={(issueInfo: IssueInfo) => issueController.newIssue(issueInfo)}
                />
                {isOngoingAnnotation && (
                    <AnnotationToolWrapper
                        isOngoingAnnotation={isOngoingAnnotation}
                        handleClose={() => setIsCloseAnnotationDialogOpen(true)}
                    />
                )}
                <Dialog open={isCloseAnnotationToolDialogOpen}>
                    <DialogTitle>Close Annotation Tool</DialogTitle>
                    <DialogContent>
                        Do you really want to close Annotation tool without saving?
                    </DialogContent>
                    <DialogActions>
                        <Button autoFocus onClick={() => setIsCloseAnnotationDialogOpen(false)}>
                            No
                        </Button>
                        <Button
                            onClick={() => {
                                setIsCloseAnnotationDialogOpen(false);
                                setIsOngoingAnnotation(false);
                            }}
                        >
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>

                {children}
            </div>
        </ToolContext.Provider>
    );
};

export default BugReportingTool;
