import React from 'react';

export type ReactMouseEvent =
    | React.MouseEvent<SVGSVGElement, MouseEvent>
    | React.MouseEvent<SVGRectElement, MouseEvent>;
