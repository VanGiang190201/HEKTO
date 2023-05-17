import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Space, Table, Tag } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { useAppDispatch } from '../../Redux/hooks';
import { ColumnsType } from 'antd/es/table';
import userApi, { IUserGet } from '../../API/userApi';
import Search from '../../components/Search';
import styled from 'styled-components';
import FormView from './FormView';
interface CustomerProps {}
const Customer: React.FunctionComponent<CustomerProps> = () => {
    const childViewRef: any = React.useRef();

    const [customers, setCustomers] = React.useState<IUserGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [id, setId] = React.useState<number>(0);
    React.useEffect(() => {
        setIsLoading(true);
        userApi
            .getAllCustomer()
            .then((res) => {
                console.log(res);

                setCustomers(res.data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);
    const handleOpenDrawView = (id: number) => {
        setId(id);
        childViewRef.current.openDrawer();
    };

    const columns: ColumnsType<IUserGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ẢNH ĐẠI DIỆN',
            dataIndex: 'avatar',
            key: 'avatar',
            width: '100px',
            render: (avatar) => (
                <img
                    style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                    }}
                    src={avatar}
                    alt=""
                />
            ),
        },
        {
            title: 'TÊN NGƯỜI DÙNG',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'ĐIỆN THOẠI',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'NGÀY SINH',
            dataIndex: 'birthday',
            key: 'birthday',
        },
        {
            title: 'ĐỊA CHỈ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            key: 'action',
            render: (_: any, data: IUserGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenDrawView(data.id)}
                >
                    <FaEye fontSize="20px" />
                </Button>
            ),
        },
    ];

    const handleChangeInput = (text: string) => {
        userApi.search(text).then((res) => {
            setCustomers(res.data);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Khách hàng</Heading>
                    </Flex>
                </Stack>
                <Stack
                    mt="2rem"
                    bg="#fff"
                    p="2rem 2rem"
                    borderRadius="lg"
                >
                    <Flex
                        gap="4rem"
                        justifyContent="space-between"
                    >
                        <Search
                            placeholder="Nhập tên người dùng hoặc địa chỉ"
                            setData={customers}
                            handleChangeInput={handleChangeInput}
                        />
                    </Flex>
                </Stack>
                {isLoading ? (
                    <Flex
                        justifyContent={'center'}
                        mt="5rem"
                    >
                        <Spinner
                            thickness="5px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </Flex>
                ) : (
                    <Table
                        columns={columns}
                        dataSource={customers}
                        pagination={{ pageSize: 12 }}
                    />
                )}
                <DrawerField ref={childViewRef}>
                    <FormView id={id} />
                </DrawerField>
            </div>
        </Style.Wrapper>
    );
};

const Style = {
    Wrapper: styled.div`
        padding: 2rem 6rem;
        .container {
        }
    `,
};

export default Customer;
