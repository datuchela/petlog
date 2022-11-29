import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

//Custom Hooks
import usePet from "../../hooks/usePet";
import useReminder from "../../hooks/useReminder";

//UI Components
import Link from "../../components/atoms/Link";
import Button from "../../components/atoms/Button";
import { ReminderType } from "../../api/methods/reminder";

const PetPage = () => {
  const { petId } = useParams();
  const parsedPetId = parseInt(petId!);
  const navigate = useNavigate();

  // usePet hooks
  const { getPet, deletePet } = usePet();
  const { isLoading, isError, error, data } = getPet(parsedPetId);
  const { mutate, isLoading: isDeleteLoading, isSuccess } = deletePet();

  // useReminder hooks
  const { deleteReminder } = useReminder();
  const { mutate: deleteReminderMutate, isLoading: isDeleteReminderLoading } = deleteReminder();

  // Navigates on main page after success
  useEffect(() => {
    if (!isSuccess) return;
    return navigate("/", { replace: true });
  }, [isSuccess]);

  const handleDeletePet = async () => {
    mutate(parsedPetId);
  };

  const handleDeleteReminder = async (reminderId: number) => {
    deleteReminderMutate(reminderId);
  };

  return (
    <div className="flex flex-col gap-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>Something went wrong</div>
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
            {data.pet.reminders?.map((reminder: ReminderType) => (
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
          <Button disabled={isDeleteLoading} onClick={handleDeletePet}>
            Delete Pet
          </Button>
        </div>
      )}
    </div>
  );
};

export default PetPage;
