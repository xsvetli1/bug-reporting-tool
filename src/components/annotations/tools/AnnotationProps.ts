import { ArrowProps } from './Arrow/Arrow';
import { SelectAreaProps } from './SelectArea';

export type AnnotationProps = SelectAreaProps | ArrowProps;

export type AnnotationPropsObject = {
    [id: string]: AnnotationProps;
};
