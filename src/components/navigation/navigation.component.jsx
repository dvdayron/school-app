import {SidebarSticky, NavLink} from './navigation.styles';

const Navigation = () => {
  return (
    <nav className="col-md-2 d-none d-md-block bg-light sidebar">
      <SidebarSticky className="sidebar-sticky">
        <ul className="nav flex-column">
          <li className="nav-item">
            <NavLink className="nav-link active" to="/">
              Dashboard
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link active" to="/miembros/estudiantes">
              Estudiantes
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/miembros/profesores">
              Profesores
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/grupos">
              Grupos
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/ciudades">
              Ciudades
            </NavLink>
          </li>
        </ul>
      </SidebarSticky>
    </nav>
  )
}

export default Navigation;