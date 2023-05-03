import React, { ReactNode, useEffect, useState } from 'react';
import IssueControllerFactory from '../../integration/IssueControllerFactory';
import { IssueInfo } from '../../integration/models/IssueInfo';
import Platform from '../../integration/models/Platform';
import { PlatformProps } from '../../integration/models/PlatformProps';
import ModalController from '../modals/ModalController';
import ReportBugButton from '../ReportBugButton';
import '../../styles/colors.css';
import AnnotationToolWrapper from '../annotations/AnnotationTool';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { ToolContext } from '../../contexts/ToolContext';
import { AnnotationPropsObject } from '../annotations/tools/AllAnnotationProps';
import { ScreenshotInfo } from '../../models/ScreenshotInfo';
import { ConsoleOutput } from '../../models/ConsoleOutput';

export interface BugReportingToolProps {
    platform: Platform;
    platformProps: PlatformProps;
    isEmailRequired?: boolean;
    children?: ReactNode;
}

const BugReportingTool = ({
    platform,
    platformProps,
    children,
    isEmailRequired
}: BugReportingToolProps) => {
    const [isToolOpen, setIsToolOpen] = useState(false);
    const [isBugAnnotationOpen, setIsBugAnnotationOpen] = useState(false);
    const [isIdeaAnnotationOpen, setIsIdeaAnnotationOpen] = useState(false);
    const [isOngoingAnnotation, setIsOngoingAnnotation] = useState(false);
    const [isCloseAnnotationToolDialogOpen, setIsCloseAnnotationDialogOpen] = useState(false);
    const [annotations, setAnnotations] = useState<AnnotationPropsObject>({});
    const [screenshots, setScreenshots] = useState<ScreenshotInfo[]>([]);
    const [theme, setTheme] = useState('');
    const [consoleOutput, setConsoleOutput] = useState<ConsoleOutput>({
        log: [],
        debug: [],
        info: [],
        warn: [],
        error: []
    });

    const issueController = IssueControllerFactory.get(platform, platformProps);

    useEffect(() => {
        const consoleOutputRedefine = (
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            originalOutput: (...data: any[]) => void,
            outputChannel: 'log' | 'debug' | 'info' | 'warn' | 'error'
        ) => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            return (...args: any[]) => {
                originalOutput(...args);
                consoleOutput[outputChannel].push(...args.map((arg) => `${arg}`));
                setConsoleOutput(consoleOutput);
            };
        };

        console.log = consoleOutputRedefine(console.log, 'log');
        console.debug = consoleOutputRedefine(console.debug, 'debug');
        console.info = consoleOutputRedefine(console.info, 'info');
        console.warn = consoleOutputRedefine(console.warn, 'warn');
        console.error = consoleOutputRedefine(console.error, 'error');
    }, []);

    return (
        <ToolContext.Provider
            value={{
                platform,
                annotations,
                setAnnotations,
                screenshots,
                setScreenshots,
                isOngoingAnnotation,
                setIsOngoingAnnotation,
                consoleOutput
            }}
        >
            <div data-theme={theme}>
                {!isToolOpen && <ReportBugButton setIsToolOpen={setIsToolOpen} />}
                <ModalController
                    isEmailRequired={isEmailRequired ?? false}
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
                <Dialog open={isCloseAnnotationToolDialogOpen} sx={{ zIndex: 2147483647 }}>
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
                                setAnnotations({});
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
