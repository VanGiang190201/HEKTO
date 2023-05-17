import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`

    :root {

    }

    * {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    html { 
        font-size:62.5%;
        scroll-behavior: smooth;
    }

    body {
        font-size: 1.6rem ;
        text-rendering: optimizeSpeed;
    }

    .chakra-ui-light {
        display: block;
    }


`;
