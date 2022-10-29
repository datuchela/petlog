import { useEffect, useState } from "react";
import useStore, { useAuth, useCurrentPet, usePets } from "../hooks/useStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Pet() {
  const axiosPrivate = useAxiosPrivate();
  const store = useStore((state) => state);
  const { auth } = useAuth();
  const { pets, setPets } = usePets();
  const { currentPetId, setCurrentPetId } = useCurrentPet();
  const [tempPet, setTempPet] = useState();

  const handleDeleteReminder = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.delete(
        `/api/reminders/${e.target.id}`
      );
      console.log(response.status);
      if (response.status === 204) {
        const newRemindersList = tempPet?.reminders?.filter(
          (reminder) => reminder.id !== parseInt(e.target.id)
        );
        return setTempPet((prev) => {
          return { ...prev, reminders: newRemindersList };
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeletePet = async (e) => {
    e.preventDefault();
    try {
      const response = await axiosPrivate.delete(`/api/pets/${currentPetId}`);
      console.log(response.status);
      if (response.status === 204) {
        localStorage.removeItem("currentPetId");
        const newPetsList = pets?.filter(
          (pet) => pet.id !== parseInt(currentPetId)
        );
        const newPetsResponse = await axiosPrivate.get("/api/pets/");
        if (newPetsResponse.data.status === 200) {
          setPets(newPetsResponse.data.pets);
        }
        return setCurrentPetId(newPetsList[0]?.id);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getPets = async () => {
      try {
        const response = await axiosPrivate.get("/api/pets/");
        console.log("pet(s) data: ", response.data);
        if (response.data.status === 200) {
          setPets(response.data.pets);
        }
      } catch (err) {
        console.error(err);
      }
    };

    isMounted && getPets();

    return () => {
      console.log("unmounted getPet(s)");
      isMounted = false;
      controller.abort();
    };
  }, []);

  //

  useEffect(() => {
    if (!pets[0]) {
      return () => {
        console.log("unmounted getPet, no pet to fetch");
      };
    }
    let isMounted = true;
    const controller = new AbortController();

    const getPet = async () => {
      try {
        const response = await axiosPrivate.get(`/api/pets/${currentPetId}`);
        console.log("pet data: ", response.data);
        if (response.data.status === 200) {
          setTempPet(response.data.pet);
        }
      } catch (err) {
        console.error(err);
        localStorage.setItem("currentPetId", pets[0]?.id);
        setCurrentPetId(pets[0]?.id);
      }
    };

    pets[0] ? isMounted && getPet() : console.log("no pets");

    return () => {
      console.log("unmounted getPet");
      isMounted = false;
      controller.abort();
    };
  }, [currentPetId, pets]);

  // useEffect(() => {
  //   console.log("auth: ", auth);
  // }, [auth]);

  // useEffect(() => {
  //   console.log("pets: ", pets);
  // }, [pets]);

  useEffect(() => {
    console.log("store: ", store);
  }, [store]);

  if (!pets[0]) {
    return <div>You don't have any pets aaaugh</div>;
  }

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* CARD */}
        <div className="flex gap-16">
          <div className="w-[176px] h-[176px] overflow-hidden rounded-lg border bg-pink-200">
            <img
              className="block w-full h-full object-cover"
              src={`https://avatars.dicebear.com/api/initials/${tempPet?.name}.svg?backgroundColors[]=blue&backgroundColors[]=brown&backgroundColors[]=green&backgroundColors[]=pink&backgroundColorLevel=400`}
              alt="hello"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-1">
              <h2 className="text-4xl text-gray-900">{tempPet?.name}</h2>
              <h2 className="text-4xl text-gray-500">#{tempPet?.id}</h2>
            </div>
            <div className="flex gap-8">
              <div>
                <div>
                  <span className="text-gray-600">speciesId: </span>
                  <span>{tempPet?.speciesId}</span>
                </div>
                <div>
                  <span className="text-gray-600">gender: </span>
                  <span>{tempPet?.gender}</span>
                </div>
                <div>
                  <span className="text-gray-600">weight: </span>
                  <span>{tempPet?.weight}kg</span>
                </div>
              </div>
              <div>
                <div>
                  <span className="text-gray-600">ownerId: </span>
                  <span>{tempPet?.ownerId}</span>
                </div>
                <div>
                  <span className="text-gray-600">birthday: </span>
                  <span>{tempPet?.birthday}</span>
                </div>
                <Button onClick={handleDeletePet}>Delete pet</Button>
              </div>
            </div>
          </div>
        </div>
        {/* END OF CARD */}
        <div>
          {tempPet?.reminders?.map((reminder) => {
            return (
              <div
                key={reminder.id}
                className="p-4 border bg-pink-200 flex items-center justify-between"
              >
                {reminder.name} # {reminder.id}
                <Button
                  className="max-w-[96px]"
                  id={reminder.id}
                  onClick={handleDeleteReminder}
                >
                  delete
                </Button>
              </div>
            );
          })}
        </div>
      </div>
      <div>{JSON.stringify(tempPet)}</div>
    </>
  );
}
