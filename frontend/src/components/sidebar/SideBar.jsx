import React from "react";

const SideBar = () => {
  return (
    <div>
      {/* <div className="border-r border-slate-500 p-4 flex flex-col"> */}
      <SearchInput />
      <div className="divider px-3"></div>
      {/* <Conversations />
      <LogoutButton /> */}
    </div>
  );
};

export default SideBar;
