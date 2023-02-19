import React, { useState } from 'react';

import AnnotationArea from '../AnnotationArea';
import '../Annotations.css';
import { AnnotationPropsObject } from '../tools/AnnotationProps';
import { SelectedAreas } from '../types/SelectedAreas';
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
    const [annotations, setAnnotations] = useState<AnnotationPropsObject>({});
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});
    const [selectedCommentId, setSelectedCommentId] = useState('');

    const allAnnotationCreateHandlers = useAnnotationCreateHandlers({
        annotations,
        setAnnotations,
        selectedAreas,
        setSelectedAreas,
        selectedCommentId,
        setSelectedCommentId
    });
    const [annotationInHandId, obtainAnnotationGrabHandlers, annotationMoveHandlers] =
        useAnnotationRelocation({
            annotations,
            setAnnotations,
            selectedAreas,
            setSelectedAreas,
            setSelectedCommentId
        });

    const [currentAnnotationType, setCurrentAnnotationType] =
        useState<AllAnnotationTypes>('SELECT_AREA');

    const mouseEventHandlers = annotationInHandId
        ? annotationMoveHandlers
        : allAnnotationCreateHandlers[currentAnnotationType];

    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea
                        selectedAreas={selectedAreas}
                        mouseEventHandlers={mouseEventHandlers}
                    >
                        <Annotations
                            annotations={annotations}
                            obtainAnnotationGrabHandlers={obtainAnnotationGrabHandlers}
                            selectedCommentId={selectedCommentId}
                            setSelectedCommentId={setSelectedCommentId}
                        />
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
