"use client";
import { useEffect, useState } from "react";

const japaneseChars =
  "あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをんあいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもやゆよらりるれろわをん";

export default function FallingBackground() {
  const [characters, setCharacters] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const createCharacter = () => {
      const char =
        japaneseChars[Math.floor(Math.random() * japaneseChars.length)];
      const style = {
        left: `${Math.random() * 100}%`,
        animationDuration: `${5 + Math.random() * 10}s`,
        opacity: 0.1 + Math.random() * 0.6,
        filter: `blur(${1 + Math.random() * 0.2}px)`,
      };
      return (
        <span key={Date.now()} className="falling-character" style={style}>
          {char}
        </span>
      );
    };

    const newCharacters: JSX.Element[] = [];
    for (let i = 0; i < 110; i++) {
      newCharacters.push(createCharacter());
    }
    setCharacters(newCharacters);

    const interval = setInterval(() => {
      setCharacters((prev) => {
        const updated = [...prev];
        updated.shift();
        updated.push(createCharacter());
        return updated;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return <div className="falling-background">{characters}</div>;
}
