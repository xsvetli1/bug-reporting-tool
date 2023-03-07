import React, { useState } from 'react';
import { AllAnnotationProps, AnnotationPropsObject } from '../tools/AllAnnotationProps';
import { SelectedAreas } from '../types';
import { AnnotationContext } from './AnnotationContext';
import AnnotationTool from './AnnotationTool';

export interface AnnotationToolWrapperProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationToolWrapper = (props: AnnotationToolWrapperProps) => {
    const [annotationNextId, setAnnotationNextId] = useState(0);
    const [annotations, setAnnotations] = useState<AnnotationPropsObject>({});
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});
    const [selectedCommentIds, setSelectedCommentIds] = useState<string[]>([]);

    const annotate = (annotation: AllAnnotationProps, id: number) => {
        annotations[id] = annotation;
        setAnnotations({ ...annotations });
        if (id == annotationNextId) {
            setAnnotationNextId(annotationNextId + 1);
        }
    };

    return (
        <AnnotationContext.Provider
            value={{
                annotationNextId,
                setAnnotationNextId,
                annotations,
                setAnnotations,
                annotate,
                selectedAreas,
                setSelectedAreas,
                selectedCommentIds,
                setSelectedCommentIds
            }}
        >
            <AnnotationTool {...props} />
        </AnnotationContext.Provider>
    );
};

export default AnnotationToolWrapper;
