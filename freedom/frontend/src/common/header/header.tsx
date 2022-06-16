import { Cable, Home } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <Button variant="text" aria-label="Home">
        <Link to="/">
          <Home color="success" />
        </Link>
      </Button>
      <Button variant="text" aria-label="Api Test">
        <Link to="/api-test">
          <Cable color="success" />
        </Link>
      </Button>
    </div>
  );
}

export default Header;
