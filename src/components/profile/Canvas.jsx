import { useRef, useEffect, useState } from "react";

import Earth from '../../public/images/earth-ok.png';

const Canvas = ({ draw }) => {
    const [context, setContext] = useState(null);

    const [isPaused, setIsPaused] = useState(false);

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const myContext = canvas.getContext("2d");
        var x = canvas.width - 290;
        var y = canvas.height - 10;
        setContext(myContext);
        let myTimeInterval;
        if (!isPaused) {
            myTimeInterval = setInterval(() => draw(canvas, myContext, x, y), 300);
        }
        return () => {
            clearInterval(myTimeInterval);
        };
    }, [draw, isPaused]);

    return (
        <>
            <canvas
                width={300}
                height={300}
                style={{background: isPaused? 'lightGray' : 'navy', borderRadius: '50%', cursor: 'pointer' }}
                ref={canvasRef}
                onClick={() => setIsPaused(!isPaused)}
            ></canvas>
        </>
    );
};

export default Canvas;
