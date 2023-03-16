import React, { useContext, useState } from 'react';
import { ToolContext } from '../../../contexts/ToolContext';
import { AllAnnotationProps } from '../tools/AllAnnotationProps';
import { SelectedAreas } from '../types';
import { AnnotationContext } from '../../../contexts/AnnotationContext';
import AnnotationTool from './AnnotationTool';

export interface AnnotationToolWrapperProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationToolWrapper = (props: AnnotationToolWrapperProps) => {
    const { annotations, setAnnotations } = useContext(ToolContext);
    const [annotationNextId, setAnnotationNextId] = useState(0);
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
