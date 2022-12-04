import styled from 'styled-components';

const FormForgetPassLabel = styled.a`
  position: relative;
  display: flex;
  justify-content: center;
  color: #97ECFF;
  text-decoration: none;
  opacity: .7;
  cursor: pointer;
  transition: 250ms opacity ease-in-out;
  &::before{
    position: absolute;
    content: '';
    bottom: 0px;
    height: 1.5px;
    width: 0%;
    opacity: 0;
    background-color: #97ECFF;
    transition: 250ms width ease-in-out, 300ms opacity ease-in-out;
  }
  &:hover::before{
    width: 100%;
    opacity: 1;
  }
  &:hover{
    opacity: 1;
    color: #97ECFF;
  }
`

export default FormForgetPassLabel;