import { Dropdown } from "react-bootstrap";
import { DcChannel } from "../../util/types";

export default function ChannelPicker({currentChannel, setCurrentChannel, channels} : {currentChannel: DcChannel | undefined, setCurrentChannel: ((c: DcChannel) => void), channels: DcChannel[]}) {

  function onChangeChannel(eventKey: string | null) {
    if(eventKey) {
      const channel = channels.find(c => c.id === eventKey)
      if(channel) {
        setCurrentChannel(channel)
      }
    }
  }

  return (
    <div className="channel-picker">
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