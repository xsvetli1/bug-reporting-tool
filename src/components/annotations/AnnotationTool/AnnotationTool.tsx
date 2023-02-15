import React, { useState } from 'react';

import AnnotationArea from '../AnnotationArea';
import '../Annotations.css';
import { AnnotationPropsObject } from '../tools/AnnotationProps';
import Arrow from '../tools/Arrow';
import SelectArea from '../tools/SelectArea';
import { SelectedAreas } from '../types/SelectedAreas';
import FreeHand from '../tools/FreeHand';
import Obfuscation from '../tools/Obfuscation';
import Text from '../tools/Text';
import { useAnnotationRelocation } from './useAnnotationRelocation';
import AnnotationAreaContent from '../AnnotationAreaContent';
import { useAnnotationCreateHandlers } from './useAnnotationCreateHandlers';
import { AllAnnotationTypes } from '../types';

export interface AnnotationToolProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = ({ isOngoingAnnotation, handleClose }: AnnotationToolProps) => {
    const [annotations, setAnnotations] = useState<AnnotationPropsObject>({});
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});

    const allAnnotationCreateHandlers = useAnnotationCreateHandlers({
        annotations,
        setAnnotations,
        selectedAreas,
        setSelectedAreas
    });
    const [currentAnnotationType, setCurrentAnnotationType] =
        useState<AllAnnotationTypes>('SELECT_AREA');

    const [annotationInHandId, annotationGrabHandlers, annotationMoveHandlers] =
        useAnnotationRelocation({
            annotations,
            setAnnotations,
            selectedAreas,
            setSelectedAreas
        });

    const mouseEventHandlers = annotationInHandId
        ? annotationMoveHandlers
        : allAnnotationCreateHandlers[currentAnnotationType];

    let textCommentIndex = 1;
    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea
                        selectedAreas={selectedAreas}
                        mouseEventHandlers={mouseEventHandlers}
                    >
                        {Object.keys(annotations).map((key, index) => {
                            const annotationProps = {
                                ...annotations[key],
                                moveHandlers: annotationGrabHandlers(key)
                            };
                            return (
                                <React.Fragment key={index}>
                                    {annotationProps.TYPE == 'SELECT_AREA' && (
                                        <SelectArea {...annotationProps} />
                                    )}
                                    {annotationProps.TYPE == 'ARROW' && (
                                        <Arrow {...annotationProps} />
                                    )}
                                    {annotationProps.TYPE == 'FREE_HAND' && (
                                        <FreeHand {...annotationProps} />
                                    )}
                                    {annotationProps.TYPE == 'OBFUSCATION' && (
                                        <Obfuscation {...annotationProps} />
                                    )}
                                    {annotationProps.TYPE == 'TEXT' && (
                                        <Text {...annotationProps} id={textCommentIndex++} />
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </AnnotationArea>
                    <AnnotationAreaContent
                        currentAnnotationType={currentAnnotationType}
                        setCurrentAnnotationType={setCurrentAnnotationType}
                        handleClose={handleClose}
                        annotationInHandId={annotationInHandId}
                    />
                </>
            )}
        </>
    );
};

export default AnnotationTool;
