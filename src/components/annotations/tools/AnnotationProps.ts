import { ArrowProps } from './Arrow/Arrow';
import { FreeHandProps } from './FreeHand';
import { ObfuscationProps } from './Obfuscation';
import { SelectAreaProps } from './SelectArea';

export type AnnotationProps = SelectAreaProps | ArrowProps | FreeHandProps | ObfuscationProps;

export type AnnotationPropsObject = {
    [id: string]: AnnotationProps;
};
