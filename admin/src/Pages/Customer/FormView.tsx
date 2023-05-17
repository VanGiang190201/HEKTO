import styled from 'styled-components';
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
    Select,
    Box,
    Flex,
} from '@chakra-ui/react';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Image, InputNumber, Switch } from 'antd';

import adsApi from '../../API/advertisementApi';
import userApi, { IUserGet } from '../../API/userApi';

interface FormViewProps {
    id: number;
}

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id } = props;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isChange, setIsChange] = React.useState<boolean>(false);
    const [user, setUser] = React.useState<IUserGet>();

    React.useEffect(() => {
        setIsLoading(true);
        userApi
            .getUserById(id)
            .then((res: any) => {
                console.log(res);
                
                setUser(res);
            })
            .catch((error) => setIsLoading(false));
    }, [isChange]);

    return (
        <Style.Wrapper>
            <Stack>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    gap="10px"
                    marginBottom="20px"
                >
                    <Box
                        style={{
                            width: '240px',
                            height: '240px',
                            borderRadius: '50%',
                            overflow: 'hidden',
                        }}
                    >
                        <Image
                            src={user?.avatar}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                        />
                    </Box>
                    <Text
                        fontSize="24px"
                        fontWeight="700"
                    >
                        {user?.display_name}
                    </Text>
                </Flex>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tên người dùng
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        value={user?.user_name}
                        isReadOnly
                    />
                </FormControl>
                <Flex gap="20px">
                    <FormControl mb="0.5rem">
                        <FormLabel
                            fontSize="1.5rem"
                            mt="2rem"
                            mb="0.6rem"
                        >
                            Tên
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            fontSize="1.4rem"
                            value={user?.first_name}
                            isReadOnly
                        />
                    </FormControl>
                    <FormControl mb="0.5rem">
                        <FormLabel
                            fontSize="1.5rem"
                            mt="2rem"
                            mb="0.6rem"
                        >
                            Họ
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            fontSize="1.4rem"
                            value={user?.last_name}
                            isReadOnly
                        />
                    </FormControl>
                </Flex>
                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Email
                    </FormLabel>

                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        value={user?.email}
                        isReadOnly
                    />
                </FormControl>
                <Flex gap="20px">
                    <FormControl
                        id="branch"
                        mb="0.5rem"
                    >
                        <FormLabel
                            fontSize="1.5rem"
                            mb="0.6rem"
                        >
                            Số điện thoại
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            fontSize="1.4rem"
                            value={user?.phone}
                            isReadOnly
                        />
                    </FormControl>
                    <FormControl
                        id="branch"
                        mb="0.5rem"
                    >
                        <FormLabel
                            fontSize="1.5rem"
                            mb="0.6rem"
                        >
                            Ngày sinh
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            fontSize="1.4rem"
                            value={user?.birthday}
                            isReadOnly
                        />
                    </FormControl>
                </Flex>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Địa chỉ
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        value={user?.address}
                        isReadOnly
                    />
                </FormControl>
            </Stack>
        </Style.Wrapper>
    );
};

const Style = {
    Wrapper: styled.div`
        .ant-image {
            width: 100%;
            height: 100%;
        }
        .ck-editor__editable:not(.ck-editor__nested-editable) {
            min-height: 200px;
        }
    `,
};

export default FormView;
