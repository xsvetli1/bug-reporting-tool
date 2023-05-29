import { Button, ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import React, { useContext, useEffect, useRef, useState } from 'react';
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
import { ToolContext } from '../../../../contexts/ToolContext';
import { takeScreenshot } from '../../helpers/ScreenshotHelper';

export interface AnnotationAreaContentProps {
    currentAnnotationType: AllAnnotationTypes;
    setCurrentAnnotationType: UseStateSetter<AllAnnotationTypes>;
    annotationInHandId: string;
    handleClose: () => void;
}

/**
 * Component managing all content for control of annotation tool:
 * - annotation area border
 * - annotation tool close button
 * - toolbars
 */
const AnnotationAreaContent = ({
    currentAnnotationType,
    setCurrentAnnotationType,
    annotationInHandId,
    handleClose
}: AnnotationAreaContentProps) => {
    const { annotations, setAnnotations, setScreenshots, setIsOngoingAnnotation } =
        useContext(ToolContext);

    const [toolbarSize, setToolbarSize] = useState<{ width: number; height: number } | null>(null);
    const toolbarRef = useRef<HTMLDivElement>(null);

    const handleAnnotationTypeId = (
        _: React.MouseEvent<HTMLElement>,
        newId: AllAnnotationTypes
    ) => {
        if (newId !== null) {
            setCurrentAnnotationType(newId);
        }
    };

    const submit = async () => {
        const comments: string[] = [];
        Object.values(annotations).forEach((annotation) => {
            if (annotation.type === 'TEXT') {
                comments.push(annotation.comment ?? '');
            }
        });

        takeScreenshot().then((screenshot) => {
            setScreenshots((allScreenshots) => {
                allScreenshots.push({ dataUrl: screenshot, comments });
                return [...allScreenshots];
            });
        });
        setIsOngoingAnnotation(false);
        setAnnotations({});
    };

    useEffect(() => {
        if (toolbarRef.current) {
            setToolbarSize({
                width: toolbarRef.current.clientWidth,
                height: toolbarRef.current.clientHeight
            });
        }
    }, [toolbarRef]);

    return (
        <div className="annotation-area-content" data-html2canvas-ignore>
            <AnnotationAreaBorder />
            <CloseButton onClick={handleClose} />
            <Draggable
                bounds={{
                    top: 0,
                    bottom: toolbarSize ? getSVGHeigth() - toolbarSize.height : 0,
                    left: 0,
                    right: toolbarSize ? getSVGWidth() - (toolbarSize.width ?? 0) : 0
                }}
                grid={[getSVGWidth() - (toolbarSize?.width ?? 0), 1]}
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
                                buttonIcons[annotationType as AllAnnotationTypes];
                            return (
                                <ToggleButton
                                    key={annotationType}
                                    className="annotation-tools-button"
                                    value={annotationType}
                                >
                                    <Tooltip title={label} placement="right">
                                        <div style={{ padding: 11, lineHeight: 0, height: 24 }}>
                                            {icon}
                                        </div>
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
                            onClick={submit}
                        >
                            <DoneIcon />
                        </Button>
                    </Tooltip>
                </div>
            </Draggable>
        </div>
    );
};

const buttonIcons: { [key in AllAnnotationTypes]: { icon: JSX.Element; label: string } } = {
    SELECT_AREA: {
        icon: <CropFreeSharpIcon />,
        label: 'Select Area'
    },
    ARROW: { icon: <CallMadeSharpIcon />, label: 'Arrow' },
    FREE_HAND: { icon: <ModeEditOutlineSharpIcon />, label: 'Free Hand' },
    OBFUSCATION: { icon: <DeselectIcon />, label: 'Obfuscation' },
    TEXT: { icon: <ChatSharpIcon />, label: 'Text' }
};

export default AnnotationAreaContent;
