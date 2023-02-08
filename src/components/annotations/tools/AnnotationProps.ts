import { ArrowProps } from './Arrow/Arrow';
import { FreeHandProps } from './FreeHand';
import { SelectAreaProps } from './SelectArea';

export type AnnotationProps = SelectAreaProps | ArrowProps | FreeHandProps;

export type AnnotationPropsObject = {
    [id: string]: AnnotationProps;
};
