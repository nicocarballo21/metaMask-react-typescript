import styled from 'styled-components'

const Input = styled.input`
  background-color: white;
  border-radius:5px;
  padding: 1rem;
  border-style: none;
  margin-top: 2rem;
  

  &::placeholder{
    color: gray
  }

  &:focus {
    border: 0;
    outline: none;

    &::placeholder{
      color: white
    }
  }  
`;

export default Input