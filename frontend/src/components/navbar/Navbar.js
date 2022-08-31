import {
  LogoContainer,
  NavigationContainer,
  NavLink,
  NavLinks,
} from './Navbar.styles';

const Navbar = () => {
  return (
    <NavigationContainer>
      <LogoContainer to="/">{/* <Logo /> */}</LogoContainer>
      <NavLinks>
        <NavLink to="/account">Account</NavLink>

        <NavLink as="span">Sign-out</NavLink>

        <NavLink to="/auth">Sign-in</NavLink>
      </NavLinks>
    </NavigationContainer>
  );
};

export default Navbar;
