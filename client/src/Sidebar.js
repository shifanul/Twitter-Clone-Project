import { ReactComponent as LogoSvg } from "./assets/logo.svg";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "./constants";
import { FiBell, FiBookmark, FiHome, FiUser } from "react-icons/fi";
import { useContext } from "react";
import { CurrentUserContext } from "./CurrentUserContext";

const Sidebar = () => {
  const { currentUser } = useContext(CurrentUserContext);

  return (
    currentUser && (
      <NavBar>
        <NavigationLink to="/">
          <Logo />
        </NavigationLink>
        <NavigationLink to="/">
          <Nav>
            <FiHome></FiHome> Home
          </Nav>
        </NavigationLink>
        <NavigationLink to={`/${currentUser.profile.handle}`}>
          <Nav>
            <FiUser></FiUser> Profile
          </Nav>
        </NavigationLink>
        <NavigationLink to="/notifications">
          <Nav>
            <FiBell></FiBell> Notifications
          </Nav>
        </NavigationLink>
        <NavigationLink to="/bookmarks">
          <Nav>
            <FiBookmark></FiBookmark> Bookmarks
          </Nav>
        </NavigationLink>
      </NavBar>
    )
  );
};

// Notification:FiBell

const Logo = styled(LogoSvg)`
  width: 50px;
  margin-left: 17px;
`;

const NavigationLink = styled(NavLink)`
  &.active {
    color: ${COLORS.primary};
  }
  text-decoration: none;
  color: black;
  width: fit-content;
`;

const Nav = styled.h2`
  font-family: sans-serif;
  text-align: left;
  &:hover {
    background-color: #d9c9ff;
    border-radius: 30px;
    width: fit-content;
    color: ${COLORS.primary};
    padding: 10px;
  }
  margin-left: 30px;
  width: fit-content;
`;
const NavBar = styled.div`
  align-items: left;
  width: 15vw;
`;

export default Sidebar;
