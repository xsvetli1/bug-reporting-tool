import { useEffect } from 'react';

export const hoverAnnotationClass = (isHover?: boolean) => {
    return isHover ? 'annotation-js-hover' : '';
};

export const useHoverEffect = (isHover?: boolean) =>
    useEffect(() => {
        document.body.style.cursor = isHover ? 'grab' : 'auto';
    }, [isHover]);
