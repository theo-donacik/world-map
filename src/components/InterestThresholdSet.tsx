import { useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { apiGetInterest, apiSetInterest } from "../dao/interest";
import { InterestResponse } from "../util/types";

export default function InterestThresholdSet() {
  const [interestNum, setInterestNum] = useState<number>(1)
  const [saveState, setSaveState] = useState<number>(0)

  useEffect(() => {
      apiGetInterest()
      .then((resp: InterestResponse) => {
          setInterestNum(resp.interestNum)
        })
        .catch(() => {
          alert("Failed to get interest state")
        });
  }, [])

  function saveInterestNum() {
    if(interestNum <= 0) {
      setSaveState(1)
      setTimeout(() => setSaveState(0), 3000)
    }
    else {
      apiSetInterest(interestNum)
      .then((resp: InterestResponse) => {
          setSaveState(2)
          setTimeout(() => setSaveState(0), 3000)
        })
        .catch(() => {
          alert("Failed to set interest state")
        });
    }

  }

  return (
    <div>
      <div style={{padding: 10}}>
        Set Interest Threshold
      </div>
      <Stack direction="horizontal" gap={3}>
        <Form.Control
          placeholder="Intrest Threshold Number"
          type="number"
          min="1"
          value={interestNum}
          onChange={(e) => setInterestNum((Number)(e.target.value) ?? 1)}
        />
        <button
          className={'btn btn-primary ' + (saveState === 0 ? "" : saveState === 1 ? "failure" : "success")}
          onClick={saveInterestNum}
        >
          {saveState === 0 ? "Save" : saveState === 1 ? "Threshold must be >0" : "Saved!"}
        </button>
      </Stack>
    </div>
  )
}