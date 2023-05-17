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

import workerApi, { IWorkerGet } from '../../API/workerApi';
import { FaEdit, FaEye } from 'react-icons/fa';
import { fallBackAvatar } from '../../assets/imageConfig';

interface FormAddProps {
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const positions = [
    { id: 0, position: 'NHÂN VIÊN' },
    { id: 1, position: 'QUẢN TRỊ' },
];

const FormAdd: React.FunctionComponent<FormAddProps> = (props) => {
    const { setIsChangeList, isChangeList } = props;
    const [worker, setWorker] = React.useState<IWorkerGet>();
    const [show, setShow] = React.useState<boolean>(false);
    const [userName, setUserName] = React.useState<string>('');
    const [displayName, setDisplayName] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [role, setRole] = React.useState<number>(0);
    const [avatar, setAvatar] = React.useState<any>();
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [birthday, setBirthday] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [imagePreview, setImagePreview] = React.useState<any>();

    console.log(avatar);

    const handleToggleShowHide = () => {
        setShow(!show);
    };

    const handleChangeUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
    };
    const handleChangeDisplayName = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDisplayName(e.target.value);
    };
    const handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleChangeRole = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRole(Number(e.target.value));
    };
    const handleUploadImage = (e: any) => {
        setAvatar(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleChangeFirstName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };
    const handleChangeLastName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const handleChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhone(e.target.value);
    };

    const handleChangeBirthday = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBirthday(e.target.value);
    };

    const handleChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleSave = () => {
        const data = new FormData()
        data.append('user_name' , userName);
        data.append('display_name' , displayName);
        data.append('email' , email);
        data.append('password' , password);
        data.append('avatar' , avatar);
        data.append('first_name' , firstName);
        data.append('last_name' , lastName);
        data.append('phone' , phone);
        data.append('birthday' , birthday);
        data.append('address' , address);
        data.append('role' , JSON.stringify(role));
        workerApi
            .create(data)
            .then((res) => {
                setIsLoading(false);
                toast.success(res.message, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsChangeList(!isChangeList);
            })
            .catch((error) => setIsLoading(false));
    };
    return (
        <Style.Wrapper>
            <Stack>
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    gap="10px"
                    marginBottom="20px"
                    position="relative"
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
                            src={imagePreview ? imagePreview : fallBackAvatar}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                            }}
                            preview={false}
                        />
                    </Box>
                    <Input
                        type="file"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleUploadImage(e)}
                        style={{
                            width: '240px',
                            border: 'none',
                            position: 'absolute',
                            bottom: '2px',
                            opacity: '0.8',
                        }}
                    />
                </Flex>
                <Box position="relative" textAlign="center">
                    <Input
                        type="text"
                        h="4rem"
                        placeholder='Tên hiển thị'
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeDisplayName(e)}
                        style={{
                            width : "300px"
                        }}
                    />
                    <FaEdit style={{position : 'absolute' , right : '6px' , top : '10px'}}/>
                </Box>
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
                        value={userName}
                        onChange={(e) => handleChangeUserName(e)}
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
                            value={firstName}
                            onChange={(e) => handleChangeFirstName(e)}
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
                            value={lastName}
                            onChange={(e) => handleChangeLastName(e)}
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
                        value={email}
                        onChange={(e) => handleChangeEmail(e)}
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
                            value={phone}
                            onChange={(e) => handleChangePhone(e)}
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
                            value={birthday}
                            onChange={(e) => handleChangeBirthday(e)}
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
                        value={address}
                        onChange={(e) => handleChangeAddress(e)}
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
                        value={role}
                        onChange={(e) => handleChangeRole(e)}
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
                            value={password}
                            onChange={(e) => handleChangePassword(e)}
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
                <Button
                    colorScheme="blue"
                    w="10rem"
                    h="3.6rem"
                    fontSize="1.4rem"
                    style={{ marginTop: '2rem' }}
                    onClick={handleSave}
                >
                    {isLoading ? (
                        <Spinner
                            thickness="4px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="lg"
                        />
                    ) : (
                        'Lưu'
                    )}
                </Button>
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

export default FormAdd;
