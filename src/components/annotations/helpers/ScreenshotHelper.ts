import html2canvas from 'html2canvas';

/**
 * @returns Base 64 representation of taken screenshot
 */
export const takeScreenshot = async () => {
    const canvas = await html2canvas(document.body, {
        logging: false,
        ignoreElements: (element) => element.classList.contains('MuiTooltip-popper')
    });
    return canvas.toDataURL('image/png');
};
