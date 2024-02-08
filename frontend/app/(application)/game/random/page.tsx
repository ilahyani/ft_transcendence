"use client";
import { useState } from "react";
import RandomMatch from "../../../../components/Game/RandomGame";
import ScoreBoard from "../../../../components/Game/scoreBoard";
// import WaitaingModal from "../../../../components/Game/WaitingModal";

const RandomMatchPage = () => {
  return (
    <div className="w-screen h-screen bg-background overflow-x-hidden overflow-y-hidden">
      <ScoreBoard />
      <RandomMatch />
    </div>
  );
};

export default RandomMatchPage;
