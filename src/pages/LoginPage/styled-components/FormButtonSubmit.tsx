import styled from 'styled-components';

const FormButtonSubmit = styled.button`
  position: relative;
  display: flex;
  justify-content: center;
  gap: 10px;
  align-items: center;
  padding: 10px;
  outline: none;
  border: none;
  border-radius: 20px;
  background-image: linear-gradient(89.77deg, #FFA20D 10.2%, #BD144B 140.99%);
  background-size: 100%;
  background-position: left;
  width: 80%;
  background-repeat: no-repeat;
  height: 65px;
  font-size: 20px;
  transition: 360ms background-size ease-in-out;
  cursor: pointer;
  &:hover{
    background-size: 200%;
  }
  &:active{
    background-size: 100%;
  }
  &:disabled:hover{
    background-size: 100%;
  }
  &:disabled{
    cursor: default;
    filter: saturate(50%);
  }
`

export default FormButtonSubmit;