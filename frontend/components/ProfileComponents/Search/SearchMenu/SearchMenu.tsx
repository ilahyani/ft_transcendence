import React from "react";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { DataFetch } from "../../types/Avatar.type";
import { SearchDataFetch } from "../../types/Avatar.type";
import { ProfileData } from "../../types/Avatar.type";
import AllField from "./AllField/AllField";
import UsersField from "./UsersField/UsersField";
import ChannelsField from "./ChannlesField/ChannelsField";
import SearchIcon from "../SearchIcon";

type searchMenuProps = {
  modal: boolean;
  closeModal: () => void;
};

function SearchMenu({ modal, closeModal }: searchMenuProps) {
  const [all, setAll] = useState<boolean>(true);
  const [users, setUsers] = useState<boolean>(false);
  const [channels, setChannels] = useState<boolean>(false);
  const [requestType, setRequestType] = useState<string>("ALL");
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchALLData, setSearchALLData] = useState<SearchDataFetch>({
    users: [],
    channels: [],
  });
  const [searchUsersData, setSearchUsersData] = useState<ProfileData[]>([]);
  const jwt_token = Cookies.get("JWT_TOKEN");

  async function fetchData() {
    try {
      if (jwt_token && searchValue) {
        const response = await axios.get(
          `http://localhost:3000/user/search?type=${requestType}&query=${searchValue}`,
          {
            headers: {
              Authorization: `Bearer ${jwt_token}`,
            },
            withCredentials: true,
          }
        );
        if (response.status <= 299) {
          if (requestType === "ALL") {
            setSearchALLData(response.data);
          } else if (requestType === "USERS") {
            setSearchUsersData(response.data);
          }
        }
      } else throw new Error("bad req");
    } catch (error) {
      console.log("an error occured");
    }
  }

  useEffect(() => {
    fetchData();
    if (searchValue.length === 0) {
      if (requestType === "ALL") {
        setSearchALLData({
          users: [],
          channels: [],
        });
      } else if (requestType === "USERS") {
        setSearchUsersData([]);
      }
    }
  }, [searchValue]);

  function allClick() {
    setAll(true);
    setUsers(false);
    setChannels(false);
    setRequestType("ALL");
  }

  function usersClick() {
    setAll(false);
    setUsers(true);
    setChannels(false);
    setRequestType("USERS");
  }

  function channelsClick() {
    setAll(false);
    setUsers(false);
    setChannels(true);
    setRequestType("CHANNELS");
  }

  function usesrData(): ProfileData[] {
    let usersArray: ProfileData[];
    if (requestType === "ALL") {
      usersArray = searchALLData.users;
    } else if (requestType === "USERS") {
      usersArray = searchUsersData;
    }

    return usersArray;
  }

  function handleModalClose(e: any) {
    if (e.target.id === "modalClose") {
      closeModal();
    }
  }

  if (!modal) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      id="modalClose"
      onClick={handleModalClose}
    >
      <div className="w-[55rem] h-[50rem] rounded-[10px] flex flex-col bg-background p-[1rem] pt-0">
        <div className="w-full h-[5rem] flex items-center gap-[1rem]">
          <SearchIcon />
          <form className="w-full h-[1rem]">
            <input
              className="w-11/12 bg-background focus:outline-none text-white text-basic font-bold "
              placeholder="Users or Channels"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
            />
          </form>
        </div>
        <div className="w-full h-[3rem] flex items-center gap-[1rem] border-b border-black">
          <div className="w-fit h-fit flex items-center text-white text-basic">
            <button
              type="button"
              onClick={allClick}
              className={all ? "border-gray-500 border-b-2" : ""}
            >
              All
            </button>
          </div>
          <div className="w-fit h-fit flex items-center text-white text-basic">
            <button
              type="button"
              onClick={usersClick}
              className={users ? "border-gray-500 border-b-2" : ""}
            >
              Users
            </button>
          </div>
          <div className="w-fit h-fit flex items-center text-white text-basic">
            <button
              type="button"
              onClick={channelsClick}
              className={channels ? "border-gray-500 border-b-2" : ""}
            >
              Channels
            </button>
          </div>
        </div>
        <div className="w-full h-full mt-[1rem]">
          {all && <AllField usersData={usesrData} />}
          {users && <UsersField usersData={usesrData} />}
          {channels && <ChannelsField />}
        </div>
      </div>
    </div>
  );
}

export default SearchMenu;