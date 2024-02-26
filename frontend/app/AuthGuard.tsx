import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useAuth } from "./context/AuthContext";
import { useChat } from "./context/ChatContext";

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    // Check authentication state
    const {
      fetchFriendsReqData,
      fetchFriendsData,
      getUserInfo,
      state: { isAuthenticated },
      fetchData,
    } = useAuth();
    const { getAllChats } = useChat();
    useEffect(() => {
      const jwt_token = Cookies.get("JWT_TOKEN");
      // Redirect to login page if user is not authenticated
      if (jwt_token) {
        fetchData().then(() => {
          fetchFriendsReqData().then(() => {
            fetchFriendsData().then(() => {
              getAllChats().then(() => {
                if (window.location.pathname === "/profile")
                  router.push("/profile");
                if (window.location.pathname === "/game") router.push("/game");
                if (window.location.pathname === "/chat") router.push("/chat");
              });
            });
          });
        });
        // router.push("/profile");
      } else if (!isAuthenticated) {
        router.push("/auth/login");
      }
    }, [isAuthenticated, router]);

    // Render the wrapped component if authenticated
    return isAuthenticated ? <WrappedComponent {...props} /> : null;
  };

  return Wrapper;
};

export default withAuth;
