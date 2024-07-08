import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";
// import Chatbot from "./ChatBotAI";

const Sidebar = () => {
  return (
    <div className="border-r sm:min-w-[220px] md:min-w-[250px] border-slate-500 p-4 flex flex-col">
      {/* <div className="border-r border-slate-500 p-4 flex flex-col"> */}
      <SearchInput />
      <div className="divider px-3"></div>
      {/* <Chatbot /> */}
      <Conversations />
      <LogoutButton />
    </div>
  );
};
export default Sidebar;
