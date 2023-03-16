import React, { useContext, useState } from 'react';
import AnnotationArea from '../AnnotationArea';
import '../styles/annotations.css';
import { useAnnotationRelocation } from './handlers/useAnnotationRelocation';
import AnnotationAreaContent from '../content/AnnotationAreaContent';
import { useAnnotationCreateHandlers } from './handlers/useAnnotationCreateHandlers';
import { AllAnnotationTypes } from '../types';
import Annotations from '../Annotations';
import { takeScreenshot } from '../helpers/ScreenshotHelper';
import { ToolContext } from '../../BugReportingTool/ToolContext';

export interface AnnotationToolProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = ({ handleClose }: AnnotationToolProps) => {
    const { setScreenshots, isOngoingAnnotation, setIsOngoingAnnotation } = useContext(ToolContext);

    const allAnnotationCreateHandlers = useAnnotationCreateHandlers();
    const [annotationInHandId, obtainAnnotationGrabHandlers, annotationMoveHandlers] =
        useAnnotationRelocation();

    const [currentAnnotationType, setCurrentAnnotationType] =
        useState<AllAnnotationTypes>('SELECT_AREA');

    const mouseEventHandlers = annotationInHandId
        ? annotationMoveHandlers
        : allAnnotationCreateHandlers[currentAnnotationType];

    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea mouseEventHandlers={mouseEventHandlers}>
                        <Annotations obtainAnnotationGrabHandlers={obtainAnnotationGrabHandlers} />
                    </AnnotationArea>
                    <AnnotationAreaContent
                        currentAnnotationType={currentAnnotationType}
                        setCurrentAnnotationType={setCurrentAnnotationType}
                        annotationInHandId={annotationInHandId}
                        submit={async () =>
                            takeScreenshot().then((screenshot) => {
                                setScreenshots((allScreenshots) => {
                                    allScreenshots.push(screenshot);
                                    return allScreenshots;
                                });
                                setIsOngoingAnnotation(false);
                            })
                        }
                        handleClose={handleClose}
                    />
                </>
            )}
        </>
    );
};

export default AnnotationTool;
