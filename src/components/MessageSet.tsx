import { useEffect, useState } from "react";
import { Form, Stack } from "react-bootstrap";
import { apiGetMessage, apiSetMessage } from "../dao/alertMessage";
import { apiGetAllChannels, apiGetChannel, apiSetChannel } from "../dao/discord";
import { AllChannelsResponse, ChannelResponse, DcChannel, MessageResponse } from "../util/types";
import ChannelPicker from "./ChannelPicker";

export default function MessageSet() {
  const [message, setMessage] = useState<string>("")
  const [saveState, setSaveState] = useState<number>(0)
  const [channels, setChannels] = useState<DcChannel[]>([])
  const [currentChannel, setCurrentChannel] = useState<DcChannel>()

  useEffect(() => {
    apiGetAllChannels()
    .then((resp: AllChannelsResponse) => {
      setChannels(resp.channels)
    })
    .catch(() => {
      alert("Failed fetch channels")
    });
  }, []);

  useEffect(() => {
    apiGetChannel()
    .then((resp: ChannelResponse) => {
      setCurrentChannel(resp.channel)
    })
    .catch(() => {
      alert("Failed fetch current channel")
    });
  }, []);


  useEffect(() => {
      apiGetMessage()
      .then((resp: MessageResponse) => {
          setMessage(resp.alertMessage)
        })
        .catch(() => {
          alert("Failed to get message")
        });
  }, [])

  function saveMessage() {        
    if(message === "" || !currentChannel) {
      setSaveState(1)
      setTimeout(() => setSaveState(0), 3000)
    }
    else {
      apiSetMessage(message)
      .then((resp: MessageResponse) => {
          setSaveState(2)
          setTimeout(() => setSaveState(0), 3000)
        })
        .catch(() => {
          alert("Failed to set message")
        });

      apiSetChannel(currentChannel)
        .then((resp: ChannelResponse) => {
          console.log("Set channel!")
        })
        .catch(() => {
          alert("Failed to set timer")
        });
    }

  }

  return (
    <div>
      <div>
        Set Message / Channel
      </div>
      <h5>
        Use [name] and [link] to format message 
      </h5>
      <Stack direction="horizontal" gap={3}>
        <ChannelPicker 
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
          channels={channels}
        />
        <Form.Control
          placeholder="Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className={'btn btn-primary ' + (saveState === 0 ? "" : saveState === 1 ? "failure" : "success")}
          onClick={saveMessage}
        >
          {saveState === 0 ? "Save" : saveState === 1 ? "Message cannot be blank" : "Saved!"}
        </button>
      </Stack>
    </div>
  )
}