import { Field } from 'formik';
import styled from 'styled-components';


const InputText = styled(Field)`
  padding: 10px;
  border: 2px solid rgba(36, 113, 255, 0.2);
  background-color: #E8F3FF;
  border-radius: 10px;
  width: 100%;
  &:focus {
    border: 2px solid rgba(36, 113, 255, 0.664);
  }
`
export default InputText