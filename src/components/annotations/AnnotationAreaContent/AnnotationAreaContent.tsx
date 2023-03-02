import { Button, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
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
        if (newId !== null) {
            setCurrentAnnotationType(newId);
        }
    };

    const buttonIcons: { [key in AllAnnotationTypes]: () => { icon: JSX.Element; label: string } } =
        {
            SELECT_AREA: () => ({
                icon: <CropFreeSharpIcon />,
                label: 'Select Area'
            }),
            ARROW: () => ({ icon: <CallMadeSharpIcon />, label: 'Arrow' }),
            FREE_HAND: () => ({ icon: <ModeEditOutlineSharpIcon />, label: 'Free Hand' }),
            OBFUSCATION: () => ({ icon: <DeselectIcon />, label: 'Obfuscation' }),
            TEXT: () => ({ icon: <ChatSharpIcon />, label: 'Text' })
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
                        const { icon, label } = buttonIcons[annotationType as AllAnnotationTypes]();
                        return (
                            <ToggleButton
                                key={annotationType}
                                className="annotation-tools-button"
                                value={annotationType}
                            >
                                <Tooltip title={label} placement="right">
                                    {icon}
                                </Tooltip>
                            </ToggleButton>
                        );
                    })}
                </ToggleButtonGroup>
                <Tooltip title="Submit annotated screenshot" placement="right">
                    <Button
                        className="annotation-save-button"
                        variant="contained"
                        color="success"
                        onClick={() => takeScreenshot()}
                    >
                        <DoneIcon />
                    </Button>
                </Tooltip>
                {/* <Button className="annotation-save-button">Done</Button> */}
            </div>
        </div>
    );
};

export default AnnotationAreaContent;
