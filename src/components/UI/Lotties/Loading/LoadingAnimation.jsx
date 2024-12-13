import React from "react";
import Lottie from "react-lottie";
import animationData from "./Loading.json";

export default function LoadingAnimation() {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="h-[40vh] flex flex-col justify-center items-center">
      <Lottie options={defaultOptions} height={150} width={150} />
    </div>
  );
}
