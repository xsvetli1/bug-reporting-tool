import { UseStateSetter } from '../../../models/UseStateSetter';
import { AnnotationProps, AnnotationPropsObject } from '../tools/AnnotationProps';
import { useArrow } from '../tools/Arrow';
import { useFreeHand } from '../tools/FreeHand';
import { useObfuscation } from '../tools/Obfuscation';
import { useSelectArea } from '../tools/SelectArea';
import { useText } from '../tools/Text';
import { AllAnnotationTypes, SelectedAreas } from '../types';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

export interface AnnotationCreateHandlersHookProps {
    annotations: AnnotationPropsObject;
    setAnnotations: UseStateSetter<AnnotationPropsObject>;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
}

export const useAnnotationCreateHandlers = ({
    annotations,
    setAnnotations,
    selectedAreas,
    setSelectedAreas
}: AnnotationCreateHandlersHookProps): {
    [key in AllAnnotationTypes]: AnnotationMouseEventHandlers;
} => {
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
        TEXT: useText({ annotations, annotate })
    };
};
