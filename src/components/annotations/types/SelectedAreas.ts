import { SelectAreaProps } from '../tools/SelectArea';

/**
 * Dictionary type with key being selected area ID and value being properties
 * object of given selected area.
 *
 * It is duplicate of AllAnnotationProps limited on SelectAreaProps, as SelectArea
 * annotations must be rendered also as a path in the AnnotationArea.
 */
export type SelectedAreas = {
    [id: string]: SelectAreaProps;
};
