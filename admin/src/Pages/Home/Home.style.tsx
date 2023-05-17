import styled from 'styled-components';

const Wrapper = styled.div`
    padding: 2rem 4rem 2rem 6rem;
    .container {
        margin-top: 0rem;
    }
    .chakra-table__container {
        height: 42rem;
        overflow-y: overlay;
    }
    thead {
        position: sticky;
        top: 0;
        background-color: #e2e8f0;
        z-index: 8;
    }
    .chakra-button {
        outline: none;
    }
`;

export default Wrapper;
