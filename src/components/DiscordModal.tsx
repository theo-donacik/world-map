import { Modal } from "react-bootstrap";
import { DiscordLoginButton } from "react-social-login-buttons";

export default function DiscordModal({show, setShow}: {show: boolean, setShow: (show: boolean) => void}) {
  
  function handleClick() {
    try {
      window.open("https://discord.com/oauth2/authorize?client_id=1474063428443308294&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fdiscord%2Fcallback&scope=identify", '_blank', 'width=600,height=700');
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