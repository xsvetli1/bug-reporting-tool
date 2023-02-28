import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import React from 'react';
import CloseButton from '../CloseButton';
import CropFreeSharpIcon from '@mui/icons-material/CropFreeSharp';
import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import DeselectIcon from '@mui/icons-material/Deselect';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import DoneIcon from '@mui/icons-material/Done';
import { UseStateSetter } from '../../../models/UseStateSetter';
import { AllAnnotationTypes } from '../types';
import AnnotationAreaBorder from '../AnnotationAreaBorder';

export interface AnnotationAreaContentProps {
    currentAnnotationType: AllAnnotationTypes;
    setCurrentAnnotationType: UseStateSetter<AllAnnotationTypes>;
    annotationInHandId: string;
    takeScreenshot: () => void;
    handleClose: () => void;
}

const AnnotationAreaContent = ({
    currentAnnotationType,
    setCurrentAnnotationType,
    annotationInHandId,
    takeScreenshot,
    handleClose
}: AnnotationAreaContentProps) => {
    const handleAnnotationTypeId = (
        _: React.MouseEvent<HTMLElement>,
        newId: AllAnnotationTypes
    ) => {
        setCurrentAnnotationType(newId);
    };

    const buttonIcons: { [key in AllAnnotationTypes]: () => JSX.Element } = {
        SELECT_AREA: () => <CropFreeSharpIcon />,
        ARROW: () => <CallMadeSharpIcon />,
        FREE_HAND: () => <ModeEditOutlineSharpIcon />,
        OBFUSCATION: () => <DeselectIcon />,
        TEXT: () => <ChatSharpIcon />
    };

    return (
        <div className="annotation-area-content" data-html2canvas-ignore>
            <AnnotationAreaBorder />
            <CloseButton onClick={handleClose} />
            <div className="annotation-button-group">
                <ToggleButtonGroup
                    orientation="vertical"
                    exclusive
                    aria-label="tool button group"
                    value={annotationInHandId ? '' : currentAnnotationType}
                    onChange={handleAnnotationTypeId}
                >
                    {Object.keys(buttonIcons).map((annotationType) => {
                        return (
                            <ToggleButton
                                key={annotationType}
                                className="annotation-tools-button"
                                value={annotationType}
                            >
                                {buttonIcons[annotationType as AllAnnotationTypes]()}
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
                <Button
                    className="annotation-save-button"
                    variant="contained"
                    color="success"
                    onClick={() => takeScreenshot()}
                >
                    <DoneIcon />
                </Button>
                {/* <Button className="annotation-save-button">Done</Button> */}
            </div>
        </div>
    );
};

export default AnnotationAreaContent;
