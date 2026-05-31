import { useRef, useEffect, useState } from "react";
import Canvas from "./Canvas";

const ProfileStep3 = () => {

    let count = 4;


    const drawSmallBalls = (ctx, x, y, size, color) => {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
    }

    const drawBall = (ctx, x, y, size, color) => {
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI*2);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        for (let i = 1 ; i < 10 ; i ++) {
            if (i % 2 === 0) drawSmallBalls(ctx, x + (2 * i), y + (2*i), 2, 'red');
            // else drawBall(ctx, x + (i * -3 ), y, 2, 'blue');
        }
    }
    const draw = (canvas, ctx, x, y) => {
       count ++;
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       x += count * 10;
       y -= count*10;
       if (x > canvas.width - 100) {
           x = canvas.width - 290;
           y = canvas.height - 10;
        }
        for (let i = 1 ; i < 15 ; i ++) {
            if (i % 2 === 0) drawBall(ctx, x + (10 * -i), y + (10 * i), 10, "orange");
            if (i % 2 !== 0) drawBall(ctx, x + (10 * i), y + (10 * -i), 10, "magenta");
        }
    }

    return (
        <div>
            <h3>Congratulations</h3>
            <Canvas draw={draw} />
        </div>
    );
};

export default ProfileStep3;
