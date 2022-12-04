import styled from 'styled-components';

const TableHead = styled.thead`
  background-color: rgba(36, 111, 255, 1);
  & tr{
    & :first-child{
      border-radius: 10px 0 0 0;
    }
    & :last-child{
      border-radius: 0 10px 0 0;
    }
    & th{
      color: #fff;
      font-weight: 400;
      font-size: 16px;
      padding: 15px 0;
      text-align: center;
      min-width:200px ;
    }
  } 
`

export default TableHead