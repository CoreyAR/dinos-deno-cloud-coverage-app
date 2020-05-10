// @deno-types="../types/react/index.d.ts"
import React from "https://dev.jspm.io/react";

export interface AppProps {
  data: {
    cloudCover: number;
  };
}

const fog = (level: number) => {
  let fogs = [];
  while (fogs.length < level) {
    const id = `fog-${fogs.length + 1}`;
    fogs.push(
      <div key={id} id={id}></div>,
    );
  }
  return fogs;
};

const View = ({ data }: AppProps) => {
  const { cloudCover } = data;
  return (
    <div style={{
      height: "100vh",
      width: "100vw",
      backgroundImage: "url(../static/images/sunny-dino.jpeg)",
      backgroundSize: "cover",
    }}>
      {fog(Math.round(cloudCover / 10))}
    </div>
  );
};

export default View;
