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
    const [annotations, setAnnotations] = useState<AnnotationPropsObject>({});
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});
    const [selectedCommentIds, setSelectedCommentIds] = useState<string[]>([]);

    const annotate = (annotation: AllAnnotationProps, id: number) => {
        annotations[id] = annotation;
        setAnnotations({ ...annotations });
    };

    return (
        <AnnotationContext.Provider
            value={{
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
