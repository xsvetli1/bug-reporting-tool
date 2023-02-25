import { ArrowProps } from './Arrow/Arrow';
import { FreeHandProps } from './FreeHand';
import { ObfuscationProps } from './Obfuscation';
import { SelectAreaProps } from './SelectArea';
import { TextProps } from './Text';

export type AllAnnotationProps =
    | SelectAreaProps
    | ArrowProps
    | FreeHandProps
    | ObfuscationProps
    | TextProps;

export type AnnotationPropsObject = {
    [id: string]: AllAnnotationProps;
};
