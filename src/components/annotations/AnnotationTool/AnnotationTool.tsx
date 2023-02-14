import React, { useId, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import CropFreeSharpIcon from '@mui/icons-material/CropFreeSharp';
import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import DeselectIcon from '@mui/icons-material/Deselect';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import AnnotationArea from '../AnnotationArea';
import '../Annotations.css';
import CloseButton from '../CloseButton';
import { AnnotationProps, AnnotationPropsObject } from '../tools/AnnotationProps';
import Arrow, { useArrow } from '../tools/Arrow';
import SelectArea, { useSelectArea } from '../tools/SelectArea';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';
import { SelectedAreas } from '../types/SelectedAreas';
import FreeHand, { useFreeHand } from '../tools/FreeHand';
import Obfuscation, { useObfuscation } from '../tools/Obfuscation';
import Text, { useText } from '../tools/Text';
import { useAnnotationRelocation } from './useAnnotationRelocation';

export interface AnnotationToolProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

type AllAnnotationHandlers = {
    [id: string]: AnnotationMouseEventHandlers;
};

const AnnotationTool = ({ isOngoingAnnotation, handleClose }: AnnotationToolProps) => {
    const [annotations, setAnnotations] = useState<AnnotationPropsObject>({});
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});
    const annotate = (annotation: AnnotationProps, id: number) => {
        annotations[id] = annotation;
        setAnnotations({ ...annotations }); // Needs to be shallow copy to make setState re-render
    };

    const allAnnotationHandlers: AllAnnotationHandlers = {};
    const addAnnotationHandlers = (handlers: AnnotationMouseEventHandlers) => {
        const id = useId();
        allAnnotationHandlers[id] = handlers;
        return id;
    };

    const selectAreaId = addAnnotationHandlers(
        useSelectArea({
            annotations,
            annotate,
            selectedAreas,
            setSelectedAreas
        })
    );
    const arrowId = addAnnotationHandlers(useArrow({ annotations, annotate }));
    const freeHandId = addAnnotationHandlers(useFreeHand({ annotations, annotate }));
    const obfuscationId = addAnnotationHandlers(useObfuscation({ annotations, annotate }));
    const textId = addAnnotationHandlers(useText({ annotations, annotate }));

    const [currentAnnotationTypeId, setCurrentAnnotationTypeId] = useState(selectAreaId);

    const handleAnnotationTypeId = (_: React.MouseEvent<HTMLElement>, newId: string) => {
        setCurrentAnnotationTypeId(newId);
    };

    let textCommentIndex = 1;

    const [annotationInHand, annotationGrabHandlers, annotationMoveHandlers] =
        useAnnotationRelocation({
            annotations,
            setAnnotations,
            selectedAreas,
            setSelectedAreas
        });

    const mouseEventHandlers = () => {
        return annotationInHand
            ? annotationMoveHandlers
            : allAnnotationHandlers[currentAnnotationTypeId];
    };

    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea
                        selectedAreas={selectedAreas}
                        mouseEventHandlers={mouseEventHandlers()}
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
                    <div className="annotation-area-content">
                        <CloseButton onClick={handleClose} />
                        <ToggleButtonGroup
                            orientation="vertical"
                            exclusive
                            aria-label="tool button group"
                            value={annotationInHand ? '' : currentAnnotationTypeId}
                            onChange={handleAnnotationTypeId}
                        >
                            <ToggleButton className="annotation-tools-button" value={selectAreaId}>
                                <CropFreeSharpIcon />
                            </ToggleButton>
                            <ToggleButton className="annotation-tools-button" value={arrowId}>
                                <CallMadeSharpIcon />
                            </ToggleButton>
                            <ToggleButton className="annotation-tools-button" value={freeHandId}>
                                <ModeEditOutlineSharpIcon />
                            </ToggleButton>
                            <ToggleButton className="annotation-tools-button" value={obfuscationId}>
                                <DeselectIcon />
                            </ToggleButton>
                            <ToggleButton className="annotation-tools-button" value={textId}>
                                <ChatSharpIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </>
            )}
        </>
    );
};

export default AnnotationTool;
