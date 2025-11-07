import { useEffect, useState } from "react";
import spotifyLogo from "../assets/Spotify_icon.svg";
import youtubeLogo from "../assets/Youtube_Music_icon.svg";

import "./CursorBackground.css";

const CursorBackground = () => {
  const [positions, setPositions] = useState([
    { x: 100, y: 100, dx: 3, dy: 3, img: spotifyLogo },
    { x: 300, y: 200, dx: -2, dy: 2, img: youtubeLogo }, // 👈 YouTube
  ]);

  const size = 120;

  useEffect(() => {
    let animationFrame;

    const move = () => {
      setPositions((prevPositions) =>
        prevPositions.map((p) => {
          let newX = p.x + p.dx;
          let newY = p.y + p.dy;
          let newDx = p.dx;
          let newDy = p.dy;

          // Bounce horizontally
          if (newX <= 0 || newX + size >= window.innerWidth) {
            newDx = -newDx;
          }

          // Bounce vertically
          if (newY <= 0 || newY + size >= window.innerHeight) {
            newDy = -newDy;
          }

          return { ...p, x: newX, y: newY, dx: newDx, dy: newDy };
        })
      );

      animationFrame = requestAnimationFrame(move);
    };

    animationFrame = requestAnimationFrame(move);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  return (
    <>
      {positions.map((p, index) => (
        <img
          key={index}
          src={p.img}
          alt="Background Logo"
          className="cursor-logo"
          style={{
            left: p.x,
            top: p.y,
            width: size,
            height: size,
          }}
        />
      ))}
    </>
  );
};

export default CursorBackground;
