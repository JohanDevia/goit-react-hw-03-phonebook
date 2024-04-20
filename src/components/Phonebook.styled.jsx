import styled from 'styled-components';

export const Container = styled.div`
  width: 800px;
  display: flex;
  flex-direction: column;
  margin: 30px auto;
  align-items: center;
  justify-content: center;
  background-color: lightgoldenrodyellow;
  outline: 2px solid lightskyblue;
`;
export const FormPhonebook = styled.form`
  display: flex;
  flex-direction: column;
  grid-gap: 5px;
`;
export const FinderContacts = styled.div`
  display: flex;
  flex-direction: column;
`;

export const ContactsList = styled.li`
  display: flex;
  justify-content: space-between;
  margin-bottom: 3px;
`;
