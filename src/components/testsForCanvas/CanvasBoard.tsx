import { useRef, useLayoutEffect } from "react";

const CanvasBoard = ({ baller, setInitialPos }) => {
    const canvasRef = useRef(null);

    useLayoutEffect(() => {
        const canvas = canvasRef?.current;
        if (canvas) {
            const context = canvas.getContext("2d");
            setInitialPos({ x: 250, y: 20 });
            baller(canvas, context);
        }
    }, [canvasRef]);

    return (
        <canvas
            width={300}
            height={250}
            ref={canvasRef}
            style={{ border: "2px red solid", margin: "0 auto", padding: "20px" }}
        />
    );
};

export default CanvasBoard;
