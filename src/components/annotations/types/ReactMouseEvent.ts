import React from 'react';

/** Type unioning all React MouseEvents used. */
export type ReactMouseEvent =
    | React.MouseEvent<SVGSVGElement, MouseEvent>
    | React.MouseEvent<SVGGElement, MouseEvent>
    | React.MouseEvent<SVGRectElement, MouseEvent>
    | React.MouseEvent<SVGLineElement, MouseEvent>
    | React.MouseEvent<SVGPolylineElement, MouseEvent>;
