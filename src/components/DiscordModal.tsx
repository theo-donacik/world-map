import { Modal } from "react-bootstrap";
import { DiscordLoginButton } from "react-social-login-buttons";

export default function DiscordModal({show, setShow}: {show: boolean, setShow: (show: boolean) => void}) {
  
  function handleClick() {
    try {
      window.open(process.env.REACT_APP_DISCORD_REDIRECT_URI, '_blank', 'width=600,height=700');
    } catch (error) {
      alert('Error initiating Discord login window');
    }
  }
  
  return (
    <Modal
        show={show}
        onHide={() => {setShow(false)}}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Log In To Continue
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <DiscordLoginButton onClick={handleClick}/>
        </Modal.Body>
      </Modal>
  )

}