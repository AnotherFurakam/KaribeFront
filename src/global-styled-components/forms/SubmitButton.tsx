import styled from 'styled-components';

const SubmitButton = styled.button`
  border: none;
  font-size: 25px;
  padding: 10px 0;
  width: 200px;
  color: #fff;
  background-image: linear-gradient(89.77deg, #246FFF 50.2%, #BD144B 140.99%);;
  background-size: 100%;
  border-radius: 10px;
  transition: background-size 300ms ease-in-out;
  &:hover{
    background-size: 300%;
  }
  &:active{
    transition: background-size 100ms ease-in-out;
    background-size: 100%;
  }
  &:disabled{
    cursor: default;
    filter: saturate(50%);
  }
`

export default SubmitButton