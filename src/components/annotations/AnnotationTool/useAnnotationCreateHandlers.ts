import { useContext } from 'react';
import { AnnotationProps } from '../tools/AnnotationProps';
import { useArrow } from '../tools/Arrow';
import { useFreeHand } from '../tools/FreeHand';
import { useObfuscation } from '../tools/Obfuscation';
import { useSelectArea } from '../tools/SelectArea';
import { useText } from '../tools/Text';
import { AllAnnotationTypes } from '../types';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';
import { AnnotationContext } from './AnnotationContext';

export const useAnnotationCreateHandlers = (): {
    [key in AllAnnotationTypes]: AnnotationMouseEventHandlers;
} => {
    const {
        annotations,
        setAnnotations,
        selectedAreas,
        setSelectedAreas,
        selectedCommentIds,
        setSelectedCommentIds
    } = useContext(AnnotationContext);

    const annotate = (annotation: AnnotationProps, id: number) => {
        annotations[id] = annotation;
        setAnnotations({ ...annotations }); // Needs to be shallow copy to make setState re-render
    };

    return {
        SELECT_AREA: useSelectArea({
            annotations,
            annotate,
            selectedAreas,
            setSelectedAreas
        }),
        ARROW: useArrow({ annotations, annotate }),
        FREE_HAND: useFreeHand({ annotations, annotate }),
        OBFUSCATION: useObfuscation({ annotations, annotate }),
        TEXT: useText({
            annotations,
            annotate,
            selectedCommentIds,
            setSelectedCommentIds
        })
    };
};
