import React from "react";
import Lottie from "react-lottie";
import animationData from "../../assets/Loading.json";

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
    <div className="LottieLoading">
      <Lottie options={defaultOptions} height={200} width={200} />
    </div>
  );
}
