import React from 'react';

export type ReactTouchEvent =
    | React.TouchEvent<SVGSVGElement>
    | React.TouchEvent<SVGRectElement>
    | React.TouchEvent<SVGLineElement>
    | React.TouchEvent<SVGPolylineElement>;
