import {NavBrand} from './header.styles';

const Header = () => {
  return (
    <nav className="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
      <NavBrand className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
        School App
      </NavBrand>
    </nav>
  )
}

export default Header;