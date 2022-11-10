import { useQueryClient, useMutation } from "react-query";

import {
  getReminders as getRemindersMethod,
  getReminder as getReminderMethod,
  addReminder as addReminderMethod,
  deleteReminder as deleteReminderMethod,
} from "../api/methods";

const useReminder = () => {
  const getReminders = () => {
    const query = useQuery("reminders", getRemindersMethod);
    return query;
  };

  const getReminder = (reminderId) => {
    const query = useQuery(["reminder", reminderId], () =>
      getReminderMethod(reminderId)
    );
    return query;
  };

  const addReminder = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(addReminderMethod, {
      onSuccess: (data) => {
        queryClient.invalidateQueries("reminders");
        return data;
      },
    });
    return mutation;
  };

  const deleteReminder = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(deleteReminderMethod, {
      onSuccess: (data) => {
        queryClient.invalidateQueries(["pet"]); // should be replaced by "reminders"
        return data;
      },
    });
    return mutation;
  };

  return { getReminders, getReminder, addReminder, deleteReminder };
};

export default useReminder;
