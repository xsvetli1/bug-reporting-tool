export const hoverEffect = (isHover?: boolean) => {
    document.body.style.cursor = isHover ? 'grab' : 'auto';
    return isHover ? 'annotation-js-hover' : '';
};
