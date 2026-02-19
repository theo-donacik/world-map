import { useEffect, useState } from "react";
import { Dropdown, Form } from "react-bootstrap";
import { apiGetAllChannels, apiGetChannel, apiSetChannel } from "../dao/discord";
import { AllChannelsResponse, ChannelResponse, DcChannel } from "../util/types";

export default function ChannelPicker() {
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

  function onChangeChannel(eventKey: string | null) {
    if(eventKey) {
      const channel = channels.find(c => c.id === eventKey)
      if(channel) {
        setCurrentChannel(channel)

        apiSetChannel(channel)
        .then((resp: ChannelResponse) => {
          console.log("Set channel!")
        })
        .catch(() => {
          alert("Failed to set timer")
        });
        }
    }
  }

  return (
    <div>
      <Form.Label>Set Notification Channel</Form.Label>
      <Dropdown onSelect={onChangeChannel}>
        <Dropdown.Toggle variant="success" id="dropdown-basic">
          {currentChannel ? currentChannel.name : "Select a Channel"}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {channels.map((channel: DcChannel) => (
            <Dropdown.Item eventKey={channel.id} >{channel.name}</Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  )
}