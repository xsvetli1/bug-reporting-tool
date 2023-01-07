import React, { useEffect, useRef } from "react";

export interface CanvasProps {
}

const Canvas = (props: CanvasProps) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const context = canvas?.getContext('2d');
        if (!context) {
            return;
        }

        context.canvas.width = window.innerWidth;
        context.canvas.height = window.innerHeight;
        context.canvas.style.position = "fixed";
        context.fillStyle = 'rgba(255, 255, 255, 0.4)';
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)
      }, [])

    return <canvas ref={canvasRef}/>;
};

export default Canvas;
