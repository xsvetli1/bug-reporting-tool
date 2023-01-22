import React, { useState } from 'react';
import AnnotationArea from '../AnnotationArea';
import '../Annotations.css';
import CloseButton from '../CloseButton';
import { AnnotationProps } from '../tools/AnnotationProps';
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

    const selectAreaHandlers = useSelectArea({
        annotations: annotations,
        annotate: annotate,
        selectedAreas: selectedAreas,
        setSelectedAreas: setSelectedAreas
    });

    return (
        <>
            {isOngoingAnnotation && (
                <>
                    <AnnotationArea
                        selectedAreas={selectedAreas}
                        mouseEventHandlers={selectAreaHandlers}
                    >
                        {annotations.map((annotationProps, index) => (
                            <SelectArea key={index} {...annotationProps} />
                        ))}
                    </AnnotationArea>
                    <div className="annotation-area-content">
                        <CloseButton onClick={handleClose} />
                    </div>
                </>
            )}
        </>
    );
};

export default AnnotationTool;
