import { useAuthContext } from "../../context/AuthContext";
import { extractTime } from "../../utils/extractTime";
import useConversation from "../../zustand/useConversation";

const Message = ({ message }) => {
  const { authUser } = useAuthContext();
  const { selectedConversation } = useConversation();

  //   below one will bw either true or false
  // console.log(authUser.user._id);
  // console.log(message.senderId);
  const fromMe = message.senderId === authUser.user._id;
  const formattedTime = extractTime(message.createdAt);

  // chatEnd  --> if we sent the message, chatStart --> other person sent a message to us
  const chatClassName = fromMe ? "chat-end" : "chat-start";

  //   if message is from us then show our profile pic else show both profile pic
  const profilePhoto = fromMe
    ? authUser.user.profilePhoto
    : selectedConversation?.profilePhoto;

  // if message is from us then make bg color blue
  const bubbleBgColor = fromMe ? "bg-blue-500" : "";

  // whenever a message is received then it appears to be shaking initially to the receiver
  const shakeClass = message.shouldShake ? "shake" : "";

  return (
    <div className={`chat ${chatClassName}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS chat bubble component"
            src={`/img/${profilePhoto}`}
          />
        </div>
      </div>
      <div
        // the bg color of our background
        className={`chat-bubble text-white ${bubbleBgColor} ${shakeClass} pb-2`}
      >
        {message.message}
      </div>
      <div className="chat-footer opacity-50 text-xs flex gap-1 items-center">
        {formattedTime}
      </div>
    </div>
  );
};
export default Message;
