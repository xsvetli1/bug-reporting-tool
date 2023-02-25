import { createContext } from 'react';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { AnnotationPropsObject } from '../tools/AllAnnotationProps';
import { SelectedAreas } from '../types';

export const AnnotationContext = createContext<{
    annotations: AnnotationPropsObject;
    setAnnotations: UseStateSetter<AnnotationPropsObject>;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
    selectedCommentIds: string[];
    setSelectedCommentIds: UseStateSetter<string[]>;
}>({
    annotations: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setAnnotations: () => {},
    selectedAreas: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedAreas: () => {},
    selectedCommentIds: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setSelectedCommentIds: () => {}
});
