import { useState } from "react";
import useLogOut from "../../hooks/useLogOut";
import useAuth from "../../hooks/useAuth";

import { Link } from "react-router-dom";
import OutsideAlerter from "../OutsideAlerter";
import Button from "../atoms/Button";

const UserPanel = () => {
  const { auth } = useAuth();
  const logOut = useLogOut();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <OutsideAlerter
      action={() => {
        setIsOpen(false);
      }}
      className="w-9 h-9 p-[2px] flex items-center justify-center rounded-full border border-gray-600 relative"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full h-full rounded-full overflow-hidden"
      >
        <img
          className="w-full h-full object-cover"
          src={`https://avatars.dicebear.com/api/adventurer-neutral/${auth?.user?.username}.svg`}
          alt="avatar"
        />
      </button>
      {isOpen && (
        <div className="flex flex-col gap-4 w-40 p-4 absolute top-full right-0 mt-2 bg-white shadow-lg">
          <h5>Hi, {auth?.user?.username}</h5>
          <ul className="flex flex-col gap-2">
            <li>
              <Link
                className="font-medium text-gray-600 hover:text-gray-900"
                to="/profile"
              >
                profile
              </Link>
            </li>
            <li>
              <Link
                className="font-medium text-gray-600 hover:text-gray-900"
                to="/settings"
              >
                settings
              </Link>
            </li>
            <li className="">
              <Button onClick={async () => await logOut()} className="h-8">
                logout
              </Button>
            </li>
          </ul>
        </div>
      )}
    </OutsideAlerter>
  );
};

export default UserPanel;
