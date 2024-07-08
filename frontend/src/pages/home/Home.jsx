import MessageContainer from "../../components/messages/MessageContainer";
import Sidebar from "../../components/sidebar/Sidebar";

const Home = () => {
  return (
    // <div className="flex sm:max-w-[640px] sm:h-[430px] md:max-w-[768px] md:h-[540px] lg:max-w-[1024px] xl:max-w[1280px] 2xl:max-w-[1536px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
    <div className="flex sm:h-[310px] md:h-[350px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <Sidebar />
      <MessageContainer />
    </div>
  );
};
export default Home;
