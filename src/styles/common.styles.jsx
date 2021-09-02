import styled from 'styled-components';

export const PageContainer = styled.div`
  
`;

export const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CountsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 35px 0;
`;

export const CountsItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #DEE2E6;
  border-radius: 5px;
  padding: 25px 15px;
  width: 20%;
`;

export const CountsItemLabel = styled.h3`
  color: #010101;
`;

export const CountsItemNumber = styled.h6`
  font-size: 24px;
  color: #000;
`;