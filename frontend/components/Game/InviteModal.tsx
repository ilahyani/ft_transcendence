import { useRouter } from "next/navigation";
import Image from "next/image";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const InviteModal = ({ loading }: any) => {
    const [friends, setFriends] = useState([]);
    const [text, setText] = useState("Challenge");
    const router = useRouter();
    const initailText: string = "Challenge";

    const handleSendInvite = (friend: any) => {
        axios.post("http://localhost:3000/notifications/createNotification", {
            sender: Cookies.get("USER_ID"),
            receiver: friend._id,
            type: "challenge",
            message: `You have been challenged by ${Cookies.get("USER_ID")}`,
        },
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
            }
        )
            .then((res) => {
                console.log(res.data);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const ChangeTextandSendRequest = (friend: any) => {
        // handleSendInvite(friend);
        changeText(`waiting for ${friend.username} to accept challenge`);
    }


    useEffect(() => {
        if (text != initailText)
            setTimeout(() => {
                setText(initailText);
            }, 60000); /// the opponent has 1 minute to accept the challenge
    }, [text]);


    const changeText = (text: string) => setText(text);
    // if (!loading) return;
    useEffect(() => {
        if (!loading) return;
        const fetchData = () => {
            axios
                .get("http://localhost:3000/user/profile", {
                    withCredentials: true,
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json",
                    },
                })
                .then((res) => {
                    setFriends(res.data.friends);
                    // console.log(res.data.friends);
                })
                .catch((error) => {
                    console.log(error);
                });
        };
        fetchData();
    }, [loading]);
    return (
        <>
            <div className="h-screen fixed inset-0 backdrop-blur-sm bg-black/60 flex justify-center items-center z-30">
                <div className="max-h-1/2 w-1/2 rounded-lg bg-background z-60 ">
                    <svg
                        onClick={() => router.push("/game")}
                        className="cursor-pointer float-right mr-4 mt-4"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M3 3L21 21M3 21L21 3"
                            stroke="white"
                            strokeWidth="4.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <div className="flex-col justify-center items-center text-center mt-10">
                        <h1 className="text-text font-bold text-2xl not-italic font-sans mb-5 mt-2">
                            Who do you want to challenge ?
                        </h1>
                        <div className="flex-col  items-center text-center border-solid border-2 rounded-xl border-textSecondary m-10 p-5">
                            {friends.map((friend: any, index: any) => (
                                <ul key={index} className="flex justify-between items-center ">
                                    <figure className="flex items-center text-center gap-5">
                                        <Image
                                            src="/img/avatar.png"
                                            width={55}
                                            height={55}
                                            alt="Friend's picture"
                                        />
                                        <figcaption className="text-text ">
                                            {friend.username}
                                        </figcaption>
                                    </figure>
                                    <button
                                        onClick={() => ChangeTextandSendRequest(friend)}
                                        className="border-solid border-2 border-textSecondary rounded-3xl pr-5 pl-5 pt-2 pb-2 text-text text-center">
                                        {text}
                                    </button>
                                </ul>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default InviteModal;