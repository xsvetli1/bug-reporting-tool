import html2canvas from 'html2canvas';

export const takeScreenshot = () => {
    html2canvas(document.body, {
        logging: false,
        ignoreElements: (element) => element.classList.contains('MuiTooltip-popper')
    }).then((canvas) => {
        const base64image = canvas.toDataURL('image/png');
        window.location.href = base64image;
    });
};
