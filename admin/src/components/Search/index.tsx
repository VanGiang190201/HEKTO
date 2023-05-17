import { Flex, IconButton, Input } from '@chakra-ui/react';
import * as React from 'react';
import { FaSearch } from 'react-icons/fa';
import styled from 'styled-components';
import carApi from '../../API/carApi';
import userApi from '../../API/userApi';
import { useAppDispatch } from '../../Redux/hooks';
import { searchCar } from '../../Redux/slices';
import useDebounce from '../Debounce';
interface SearchProps {
    setData: any;
    placeholder: string;
    handleChangeInput ?: any;
    searchType?: 'user' | 'car' | 'slider' | 'product' | 'categories' |'portfolios';
}

const Wrapper = styled.div`
    position: relative;

    .chakra-button {
        position: absolute;
        right: 0;
        border: none;
        outline: none;
    }
`;
const Search: React.FunctionComponent<SearchProps> = ({
    placeholder,
    handleChangeInput,
    searchType,
    setData,
}) => {
    const dispatch = useAppDispatch();
    // const [queryString, setQueryString] = React.useState('');

    // const debouncedValueSearch = useDebounce<string>(queryString, 250);
 

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        handleChangeInput(event.target.value);
        // setQueryString(() => event.target.value);
    };

    
    return (
        <Wrapper>
            <Flex>
                <Input
                    placeholder={placeholder}
                    size="lg"
                    w="26rem"
                    h="3.6rem"
                    fontSize="1.3rem"
                    // value={queryString}
                    onChange={handleChange}
                />
                <IconButton
                    colorScheme="blue"
                    aria-label="Search database"
                    icon={<FaSearch />}
                    size="lg"
                    h="3.6rem"
                    w="3.6rem"
                    fontSize="1.8rem"
                />
            </Flex>
        </Wrapper>
    );
};

export default Search;
