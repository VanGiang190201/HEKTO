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
import workerApi, { IWorkerGet } from '../../API/workerApi';
import { FaEye } from 'react-icons/fa';

interface FormViewProps {
    id: number;
}

const positions = [
    { id: 0, position: 'NHÂN VIÊN' },
    { id: 1, position: 'QUẢN TRỊ' },
];

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id } = props;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isChange, setIsChange] = React.useState<boolean>(false);
    const [worker, setWorker] = React.useState<IWorkerGet>();
    const [show, setShow] = React.useState<boolean>(false);

    console.log(id);

    React.useEffect(() => {
        setIsLoading(true);
        workerApi
            .getWorker(id)
            .then((res: any) => {
                console.log(res);

                setIsLoading(false);
                setWorker(res);
            })
            .catch((error) => setIsLoading(false));
    }, [isChange]);

    const handleToggleShowHide = () => {
        setShow(!show);
    };

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
                            src={worker?.avatar}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            preview={false}
                        />
                    </Box>
                    <Text
                        fontSize="24px"
                        fontWeight="700"
                    >
                        {worker?.display_name}
                    </Text>
                </Flex>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tên thành viên
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        value={worker?.user_name}
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
                            value={worker?.first_name}
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
                            value={worker?.last_name}
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
                        value={worker?.email}
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
                            value={worker?.phone}
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
                            value={worker?.birthday}
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
                        value={worker?.address}
                        isReadOnly
                    />
                </FormControl>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Chức vụ
                    </FormLabel>
                    <Select
                        height="4rem"
                        fontSize="1.4rem"
                        mb="0.6rem"
                        value={worker?.role}
                        disabled
                    >
                        {positions.map((item: any) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >{`${item.position}`}</option>
                        ))}
                    </Select>
                </FormControl>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Mật khẩu
                    </FormLabel>
                    <Box style={{ position: 'relative' }}>
                        <Input
                            type={show ? 'text' : 'password'}
                            h="4rem"
                            fontSize="1.4rem"
                            value={worker?.password}
                            isReadOnly
                        />
                        <FaEye
                            onClick={handleToggleShowHide}
                            fontSize="20px"
                            style={{
                                position: 'absolute',
                                right: '10px',
                                top: '10px',
                                cursor: 'pointer',
                            }}
                        />
                    </Box>
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
