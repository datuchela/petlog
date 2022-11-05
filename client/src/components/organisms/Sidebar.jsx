import { Link } from "react-router-dom";
import PetList from "../molecules/PetList";

const Sidebar = () => {
  return (
    <aside className="flex-[1] px-2 py-10 bg-[#fbfbfb] sticky z-10 top-[104px]">
      <PetList />
    </aside>
  );
};

export default Sidebar;
