import CanvasBoard from "./CanvasBoard";
import { createUseStyles } from "react-jss";
import { useCallback, useState } from "react";

const useStyles = createUseStyles((theme) => ({
  root: {
    display: "flex",
    border: "4px solid green",
    margin: "300px",
  },
}));

const CanvasHandler = () => {
  const [initialPos, setInitialPos] = useState({ x: 250, y: 20 });

  const baller = useCallback(
    (canvas, ctx) => {
      const angleStart = 0;
      const angleEnd = Math.PI * 2;

      const defineVectors = () => {
        let vy, vx;
        // Quand c'est split il faut qu'elle s'éloigne dans des directions opposées.
      };

      const defineColor = (i) => {
        const opacity = 1 - (10 - i) / 10;
        return `rgba(255,140,0, ${opacity})`;
      };

      const sizingTheBalls = (i) => {
        let posX = 0,
          posY = 0,
          radius;
        radius = i ** 1.5 / 2;
        posX = Math.round(initialPos.x - radius * 2 - i ** 2.2);
        posY = Math.round(initialPos.y + i ** 2);
        return { radius, posX, posY };
      };

      const howManySplits = (i) => {
        if (i < 6) return 1;
        if (i >= 6) return i - 4;
      };

      const positionForSplits = (j, posY, posX) => {
      };

      const curve = (x, y) => {
      };

      const draw = (i, radius, posX, posY, color, splits = 0) => {
        // if (splits !== 0) {
        //   for (let j = 1; j <= splits; j++) {
        //     const newRadius = radius - j;
        //     let newPosY = j % 2 === 0 ? (posY * 0.9) + j ** 2.5 : (posY* 0.9) - j ** 2.5;
        //     ctx.beginPath();
        //     ctx.arc(posX, newPosY, newRadius, angleStart, angleEnd);
        //     ctx.fillStyle = color;
        //     ctx.fill();
        //     ctx.closePath();
        //   }
        // }
        if (splits !== 0) {
          let curve = (0.9 * i) / 10;
          let curvedY = posY - i ** 1.5;
          ctx.beginPath();
          ctx.arc(posX, curvedY, radius, angleStart, angleEnd);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        } else {
          ctx.beginPath();
          ctx.arc(posX, posY, radius, angleStart, angleEnd);
          ctx.fillStyle = color;
          ctx.fill();
          ctx.closePath();
        }
      };

      const iterate = () => {
        for (let i = 1; i <= 10; i++) {
          const { radius, posX, posY } = sizingTheBalls(i);
          const color = defineColor(i);
          const splits = howManySplits(i);
          if (splits === 1) draw(i, radius, posX, posY, color);
          else draw(i, radius, posX, posY, color, splits);
        }
      };

      iterate();
    },
    [initialPos]
  );

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CanvasBoard baller={baller} setInitialPos={setInitialPos} />
    </div>
  );
};

export default CanvasHandler;
