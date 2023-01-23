import { Button, ButtonGroup } from '@mui/material';
import React, { useId, useState } from 'react';
import AnnotationArea from '../AnnotationArea';
import '../Annotations.css';
import CloseButton from '../CloseButton';
import { AnnotationProps } from '../tools/AnnotationProps';
import { useArrow } from '../tools/Arrow';
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
    const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});
    const annotate = (annotation: AnnotationProps) => setAnnotations([...annotations, annotation]);

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

    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea
                        selectedAreas={selectedAreas}
                        mouseEventHandlers={allAnnotationHandlers[currentAnnotationId]}
                    >
                        {annotations.map((annotationProps, index) => (
                            <SelectArea key={index} {...annotationProps} />
                        ))}
                    </AnnotationArea>
                    <div className="annotation-area-content">
                        <CloseButton onClick={handleClose} />
                        <ButtonGroup
                            orientation="vertical"
                            variant="contained"
                            aria-label="tool button group"
                        >
                            <Button onClick={() => setCurrentAnnotationId(selectAreaId)}>
                                Select
                            </Button>
                            <Button onClick={() => setCurrentAnnotationId(arrowId)}>Arrow</Button>
                        </ButtonGroup>
                    </div>
                </>
            )}
        </>
    );
};

export default AnnotationTool;
