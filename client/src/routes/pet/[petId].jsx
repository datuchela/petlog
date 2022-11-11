import { useNavigate, useParams } from "react-router-dom";

//Custom Hooks
import usePet from "../../hooks/usePet";
import useReminder from "../../hooks/useReminder";

//UI Components
import Link from "../../components/atoms/Link";
import Button from "../../components/atoms/Button";

const PetPage = () => {
  const { petId } = useParams();

  // usePet hooks
  const { getPet, deletePet } = usePet();
  const { isLoading, isError, error, data } = getPet(petId);
  const { mutate, isSuccess } = deletePet();

  // useReminder hooks
  const { deleteReminder } = useReminder();
  const { mutate: deleteReminderMutate, isLoading: isDeleteReminderLoading } =
    deleteReminder();

  const navigate = useNavigate();

  const handleDeletePet = async () => {
    mutate(petId);
    return navigate("/", { replace: true });
  };

  const handleDeleteReminder = async (reminderId) => {
    deleteReminderMutate(reminderId);
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>{error?.message}</div>
      ) : (
        <div className="flex flex-col gap-6">
          <div>
            <div>id: {data.pet.id}</div>
            <div>name: {data.pet.name}</div>
            <div>birthday: {data.pet.birthday}</div>
            <div>gender: {data.pet.gender}</div>
            <div>speciesId: {data.pet.speciesId}</div>
            <div>ownerId: {data.pet.ownerId}</div>
          </div>
          <div>
            <h2>Reminders:</h2>
            {data.pet.reminders?.map((reminder) => (
              <div key={reminder.id} className="flex items-center gap-2">
                <div>{reminder.name}</div>
                <div className="text-red-500">{reminder.upcoming}</div>
                <button
                  className="font-medium text-gray-900"
                  onClick={() => handleDeleteReminder(reminder.id)}
                >
                  delete reminder
                </button>
              </div>
            ))}
          </div>
          <Button onClick={handleDeletePet}>Delete Pet</Button>
        </div>
      )}
    </div>
  );
};

export default PetPage;
