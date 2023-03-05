import React from 'react';

export type ReactTouchEvent =
    | React.TouchEvent<SVGSVGElement>
    | React.TouchEvent<SVGGElement>
    | React.TouchEvent<SVGRectElement>
    | React.TouchEvent<SVGLineElement>
    | React.TouchEvent<SVGPolylineElement>;
