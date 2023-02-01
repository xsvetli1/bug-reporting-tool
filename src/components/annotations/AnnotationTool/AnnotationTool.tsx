import React, { useId, useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import CropFreeSharpIcon from '@mui/icons-material/CropFreeSharp';
import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';
import AnnotationArea from '../AnnotationArea';
import '../Annotations.css';
import CloseButton from '../CloseButton';
import { AnnotationProps, AnnotationPropsObject } from '../tools/AnnotationProps';
import Arrow, { useArrow } from '../tools/Arrow';
import SelectArea, { useSelectArea } from '../tools/SelectArea';
import { AnnotationMouseEventHandlers } from '../types/AnnotationMouseEventHandlers';
import { SelectedAreas } from '../types/SelectedAreas';

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
    const [currentAnnotationId, setCurrentAnnotationId] = useState(selectAreaId);

    const handleAnnotationId = (_: React.MouseEvent<HTMLElement>, newId: string) => {
        setCurrentAnnotationId(newId);
    };

    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea
                        selectedAreas={selectedAreas}
                        mouseEventHandlers={allAnnotationHandlers[currentAnnotationId]}
                    >
                        {Object.keys(annotations).map((key, index) => {
                            const annotationProps = annotations[key];
                            return (
                                <>
                                    {annotationProps.TYPE == 'SELECT_AREA' && (
                                        <SelectArea key={index} {...annotationProps} />
                                    )}
                                    {annotationProps.TYPE == 'ARROW' && (
                                        <Arrow key={index} {...annotationProps} />
                                    )}
                                </>
                            );
                        })}
                    </AnnotationArea>
                    <div className="annotation-area-content">
                        <CloseButton onClick={handleClose} />
                        <ToggleButtonGroup
                            orientation="vertical"
                            exclusive
                            aria-label="tool button group"
                            value={currentAnnotationId}
                            onChange={handleAnnotationId}
                        >
                            <ToggleButton className="annotation-tools-button" value={selectAreaId}>
                                <CropFreeSharpIcon />
                            </ToggleButton>
                            <ToggleButton className="annotation-tools-button" value={arrowId}>
                                <CallMadeSharpIcon />
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </div>
                </>
            )}
        </>
    );
};

export default AnnotationTool;
