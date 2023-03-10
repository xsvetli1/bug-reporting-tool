import { createContext } from 'react';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { AllAnnotationProps, AnnotationPropsObject } from '../tools/AllAnnotationProps';
import { SelectedAreas } from '../types';

export const AnnotationContext = createContext<{
    currentAnnotationId: number;
    annotations: AnnotationPropsObject;
    setAnnotations: UseStateSetter<AnnotationPropsObject>;
    annotate: (annotation: AllAnnotationProps, id: number) => void;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
    selectedCommentIds: string[];
    setSelectedCommentIds: UseStateSetter<string[]>;
    creating: boolean;
    setCreating: UseStateSetter<boolean>;
}>({
    currentAnnotationId: -1,
    annotations: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setAnnotations: () => {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    annotate: () => {},
    selectedAreas: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedAreas: () => {},
    selectedCommentIds: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedCommentIds: () => {},
    creating: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setCreating: () => {}
});
