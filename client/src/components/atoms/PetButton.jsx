import { Link } from "react-router-dom";

const PetButton = ({ pet }) => {
  return (
    <Link
      to={`/pet/${pet.id}`}
      className="flex items-center gap-2 w-full px-4 py-2 rounded-lg hover:bg-[#F7F7F7]"
    >
      <div className="w-6 h-6 rounded-full overflow-hidden">
        <img
          className="w-full h-full object-cover"
          src={`https://avatars.dicebear.com/api/initials/${pet.name}.svg`}
          alt=""
        />
      </div>
      <span className="text-sm">{pet.name}</span>
    </Link>
  );
};

export default PetButton;
