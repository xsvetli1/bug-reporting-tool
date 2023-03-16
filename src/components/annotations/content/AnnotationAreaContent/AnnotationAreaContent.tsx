import { Button, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import CloseButton from '../CloseButton';
import CropFreeSharpIcon from '@mui/icons-material/CropFreeSharp';
import CallMadeSharpIcon from '@mui/icons-material/CallMadeSharp';
import ModeEditOutlineSharpIcon from '@mui/icons-material/ModeEditOutlineSharp';
import DeselectIcon from '@mui/icons-material/Deselect';
import ChatSharpIcon from '@mui/icons-material/ChatSharp';
import DoneIcon from '@mui/icons-material/Done';
import { UseStateSetter } from '../../../../models/UseStateSetter';
import { AllAnnotationTypes } from '../../types';
import AnnotationAreaBorder from '../AnnotationAreaBorder';
import { getSVGHeigth, getSVGWidth } from '../../helpers/CoordinatesHelper';

export interface AnnotationAreaContentProps {
    currentAnnotationType: AllAnnotationTypes;
    setCurrentAnnotationType: UseStateSetter<AllAnnotationTypes>;
    annotationInHandId: string;
    submit: () => void;
    handleClose: () => void;
}

const AnnotationAreaContent = ({
    currentAnnotationType,
    setCurrentAnnotationType,
    annotationInHandId,
    submit,
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

    const toolbarRef = useRef<HTMLDivElement>(null);

    return (
        <div className="annotation-area-content" data-html2canvas-ignore>
            <AnnotationAreaBorder />
            <CloseButton onClick={handleClose} />
            <Draggable
                nodeRef={toolbarRef}
                bounds={{
                    top: 0,
                    bottom: getSVGHeigth() - (toolbarRef.current?.clientHeight ?? 0)
                }}
                grid={[getSVGWidth() - (toolbarRef.current?.clientWidth ?? 0), 1]}
            >
                <div className="annotation-button-group" ref={toolbarRef}>
                    <ToggleButtonGroup
                        orientation="vertical"
                        exclusive
                        aria-label="tool button group"
                        value={annotationInHandId ? '' : currentAnnotationType}
                        onChange={handleAnnotationTypeId}
                    >
                        {Object.keys(buttonIcons).map((annotationType) => {
                            const { icon, label } =
                                buttonIcons[annotationType as AllAnnotationTypes]();
                            return (
                                <ToggleButton
                                    key={annotationType}
                                    className="annotation-tools-button"
                                    value={annotationType}
                                >
                                    <Tooltip title={label} placement="right" followCursor={true}>
                                        {icon}
                                    </Tooltip>
                                </ToggleButton>
                            );
                        })}
                    </ToggleButtonGroup>
                    <Tooltip
                        title="Submit annotated screenshot"
                        placement="right"
                        followCursor={true}
                    >
                        <Button
                            className="annotation-save-button"
                            variant="contained"
                            color="success"
                            onClick={() => submit()}
                        >
                            <DoneIcon />
                        </Button>
                    </Tooltip>
                </div>
            </Draggable>
        </div>
    );
};

export default AnnotationAreaContent;
