"use client";
import InviteMatch from "../../../../components/Game/inviteMatch";
import ScoreBoard from "../../../../components/Game/scoreBoard";
import InviteModal from "../../../../components/Game/InviteModal";

const InviteFriendPage = () => {
  return (
    <>
      <div className="pl-[10%] bg-background h-screen w-screen justify-center">
        <InviteModal />
        <ScoreBoard />
        <InviteMatch />
      </div>
    </>
  );
};

export default InviteFriendPage;
