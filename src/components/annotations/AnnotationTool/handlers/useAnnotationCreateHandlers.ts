import { useArrow } from '../../tools/Arrow';
import { useFreeHand } from '../../tools/FreeHand';
import { useObfuscation } from '../../tools/Obfuscation';
import { useSelectArea } from '../../tools/SelectArea';
import { useText } from '../../tools/Text';
import { AllAnnotationTypes } from '../../types';
import { AnnotationMouseEventHandlers } from '../../types/AnnotationMouseEventHandlers';

export const useAnnotationCreateHandlers = (): {
    [key in AllAnnotationTypes]: AnnotationMouseEventHandlers;
} => {
    return {
        SELECT_AREA: useSelectArea(),
        ARROW: useArrow(),
        FREE_HAND: useFreeHand(),
        OBFUSCATION: useObfuscation(),
        TEXT: useText()
    };
};
