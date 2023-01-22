import { Button, ButtonGroup } from '@mui/material';
import React, { useState } from 'react';
import AnnotationArea from '../AnnotationArea';
import '../Annotations.css';
import CloseButton from '../CloseButton';
import { AnnotationProps } from '../tools/AnnotationProps';
import { useArrow } from '../tools/Arrow';
import SelectArea, { useSelectArea } from '../tools/SelectArea';
import { SelectedAreas } from '../types/SelectedAreas';

export interface AnnotationToolProps {
    isOngoingAnnotation: boolean;
    handleClose: () => void;
}

const AnnotationTool = ({ isOngoingAnnotation, handleClose }: AnnotationToolProps) => {
    const [annotations, setAnnotations] = useState<AnnotationProps[]>([]);
    const [selectedAreas, setSelectedAreas] = useState<SelectedAreas>({});

    const annotate = (annotation: AnnotationProps) => setAnnotations([...annotations, annotation]);

    const selectArea = useSelectArea({
        annotations,
        annotate,
        selectedAreas,
        setSelectedAreas
    });
    const arrow = useArrow({ annotations, annotate });

    const allHandlers = {
        [selectArea.id]: selectArea.handlers,
        [arrow.id]: arrow.handlers
    };
    const [currentAnnotationId, setCurrentAnnotationId] = useState(selectArea.id);
    const annotationHandlers = allHandlers[currentAnnotationId];

    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea
                        selectedAreas={selectedAreas}
                        mouseEventHandlers={annotationHandlers}
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
                            <Button onClick={() => setCurrentAnnotationId(selectArea.id)}>
                                Select
                            </Button>
                            <Button onClick={() => setCurrentAnnotationId(arrow.id)}>Arrow</Button>
                        </ButtonGroup>
                    </div>
                </>
            )}
        </>
    );
};

export default AnnotationTool;
