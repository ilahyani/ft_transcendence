import Avatar from "./Avatar";
import Challenge from "./Challenge";
import { style } from "./Friends.styles";
import Message from "./Message";

const Friends = () => {
  return (
    <div className={style.wrapper}>
      <Avatar
        src="https://images.unsplash.com/photo-1621478374422-35206faeddfb?q=80&w=3570&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        userName="User 1"
      />
      <Challenge />
      <Message />
    </div>
  );
};

export default Friends;
