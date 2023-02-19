import React from 'react';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { AnnotationPropsObject } from '../tools/AnnotationProps';
import Arrow from '../tools/Arrow';
import FreeHand from '../tools/FreeHand';
import Obfuscation from '../tools/Obfuscation';
import SelectArea from '../tools/SelectArea';
import Text from '../tools/Text';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

export interface AnnotationsProps {
    annotations: AnnotationPropsObject;
    obtainAnnotationGrabHandlers: (id: string) => AnnotationMouseEventHandlers;
    selectedCommentId: string;
    setSelectedCommentId: UseStateSetter<string>;
}

const Annotations = ({
    annotations,
    obtainAnnotationGrabHandlers,
    selectedCommentId,
    setSelectedCommentId
}: AnnotationsProps) => {
    let textCommentIndex = 1;

    return (
        <>
            {Object.keys(annotations).map((key, index) => {
                const annotationProps = {
                    ...annotations[key],
                    moveHandlers: obtainAnnotationGrabHandlers(key)
                };
                const type = annotationProps.TYPE;
                return (
                    <React.Fragment key={index}>
                        {type == 'SELECT_AREA' && <SelectArea {...annotationProps} />}
                        {type == 'ARROW' && <Arrow {...annotationProps} />}
                        {type == 'FREE_HAND' && <FreeHand {...annotationProps} />}
                        {type == 'OBFUSCATION' && <Obfuscation {...annotationProps} />}
                        {type == 'TEXT' && (
                            <Text
                                {...annotationProps}
                                index={textCommentIndex++}
                                open={selectedCommentId.toString() == key}
                                setSelectedCommentId={setSelectedCommentId}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default Annotations;
