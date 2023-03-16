import { createContext } from 'react';
import { UseStateSetter } from '../../models/UseStateSetter';
import { AnnotationPropsObject } from '../annotations/tools/AllAnnotationProps';

export const ToolContext = createContext<{
    annotations: AnnotationPropsObject;
    setAnnotations: UseStateSetter<AnnotationPropsObject>;
    screenshots: string[];
    setScreenshots: UseStateSetter<string[]>;
    isOngoingAnnotation: boolean;
    setIsOngoingAnnotation: UseStateSetter<boolean>;
}>({
    annotations: {},
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setAnnotations: () => {},
    screenshots: [],
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setScreenshots: () => {},
    isOngoingAnnotation: false,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    setIsOngoingAnnotation: () => {}
});
