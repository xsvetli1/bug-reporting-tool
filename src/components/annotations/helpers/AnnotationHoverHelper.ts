import { useEffect } from 'react';

export const hoverAnnotationClass = (isHover?: boolean) => {
    return isHover ? 'annotation-js-hover' : '';
};

export const useHoverEffect = (isHover?: boolean) =>
    useEffect(() => {
        document
            .getElementById('annotation-area')
            ?.style.setProperty('cursor', isHover ? 'grab' : 'var(--cursor)');
    }, [isHover]);
