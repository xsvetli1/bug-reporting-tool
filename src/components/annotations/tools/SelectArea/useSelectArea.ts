import { useState } from "react";
import { SelectAreaProps } from ".";
import { UseStateSetter } from "../../../../models/UseStateSetter";
import { ReactMouseEvent, ReactTouchEvent, SelectedAreas } from "../../AnnotationTool/AnnotationTool";
import { AnnotationProps } from "../AnnotationProps";
import { getX, getY } from "../CoordinatesHelper";

export interface SelectAreaHookProps {
    annotations: AnnotationProps[];
    annotate: (annotation: AnnotationProps) => void;
    selectedAreas: SelectedAreas;
    setSelectedAreas: UseStateSetter<SelectedAreas>;
}

export const useSelectArea = (props: SelectAreaHookProps) => {

    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0);
    const [selecting, setSelecting] = useState(false);

    const mouseEventHandlers = {
        onMouseDown: (event: ReactMouseEvent) => {
            setStartX(getX(event));
            setStartY(getY(event));
            setSelecting(true);

            selectArea({
                x: startX,
                y: startY,
                width: 0,
                height: 0
            });
        },

        onMouseUp: (_: ReactMouseEvent) => {
            setSelecting(false);
        },

        onMouseMove: (event: ReactMouseEvent) => {
            if (!selecting) {
                return;
            }

            const [x, y] = [getX(event), getY(event)];
            
            selectArea(
                {
                    x: startX,
                    y: startY,
                    width: x - startX,
                    height: y - startY
                },
                props.annotations.length-1
            );
        },

        onTouchStart: (_: ReactTouchEvent) => {
        },

        onTouchMove: (_: ReactTouchEvent) => {
        }
    }

    const selectArea = (selectAreaProps: SelectAreaProps, id=props.annotations.length) => {
        props.selectedAreas[id] = selectAreaProps;
        props.setSelectedAreas({...props.selectedAreas}); // Needs to be shallow copy to make setState re-render
        
        if (id === props.annotations.length) {
            props.annotate(selectAreaProps);
        }
    }
    
    return mouseEventHandlers;
};
