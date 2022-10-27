import { useEffect } from "react";
import useStore, { useAuth } from "../hooks/useStore";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// UI Components
import { Link } from "react-router-dom";
import Button from "../components/Button";

export default function Home() {
  const axiosPrivate = useAxiosPrivate();
  const auth = useAuth();
  const store = useStore();

  useEffect(() => {
    console.log(auth);
    console.log("Store: ", store);
  }, [auth]);

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const getUser = async () => {
  //     try {
  //       const response = await axiosPrivate.get("/api/users");
  //       // console.log(response.data);
  //       if (response.data.status === 200) {
  //         setAuth((prev) => {
  //           return { ...prev, user: response?.data?.user };
  //         });
  //       }
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   isMounted && getUser();

  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);

  return (
    <>
      <div className="flex items-center gap-6">
        <div className="w-32 h-32">
          <img
            className="w-full h-full object-cover"
            src={`https://avatars.dicebear.com/api/adventurer-neutral/${auth.user.username}.svg`}
            alt="avatar"
          />
        </div>
        <div>id: {auth.user.id}</div>
        <div>username: {auth.user.username}!</div>
        <div>email: {auth.user.email}</div>
        <div>isAdmin: {JSON.stringify(auth.user.isAdmin)}</div>
      </div>
      <div>DEV: {JSON.stringify(import.meta.env.DEV)}</div>
      <div>
        <h1>Pets:</h1>
        <div className="flex gap-8 flex-wrap">
          {auth.user.pets?.map((pet) => {
            return (
              <div key={pet.id} className="border-4 border-blue-400 p-2">
                <div className="w-16 h-16">
                  <img
                    className="w-full h-full object-cover"
                    src={`https://avatars.dicebear.com/api/initials/${pet.name}.svg?backgroundColors[]=blue&backgroundColors[]=brown&backgroundColors[]=green&backgroundColors[]=pink&backgroundColorLevel=400`}
                    alt="avatar"
                  />
                </div>
                <p className="text-red-600">id: {pet.id}</p>
                <p>name: {pet.name}</p>
                <p>gender: {pet.gender}</p>
                <p>birthday: {pet.birthday}</p>
                <p>weight: {pet.weight}</p>
                <p>ownerId: {pet.ownerId}</p>
                <p>speciesId: {pet.speciesId}</p>
              </div>
            );
          })}
        </div>
      </div>
      <div>
        <h1>Reminders:</h1>
        <div className="flex gap-8 flex-wrap">
          {auth.user.reminders?.map((reminder) => {
            return (
              <div key={reminder.id} className="border-4 border-gray-700 p-2">
                <p>id: {reminder.id}</p>
                <p>name: {reminder.name}</p>
                <p>upcoming: {reminder.upcoming}</p>
                <p>
                  interval: {reminder.intervalValue} {reminder.intervalType}(s)
                </p>
                <p className="text-red-600">petId: {reminder.petId}</p>
                <p>userId: {reminder.userId}</p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
