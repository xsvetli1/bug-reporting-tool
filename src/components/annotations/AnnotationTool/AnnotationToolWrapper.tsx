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
    const [creating, setCreating] = useState(false);

    const annotate = (annotation: AllAnnotationProps, id: number) => {
        annotations[id] = annotation;
        setAnnotations({ ...annotations });
        if (id == annotationNextId) {
            setAnnotationNextId(annotationNextId + 1);
        }
    };

    const currentAnnotationId = creating ? annotationNextId - 1 : annotationNextId;

    return (
        <AnnotationContext.Provider
            value={{
                currentAnnotationId,
                annotations,
                setAnnotations,
                annotate,
                selectedAreas,
                setSelectedAreas,
                selectedCommentIds,
                setSelectedCommentIds,
                creating,
                setCreating
            }}
        >
            <AnnotationTool {...props} />
        </AnnotationContext.Provider>
    );
};

export default AnnotationToolWrapper;
