import Avatar from "../../Avatar/Avatar";
import Delete from "./Delete/Delete";
import { useEffect, useState } from "react";
import { useAuth } from "../../../../app/context/AuthContext";
import AcceptFriend from "../Card/Infos/UserInfos/AcceptFriend/AcceptFriend";

const FriendsRequest = ({ item }) => {
  const [profile, setProfile] = useState({
    name: "",
    avatar: "",
  });

  const { fetchData, manageFreindReq } = useAuth();

  useEffect(() => {
    fetchData(item.senderId, true).then((result) => {
      setProfile({
        name: result.username,
        avatar: result.avatar,
      });
    });
  }, []);

  const avatarObj = {
    src: profile.avatar,
    userName: profile.name,
    width: 100,
    height: 100,
    imageStyle: "rounded-t-[15px] w-[15.9rem] h-[11rem] object-cover",
    fontSize: "text-base text-white",
    positiosn: true,
  };

  return (
    <div className="w-[16rem] h-full flex flex-col gap-3 border border-black border-solid border-b-1 rounded-[15px]">
      <div className="w-full flex justify-center items-center">
        <Avatar avatarObj={avatarObj} />
      </div>
      <div className="w-full h-full flex flex-col items-center gap-3 p-[0.5rem]">
        <AcceptFriend isCard={false} />
        <Delete manageFriends={() => manageFreindReq(item.id, "decline")} />
      </div>
    </div>
  );
};

export default FriendsRequest;
