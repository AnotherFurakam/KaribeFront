import styled from 'styled-components';

const TableActionButton = styled.button`
  position: relative;
  border: none;
  border-radius: 100%;
  background-color: ${(props) => props.color};
  padding: 8px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: .9;
  &:hover {
    opacity: 1;
  }
  &:active {
    scale: .98;
  }
  & span{
    font-size: 12px;
    position: absolute;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    bottom: -28px;
    width: max-content;
    padding: 3px 8px;
    z-index: 1;
    border-radius: 5px;
    transition: visibility 100ms ease-in-out;
  }
  &:hover span{
    visibility: visible;
  }
`

export default TableActionButton