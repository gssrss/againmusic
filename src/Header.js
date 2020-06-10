import React, { useState } from "react";
import musiclogo from "./images/musiclogo.png";
import "./App.css";

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";

const Header = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <Navbar color="dark" dark expand="md">
        <NavbarBrand href="/">
          {" "}
          <img src={musiclogo} alt="Youmusic" width="60" height="60" />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink href="/components/">
                <h4>Home</h4>
              </NavLink>
            </NavItem>

            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                <h4>Music</h4>
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>Favorites</DropdownItem>
                <DropdownItem>Playlists</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>More styles</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <h4 className="text">Life is too short to listen bad music!</h4>

          <NavLink href="/componentsssss/">
            <h4>Sign In</h4>
          </NavLink>
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
