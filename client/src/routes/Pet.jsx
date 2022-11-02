import { useState } from "react";
import { useCurrentPet } from "../hooks/useStore";

// react-query stuff
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getPets, deletePet } from "../api/methods";

// UI Components
import { Link, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useEffect } from "react";

export default function Pet() {
  const { petId } = useParams();
  const { currentPetId, setCurrentPetId } = useCurrentPet();
  const [currentPet, setCurrentPet] = useState();
  const { isLoading, isError, error, data } = useQuery("pets", getPets);

  useEffect(() => {
    if (isLoading || isError) {
      return () => console.log("unmounted, still loading...");
    }
    console.log(data);
    console.log("currentPetId: ", currentPetId);
    const currPet = data.pets?.filter((pet) => pet.id == currentPetId)[0];
    setCurrentPet(currPet);
    console.log(currPet);
  }, [isLoading, currentPetId]);

  return (
    <>
      <div className="flex flex-col gap-8">
        {/* CARD */}
        <div className="flex gap-16">
          <div className="w-[176px] h-[176px] overflow-hidden rounded-lg border bg-pink-200">
            <img
              className="block w-full h-full object-cover"
              src={`https://avatars.dicebear.com/api/initials/${currentPet?.name}.svg?backgroundColors[]=blue&backgroundColors[]=brown&backgroundColors[]=green&backgroundColors[]=pink&backgroundColorLevel=400`}
              alt="hello"
            />
          </div>
          <div className="flex flex-col gap-8">
            <div className="flex gap-1">
              <h2 className="text-4xl text-gray-900">{currentPet?.name}</h2>
              <h2 className="text-4xl text-gray-500">#{currentPet?.id}</h2>
            </div>
            <div className="flex gap-8">
              <div>
                <div>
                  <span className="text-gray-600">speciesId: </span>
                  <span>{currentPet?.speciesId}</span>
                </div>
                <div>
                  <span className="text-gray-600">gender: </span>
                  <span>{currentPet?.gender}</span>
                </div>
                <div>
                  <span className="text-gray-600">weight: </span>
                  <span>{currentPet?.weight}kg</span>
                </div>
              </div>
              <div>
                <div>
                  <span className="text-gray-600">ownerId: </span>
                  <span>{currentPet?.ownerId}</span>
                </div>
                <div>
                  <span className="text-gray-600">birthday: </span>
                  <span>{currentPet?.birthday}</span>
                </div>
                {/* <Button onClick={handleDeletePet}>Delete Pet</Button> */}
              </div>
            </div>
          </div>
        </div>
        {/* END OF CARD */}
      </div>
      <div>{JSON.stringify(currentPet)}</div>
    </>
  );
}
