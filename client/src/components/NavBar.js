import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { MAIN_ROUTE, ARCH_FIRST_ROUTE } from "../utils/consts";

const styleLink = {
  textDecoration: "none",
  color: "white",
};

const NavBar = observer(() => {
  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand>
          <Link to={MAIN_ROUTE} style={{ fontSize: "16px", ...styleLink }}>
            На главную
          </Link>
        </Navbar.Brand>
        <Nav className="ml-auto">
          <Link
            to={ARCH_FIRST_ROUTE}
            style={{ marginLeft: "10px", ...styleLink }}
          >
            Архивариус
          </Link>
        </Nav>
      </Container>
    </Navbar>
  );
});

export default NavBar;
