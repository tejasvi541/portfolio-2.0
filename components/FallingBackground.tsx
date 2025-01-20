"use client";
import { useEffect, useState } from "react";

const japaneseChars =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

export default function FallingBackground() {
  const [characters, setCharacters] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const newCharacters = [];
    for (let i = 0; i < 50; i++) {
      const char =
        japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${15 + Math.random() * 10}s`,
        animationDelay: `${-Math.random() * 15}s`,
        opacity: 0.5 + Math.random() * 0.1,
        filter: `blur(${1 + Math.random() * 2}px)`,
      };
      newCharacters.push(
        <span key={i} className="falling-character" style={style}>
          {char}
        </span>
      );
    }
    setCharacters(newCharacters);
  }, []);

  return <div className="falling-background">{characters}</div>;
}
