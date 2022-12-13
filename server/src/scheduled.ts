import { prisma } from "./prisma";

const currentDateInMilliseconds = new Date().getTime();

// for reminders/dates lookup
const currentDate = new Date(currentDateInMilliseconds);
const currentDateString = currentDate.toISOString().split("T")[0];

const millisecondsInDay = 1000 * 60 * 60 * 24;

// Finds if dates has current day, returns Reminders of that day, otherwise quits.
const getReminders = async () => {
  try {
    const date = await prisma.date.findUnique({
      where: {
        date: currentDateString,
      },
      include: {
        reminders: true,
      },
    });
    if (!date) {
      console.log("no dates");
      process.exit(0);
    }
    return date;
  } catch (error) {
    console.error(error);
    return error;
  }
};

const intervalTypes = [
  {
    name: "day",
    unit: millisecondsInDay,
  },
  {
    name: "week",
    unit: millisecondsInDay * 7,
  },
  {
    name: "month",
    unit: millisecondsInDay * 30,
  },
  {
    name: "year",
    unit: millisecondsInDay * 365,
  },
];

const convertToMilliseconds = (intervalType, intervalValue) => {
  const nextValue = intervalValue * intervalTypes[intervalType].unit;
  return nextValue;
};

const calculateUpcoming = (intervalType, intervalValue) => {
  const interval = convertToMilliseconds(intervalType, intervalValue);
  const nextDateInMilliseconds = currentDateInMilliseconds + interval;
  const dateAfter = new Date(nextDateInMilliseconds).toISOString().split("T")[0];
  return dateAfter;
};

const updateReminders = async () => {
  let remindersClone;
  const { date, reminders } = await getReminders();
  console.log("date: ", date);
  remindersClone = [...reminders];

  remindersClone?.forEach(async (reminder) => {
    const newDate = calculateUpcoming(reminder.intervalType, reminder.intervalValue);
    try {
      await prisma.date.upsert({
        where: {
          date: newDate,
        },
        update: {
          date: newDate,
        },
        create: {
          date: newDate,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
    try {
      await prisma.reminder.update({
        where: {
          id: reminder.id,
        },
        data: {
          upcoming: newDate,
        },
      });
    } catch (error) {
      console.error(error);
      return error;
    }
  });
};

const main = async () => {
  await updateReminders();
};

main();
