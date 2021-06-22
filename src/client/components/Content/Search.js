import styled from 'styled-components'
import theme from 'theme'

//import { ListContainer } from './List'

const Search = styled.div`
  background: white;
  input {border:0;outline:0;font-size:16px;}
  input:focus {outline:none!important;}
  input::placeholder {color:#BBBFC5;font-size:16px;}

  box-shadow: ${theme.shadows[50]};

  padding: ${theme.paddings[20]}px;
  margin-bottom: ${theme.paddings[20]}px;

  

`

export default Search