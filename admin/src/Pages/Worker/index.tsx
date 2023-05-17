import { Flex, Heading, Spinner, Stack, Button } from '@chakra-ui/react';
import { Table } from 'antd';
import moment from 'moment';
import * as React from 'react';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import Search from '../../components/Search';
import { useAppDispatch } from '../../Redux/hooks';
import FormAdd from './FormAdd';
import FormEditUser from './FormEdit';
import Wrapper from './Worker.style';
import { IWorkerGet } from '../../API/workerApi';
import workerApi from '../../API/workerApi';
import { ColumnsType } from 'antd/es/table';
import { TypeRoleWorker } from '../../Utils/enum';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import FormView from './FormView';
import FormEdit from './FormEdit';

interface WorkerProps {}

const Worker: React.FunctionComponent<WorkerProps> = () => {
    const childAddRef: any = React.useRef();
    const childEditRef: any = React.useRef();
    const childViewRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [listWorker, setListWorker] = React.useState<IWorkerGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    const [id, setId] = React.useState<number>(0);

    React.useEffect(() => {
        setIsLoading(true);

        workerApi
            .getAllWorker()
            .then((res) => {
                setListWorker(res.data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [isChangeList]);

    const handleOpenDrawerAdd = (props: any) => {
        childAddRef.current.openDrawer(type);
    };

    const handleOpenAlertDialoger = (id: number) => {
        deleteBtnRef.current.openAlertDialoger(id);
    };

    const handleOpenDrawEdit = (id: number) => {
        setId(id);
        childEditRef.current.openDrawer();
    };

    const handleOpenDrawView = (id: number) => {
        setId(id);
        childViewRef.current.openDrawer();
    };

    const columns: ColumnsType<IWorkerGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ẢNH ĐẠI DIỆN',
            dataIndex: 'avatar',
            width: "100px",
            key: 'avatar',
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
            title: 'TÊN HIỂN THỊ',
            dataIndex: 'user_name',
            key: 'user_name',
        },
        {
            title: 'EMAIL',
            dataIndex: 'email',
            key: 'email',
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
            title: 'CHỨC VỤ',
            dataIndex: 'role',
            key: 'role',
            render: (role) => {
                switch (role) {
                    case TypeRoleWorker.ADMIN:
                        return 'QUAN TRI';
                    case TypeRoleWorker.STAFF:
                        return 'NHAN VIEN';
                }
            },
        },
        {
            key: 'action',
            render: (_: any, data: IWorkerGet) => (
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
        {
            key: 'action',
            render: (_: any, data: IWorkerGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenAlertDialoger(data.id)}
                >
                    <FaTrashAlt fontSize="16px" />
                </Button>
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IWorkerGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenDrawEdit(data.id)}
                >
                    <FaEdit fontSize="16px" />
                </Button>
            ),
        },
    ];

    const handleChangeInput = (text: string) => {
        workerApi.search(text).then((res) => {
            setListWorker(res.data);
        });
    };

    return (
        <Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Nhân viên & Quản trị</Heading>
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
                            placeholder="Nhập tên nhân viên hoặc địa chỉ"
                            searchType="user"
                            setData={setListWorker || []}
                            handleChangeInput={handleChangeInput}
                        />
                        <Button
                            colorScheme="blue"
                            size="lg"
                            fontSize="1.4rem"
                            w="10rem"
                            h="3.6rem"
                            onClick={() => handleOpenDrawerAdd({ type: 'add' })}
                        >
                            <FaPlus />
                        </Button>
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
                        dataSource={listWorker}
                        pagination={{ pageSize: 12 }}
                    />
                )}
            </div>
            <DrawerField ref={childViewRef}>
                <FormView id={id} />
            </DrawerField>
            <DrawerField ref={childAddRef}>
                <FormAdd
                    setIsChangeList={setIsChangeList}
                    isChangeList={isChangeList}
                />
            </DrawerField>
            <DrawerField ref={childEditRef}>
                <FormEdit
                    id={id}
                    setIsChangeList={setIsChangeList}
                    isChangeList={isChangeList}
                />
            </DrawerField>
            <AlertDialoger
                    ref={deleteBtnRef}
                    setWorkers={setListWorker}
                />
        </Wrapper>
    );
};

export default Worker;
