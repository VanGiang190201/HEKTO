import styled from 'styled-components';
import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Space, Table, Tag } from 'antd';
import moment from 'moment';
import 'moment-timezone'
import * as React from 'react';
import { FaCheck, FaEdit, FaEye, FaPlus, FaTimes, FaTrashAlt } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { useAppDispatch } from '../../Redux/hooks';
import { ColumnsType } from 'antd/es/table';
import Search from '../../components/Search';
import orderApi, { IOrderGet } from '../../API/orderApi';
import { TypeStatusOrder } from '../../Utils/enum';
import billApi from '../../API/billApi';
import meetingApi, { IMeetingGet } from '../../API/meetingApi';
import FormEdit from './FormEdit';
// import FormAdd from './FormAdd';
// import FormEdit from './FormEdit';
// import FormView from './FormView';

interface MeetingProps {}
const Meeting: React.FunctionComponent<MeetingProps> = () => {
    const childEditRef: any = React.useRef();
    const childViewRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [meetings, setMeetings] = React.useState<IMeetingGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    const [id, setId] = React.useState<number>(0);

    const renderStatus = (active: boolean) => {
        switch (active) {
            case false:
                return 'Chưa xác nhận';
            case true:
                return 'Đã xác nhận';
            default:
                return null;
        }
    };

    React.useEffect(() => {
        setIsLoading(true);
        meetingApi
            .getAllMeeting()
            .then((res) => {
                setIsLoading(false);
                setMeetings(res.data)
            })
            .catch((error) => console.log(error));
    }, [isChangeList]);
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

    const columns: ColumnsType<IMeetingGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'TÊN KHÁCH HÀNG',
            dataIndex: 'display_name',
            key: 'display_name',
        },
        {
            title: 'SỐ ĐIỆN THOẠI',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'THỜI GIAN ĐẶT',
            dataIndex: 'time_start',
            key: 'time_start',
            render: (time_start) =>
            (
                <p>{moment(time_start).tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD, h:mm:ss A')}</p>
            ),
        },
        {
            title: 'THỜI GIAN KẾT THÚC',
            dataIndex: 'time_end',
            key: 'time_end',
            render: (time_end) =>
            (
                <p>{moment(time_end).tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD, h:mm:ss A')}</p>
            ),
        },
        {
            title: 'NHÂN VIÊN TƯ VẤN',
            dataIndex: 'worker_name',
            key: 'worker_name',
        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'active',
            key: 'active',
            render: (_: any, data: IMeetingGet) => (
                <p>{renderStatus(data.active)}</p>
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IMeetingGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenDrawEdit(data.id)}
                >
                    <FaCheck fontSize="20px" />
                </Button>
            ),
        },
        // {
        //     key: 'action',
        //     render: (_: any, data: IMeetingGet) =>
        //          (
        //             <Button
        //                 colorScheme="blue"
        //                 w="3.6rem"
        //                 h="3.6rem"
        //                 onClick={() => handleOpenAlertDialoger(data.id)}
        //             >
        //                 <FaTimes fontSize="20px"/>
        //             </Button>
        //         )
        // },
    ];

    const handleChangeInput = (text: string) => {
        meetingApi.search(text).then((res) => {
            setMeetings(res.data);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Cuộc gặp</Heading>
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
                            placeholder="Nhập tên khách hàng hoặc cskh"
                            setData={meetings}
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
                        dataSource={meetings}
                        pagination={{ pageSize: 12 }}
                    />
                )}

                <DrawerField ref={childEditRef}>
                    <FormEdit
                        id={id}
                        setIsChangeList={setIsChangeList}
                        isChangeList={isChangeList}
                    />
                </DrawerField>
                <AlertDialoger
                    ref={deleteBtnRef}
                    setOrders={setMeetings}
                    orderCancel
                />
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
export default Meeting;
