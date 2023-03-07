import React, { useContext } from 'react';
import { AnnotationContext } from '../AnnotationTool/AnnotationContext';
import Arrow from '../tools/Arrow';
import FreeHand from '../tools/FreeHand';
import Obfuscation from '../tools/Obfuscation';
import SelectArea from '../tools/SelectArea';
import Text from '../tools/Text';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';

export interface AnnotationsProps {
    obtainAnnotationGrabHandlers: (id: string) => AnnotationMouseEventHandlers;
}

const Annotations = ({ obtainAnnotationGrabHandlers }: AnnotationsProps) => {
    const {
        annotations,
        setAnnotations,
        setSelectedAreas,
        selectedCommentIds,
        setSelectedCommentIds
    } = useContext(AnnotationContext);

    let textCommentIndex = 1;

    return (
        <>
            {Object.keys(annotations).map((key, index) => {
                const annotationProps = {
                    ...annotations[key],
                    moveHandlers: obtainAnnotationGrabHandlers(key),
                    deleteCallback: () => {
                        if (annotations[key].type == 'SELECT_AREA') {
                            setSelectedAreas((selectedAreas) => {
                                delete selectedAreas[key];
                                return selectedAreas;
                            });
                        } else if (annotations[key].type == 'TEXT') {
                            setSelectedCommentIds(selectedCommentIds.filter((id) => id != key));
                        }

                        delete annotations[key];
                        setAnnotations({ ...annotations });
                    }
                };
                const type = annotationProps.type;
                return (
                    <React.Fragment key={index}>
                        {type == 'SELECT_AREA' && <SelectArea {...annotationProps} />}
                        {type == 'ARROW' && <Arrow {...annotationProps} />}
                        {type == 'FREE_HAND' && <FreeHand {...annotationProps} />}
                        {type == 'OBFUSCATION' && <Obfuscation {...annotationProps} />}
                        {type == 'TEXT' && (
                            <Text
                                {...annotationProps}
                                id={key}
                                index={textCommentIndex++}
                                open={selectedCommentIds.includes(key)}
                                setSelectedCommentIds={setSelectedCommentIds}
                            />
                        )}
                    </React.Fragment>
                );
            })}
        </>
    );
};

export default Annotations;
