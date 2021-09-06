import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    body {
    margin: 0;
    padding: 0;
    background-color: lightcoral;
    }

    p{
    color: white;
    font-size: 1.3rem;
    word-break: break-all;
    }

    button {
    margin-right: 3px;
    margin-left: 3px;
    width: 130px;
    height: 50px;
    border-radius: 10px;
    background-color: orange;
    border-style: none;
    }

    input {
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
    }


`;



export default GlobalStyle;