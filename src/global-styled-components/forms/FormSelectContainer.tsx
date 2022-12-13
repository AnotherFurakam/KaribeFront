import styled from 'styled-components';

const FormSelectContainer = styled.div`
  position: relative;
  width: 100%;
  &::before{
    content: '';
    position: absolute;
    display: inline-block;
    width: 20px;
    height: 20px;
    background-color: rgba(36, 113, 255, 0.664);
    top: 10px;
    right: 10px;
    rotate: 180deg;
    clip-path: polygon(50% 0%, 10% 50%, 90% 50%);
  }
`

export default FormSelectContainer