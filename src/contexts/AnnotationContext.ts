import { createContext } from 'react';
import { UseStateSetter } from '../models/UseStateSetter';
import { AllAnnotationProps } from '../components/annotations/tools/AllAnnotationProps';
import { SelectedAreas } from '../components/annotations/types';

/**
 * React Context with annotations-related states and their setters.
 */
export const AnnotationContext = createContext<{
    currentAnnotationId: number;
    annotate: (annotation: AllAnnotationProps, id: number) => void;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
    selectedCommentIds: string[];
    setSelectedCommentIds: UseStateSetter<string[]>;
    creating: boolean;
    setCreating: UseStateSetter<boolean>;
}>({
    currentAnnotationId: -1,
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
