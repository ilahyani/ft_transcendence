import { useEffect, useState } from "react";
import { useAuth } from "../../../../app/context/AuthContext";
import Avatar from "../../Avatar/Avatar";
import { AvatarProps } from "../../types/Avatar.type";
import Achievements from "./Infos/Achievements/UserAchievements";
import Scores from "./Infos/Scores/Scores";
import FriendshipState from "./Infos/UserInfos/FriendshipSatate/FriendshipState";
import { useParams } from "next/navigation";
import { useChat } from "../../../../app/context/ChatContext";

type props = {
  setBlocker: any;
  setBlocked: any;
};

function UserCard({ setBlocker, setBlocked }: props) {
  const {
    fetchData,
    state: { profile },
  } = useAuth();

  const param = useParams();

  const avatarObj: AvatarProps = {
    src: profile?.avatar,
    width: 100,
    height: 100,
    userName: profile.username,
    imageStyle: "w-[13rem] h-[13rem] rounded-full object-cover",
    fontSize: "text-2xl font-bold",
    positiosn: true,
    existStatos: true,
    statos: profile?.status,
  };

  useEffect(() => {
<<<<<<< Updated upstream
    fetchData(param.id);
  }, []);
=======
    fetchData(param.id ? param.id : id ? id : undefined);
  }, [profile]);
>>>>>>> Stashed changes

  return (
    <div className="w-[22rem] h-full p-[0.5rem] text-white flex flex-col border border-black border-solid rounded-[15px]">
      <div className="w-full h-full flex flex-col justify-center items-center gap-[1rem]">
        <div className="w-full flex justify-center items-center">
          <Avatar avatarObj={avatarObj} />
        </div>
<<<<<<< Updated upstream
        <FriendshipState setBlocker={setBlocker} setBlocked={setBlocked} />
=======
        <FriendshipState
          setBlocker={setBlocker}
          setBlocked={setBlocked}
          id={param.id ? param.id : id ? id : undefined}
        />
>>>>>>> Stashed changes
        <Scores />
        <Achievements />
      </div>
    </div>
  );
}

export default UserCard;
