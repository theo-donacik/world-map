import { useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { apiGetTimer, apiSetTimer } from "../dao/timer";
import { TimerResponse } from "../util/types";

export default function SetTimer() {
  const [startDate, setStartDate] = useState(new Date());
  const [timerUpdated, setTimerUpdated] = useState(false);

  useEffect(() => {
    apiGetTimer()
    .then((resp: TimerResponse) => {
      setStartDate(new Date(resp.timer))
    })
    .catch(() => {
      alert("Failed fetch timer")
    });
  }, []);

  function setTime() {
    apiSetTimer(startDate)
    .then((resp: TimerResponse) => {
      setTimerUpdated(true)
      setTimeout(() => setTimerUpdated(false), 5000)
    })
    .catch(() => {
      alert("Failed to set timer")
    });
  }


  return (
    <Stack gap={3}>
      <Form.Label>Set Countdown Timer</Form.Label>
      <DatePicker
        showTimeSelect
        selected={startDate}
        onChange={(date: Date | null) => date && setStartDate(date)}
        minDate={new Date()}          
        maxDate={new Date("3000-01-01T00:00:00+00:00")}
      />
      <button onClick={setTime} className={timerUpdated ? "updated-time-btn" : "time-btn"}>{timerUpdated ? "Time Updated" : "Set Time"}</button>
    </Stack>
  )
}