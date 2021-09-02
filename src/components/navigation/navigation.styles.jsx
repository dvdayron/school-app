import styled from 'styled-components';
import {Link} from "react-router-dom";

export const SidebarSticky = styled.div`
  position: -webkit-sticky;
  position: sticky;
  top: 48px;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const NavLink = styled(Link)`
  font-weight: 500;
  color: #333;
  padding: .5rem 2px;
`;