import styled from 'styled-components';
import { Card } from 'antd';
import { Box, Flex, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

interface CardItemProps {
    quantity: number;
    title: string;
    imageSrc: string;
    linkRoute : string;
}

const { Meta } = Card;
const CardItem: React.FunctionComponent<CardItemProps> = ({
    quantity,
    title,
    imageSrc,
    linkRoute
}) => {
    
    console.log(linkRoute);
    
    const navigate = useNavigate();

    const handleLink = (url: string) => {
            navigate(url);
    };
    return (
        <Style.Wrapper>
            <Flex
                alignItems={'center'}
                w="100%"
                height="100%"
            >
                <Box>
                    <h1 className="quantity">{quantity}</h1>
                    <h3 className="title">{title}</h3>
                    <p className='link' onClick={() => handleLink(linkRoute)}>( Xem chi tiết )</p>
                </Box>
                <Box
                    borderRadius="50%"
                    w="12rem"
                    height="12rem"
                    overflow="hidden"
                    border="1px solid #000"
                    flexShrink={0}
                >
                    <Image
                        src={imageSrc}
                        alt=""
                        style={{ width: '100%', height: '100%' }}
                    />
                </Box>
            </Flex>
        </Style.Wrapper>
    );
};

const Style = {
    Wrapper: styled.div`
        border: 1px solid #555;
        border-radius: 0.8rem;
        width: 30rem;
        height: 18rem;
        padding: 2rem 2rem;
        .ant-image {
            width: 100%;
            height: 100%;
        }

        .link {
             cursor: pointer;
             color: blue;
             &:hover {
                 text-decoration: underline;
             }
        }
    `,
};
export default CardItem;
