import React from 'react';

const AnnotationAreaBorder = () => (
    <>
        <div
            className="annotation-area-border"
            style={{ left: 0, top: 0, width: '100vw', height: 'var(--border-width)' }}
        ></div>
        <div
            className="annotation-area-border"
            style={{ left: 0, bottom: 0, width: '100vw', height: 'var(--border-width)' }}
        ></div>
        <div
            className="annotation-area-border"
            style={{ left: 0, top: 0, width: 'var(--border-width)', height: '100vh' }}
        ></div>
        <div
            className="annotation-area-border"
            style={{ right: 0, top: 0, width: 'var(--border-width)', height: '100vh' }}
        ></div>
    </>
);

export default AnnotationAreaBorder;
