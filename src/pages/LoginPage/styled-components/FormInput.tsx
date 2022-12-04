import styled from 'styled-components';

const FormInput = styled.input`
  padding: 10px 20px 10px 60px;
  outline: none;
  border: none;
  border-radius: 20px;
  background-color: #E8F3FF;
  width: 80%;
  background-image: ${props => props.type !== 'password' ?
    `url('/src/assets/img/icons/userIcon.svg')` : `url('/src/assets/img/icons/candadoIcon.svg')`};
  background-repeat: no-repeat;
  background-position: 10px center;
  height: 65px;
  font-size: 20px;
`

export default FormInput;