import { useEffect, useState } from "react";
import { Stack } from "react-bootstrap";
import { apiGetAllTextChannels, apiGetUpdateChannel, apiSetUpdatesChannel } from "../../dao/discord";
import { AllChannelsResponse, ChannelResponse, DcChannel } from "../../util/types";
import ChannelPicker from "./ChannelPicker";

export default function UpdateChannelSet() {
  const [saveState, setSaveState] = useState<number>(0)
  const [channels, setChannels] = useState<DcChannel[]>([])
  const [currentChannel, setCurrentChannel] = useState<DcChannel>()

  useEffect(() => {
    apiGetAllTextChannels()
    .then((resp: AllChannelsResponse) => {
      setChannels(resp.channels)
    })
    .catch(() => {
      alert("Failed fetch channels")
    });
  }, []);

  useEffect(() => {
    apiGetUpdateChannel()
    .then((resp: ChannelResponse) => {
      setCurrentChannel(resp.channel)
    })
    .catch(() => {
      alert("Failed fetch current channel")
    });
  }, []);

  function saveChannel() {        
    if(!currentChannel) {
      setSaveState(1)
      setTimeout(() => setSaveState(0), 3000)
    }
    else {
      apiSetUpdatesChannel(currentChannel)
        .then((resp: ChannelResponse) => {
          setSaveState(2)
          setTimeout(() => setSaveState(0), 3000)
        })
        .catch(() => {
          alert("Failed to set channel")
        });
    }

  }

  return (
    <div>
      <div>
        Set Update Channel
      </div>
      <Stack direction="horizontal" gap={3}>
        <ChannelPicker 
          currentChannel={currentChannel}
          setCurrentChannel={setCurrentChannel}
          channels={channels}
        />
        <button
          className={'btn btn-primary ' + (saveState === 0 ? "" : saveState === 1 ? "failure" : "success")}
          onClick={saveChannel}
        >
          {saveState === 0 ? "Save" : saveState === 1 ? "Missing Channel" : "Saved!"}
        </button>
      </Stack>
    </div>
  )
}