import React, { useContext, useState } from 'react';
import AnnotationArea from '../AnnotationArea';
import '../styles/annotations.css';
import { useAnnotationRelocation } from './handlers/useAnnotationRelocation';
import AnnotationAreaContent from '../content/AnnotationAreaContent';
import { useAnnotationCreateHandlers } from './handlers/useAnnotationCreateHandlers';
import { AllAnnotationTypes } from '../types';
import Annotations from '../Annotations';
import { ToolContext } from '../../../contexts/ToolContext';

export interface AnnotationToolProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

/**
 * The main component for Annotation Tool of Bug Reporting Tool.
 */
const AnnotationTool = ({ handleClose }: AnnotationToolProps) => {
    const { isOngoingAnnotation } = useContext(ToolContext);

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
                <div className="annotation-tool">
                    <AnnotationArea mouseEventHandlers={mouseEventHandlers}>
                        <Annotations obtainAnnotationGrabHandlers={obtainAnnotationGrabHandlers} />
                    </AnnotationArea>
                    <AnnotationAreaContent
                        currentAnnotationType={currentAnnotationType}
                        setCurrentAnnotationType={setCurrentAnnotationType}
                        annotationInHandId={annotationInHandId}
                        handleClose={handleClose}
                    />
                </div>
            )}
        </>
    );
};

export default AnnotationTool;
