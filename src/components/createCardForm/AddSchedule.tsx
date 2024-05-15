import { Divider, Stack, Switch, Typography } from "@mui/material";
import { TimeField } from "@mui/x-date-pickers";
import moment from "moment";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateForm } from "../../store/business-form/business-form-slice";

const AddSchedule = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.businessForm);

  //  sun: "T-9:00-5:00-AM",
  // day:"isActive-start-end-AM/PM"
  useEffect(() => {}, []);

  const Days: { [key: string]: string } = {
    mon: "Monday",
    tue: "Tuesday",
    wed: "Wednesday",
    thu: "Thursday",
    fri: "Friday",
    sat: "Saturday",
    sun: "Sunday",
  };

  function convertTimeToISOString(timeString: string) {
    // Parse the time string

    const [time, period] = timeString.split(" "); // Split time and period (AM/PM)
    const [hours, minutes] = time.split(":"); // Split hours and minutes

    // Convert hours to 24-hour format if necessary
    const hours24 =
      period === "AM"
        ? hours === "12"
          ? "00"
          : hours
        : (parseInt(hours, 10) + 12).toString().padStart(2, "0");

    // Construct ISO date string
    const dateString = `Tue May 14 2024 ${hours24}:${minutes}:00 GMT+0530`;

    return dateString;
  }

  function updateTime(day: string, time: string, type: "start" | "end") {
    const [isActive, start, end] = JSON.parse(form.calender)[day].split("-");
    dispatch(
      updateForm({
        calender: JSON.stringify({
          ...JSON.parse(form.calender),
          [day]: `${isActive}-${type === "start" ? time : start}-${
            type == "end" ? time : end
          }`,
        }),
      })
    );
  }

  function toggleIsActive(day: string) {
    const [isActive, start, end] = JSON.parse(form.calender)[day].split("-");
    dispatch(
      updateForm({
        calender: JSON.stringify({
          ...JSON.parse(form.calender),
          [day]: `${isActive === "T" ? "F" : "T"}-${start}-${end}`,
        }),
      })
    );
  }
  console.log(JSON.parse(form.calender)["mon"].split("-")[0]);
  return (
    <Stack spacing={1.5} divider={<Divider />}>
      {Object.keys(JSON.parse(form.calender)).map((d) => {
        return (
          <Stack
            key={d}
            direction="row"
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Stack width={150}>
              <Typography variant="body1" fontWeight={600}>
                {Days[d]}
              </Typography>
            </Stack>

            <Stack direction="row" spacing={2}>
              <Switch
                onChange={() => toggleIsActive(d)}
                checked={JSON.parse(form.calender)[d].split("-")[0] === "T"}
              />
              <TimeField
                size="small"
                label="Start Time"
                value={moment(
                  convertTimeToISOString(
                    JSON.parse(form.calender)[d].split("-")[1]
                  )
                )}
                disabled={JSON.parse(form.calender)[d].split("-")[0] === "F"}
                onChange={(newValue) => {
                  updateTime(d, newValue?.format("hh:mm A") as string, "start");
                }}
              />
              <TimeField
                size="small"
                label="End Time"
                disabled={JSON.parse(form.calender)[d].split("-")[0] === "F"}
                value={moment(
                  convertTimeToISOString(
                    JSON.parse(form.calender)[d].split("-")[2]
                  )
                )}
                onChange={(newValue) =>
                  updateTime(d, newValue?.format("hh:mm A") as string, "end")
                }
              />
            </Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default AddSchedule;
