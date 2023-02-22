import React, { useState } from 'react';

import AnnotationArea from '../AnnotationArea';
import '../styles/annotations.css';
import { useAnnotationRelocation } from './useAnnotationRelocation';
import AnnotationAreaContent from '../AnnotationAreaContent';
import { useAnnotationCreateHandlers } from './useAnnotationCreateHandlers';
import { AllAnnotationTypes } from '../types';
import Annotations from '../Annotations';

export interface AnnotationToolProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = ({ isOngoingAnnotation, handleClose }: AnnotationToolProps) => {
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
                        handleClose={handleClose}
                        annotationInHandId={annotationInHandId}
                    />
                </>
            )}
        </>
    );
};

export default AnnotationTool;
