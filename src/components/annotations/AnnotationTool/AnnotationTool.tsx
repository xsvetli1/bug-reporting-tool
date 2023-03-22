import React, { useContext, useState } from 'react';
import AnnotationArea from '../AnnotationArea';
import '../styles/annotations.css';
import { useAnnotationRelocation } from './handlers/useAnnotationRelocation';
import AnnotationAreaContent from '../content/AnnotationAreaContent';
import { useAnnotationCreateHandlers } from './handlers/useAnnotationCreateHandlers';
import { AllAnnotationTypes } from '../types';
import Annotations from '../Annotations';
import { takeScreenshot } from '../helpers/ScreenshotHelper';
import { ToolContext } from '../../../contexts/ToolContext';

export interface AnnotationToolProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = ({ handleClose }: AnnotationToolProps) => {
    const {
        annotations,
        setAnnotations,
        setScreenshots,
        isOngoingAnnotation,
        setIsOngoingAnnotation
    } = useContext(ToolContext);

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
                        submit={async () => {
                            // TODO: pass deeper
                            const comments: string[] = [];
                            Object.values(annotations).forEach((annotation) => {
                                if (annotation.type === 'TEXT') {
                                    comments.push(annotation.comment ?? '');
                                }
                            });

                            takeScreenshot().then((screenshot) => {
                                setScreenshots((allScreenshots) => {
                                    allScreenshots.push({ dataUrl: screenshot, comments });
                                    return [...allScreenshots];
                                });
                            });
                            setIsOngoingAnnotation(false);
                            setAnnotations({});
                        }}
                        handleClose={handleClose}
                    />
                </>
            )}
        </>
    );
};

export default AnnotationTool;
