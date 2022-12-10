import styled from 'styled-components';

const BackButton = styled.button`
  background-color: rgba(29, 175, 212, 0.8);
  padding: 5px;
  border: none;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  transition: background-color 200ms ease-in-out;
  &:hover{
    background-color: rgba(29, 175, 212);
  }
`

export default BackButton