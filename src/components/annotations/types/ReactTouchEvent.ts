import React from 'react';

/** Type unioning all React TouchEvents used. */
export type ReactTouchEvent =
    | React.TouchEvent<SVGSVGElement>
    | React.TouchEvent<SVGGElement>
    | React.TouchEvent<SVGRectElement>
    | React.TouchEvent<SVGLineElement>
    | React.TouchEvent<SVGPolylineElement>;
