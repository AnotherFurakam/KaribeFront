import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const SideLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 7px 10px;
  margin: 0 15px;
  border-radius: 7px;
  transition: background-color 200ms ease-in-out;

  &:hover{
    background-color: rgba(255, 255, 255, 0.3);
  }

  &.active{
    background-color: #FCB138;
  }
`

export default SideLink