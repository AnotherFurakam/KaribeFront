import styled from 'styled-components';

const BellBadge = styled.div`
  display: inline-block;
  position: relative;
  width: 30px;
  height: auto;
  box-sizing: content-box;
  cursor: pointer;
  & span{
    position: absolute;
    top: -10px;
    right: -10px;
    background-color: #FF5151;
    color: #fff;
    padding: 2px 4px;
    border-radius: 6px;
    font-size: 10px;
  }
`

export default BellBadge