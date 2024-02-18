"use client";
import { useParams } from "next/navigation";
import InviteMatch from "../../../../../components/Game/inviteMatch";
import ScoreBoard from "../../../../../components/Game/scoreBoard";

export default function Page() {
  const { id } = useParams();

  return (
    <>
      <div className="pl-[10%] bg-background h-screen w-screen justify-center ">
        <ScoreBoard  />
        <InviteMatch />
      </div>
    </>
  );
}
