import styled from 'styled-components';
import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Space, Table, Tag } from 'antd';
import moment from 'moment';
import 'moment-timezone'
import * as React from 'react';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { useAppDispatch } from '../../Redux/hooks';
import { ColumnsType } from 'antd/es/table';
import Search from '../../components/Search';
import orderApi, { IOrderGet } from '../../API/orderApi';
import FormEditStatus from './FormEditStatus';
import { TypeStatusOrder } from '../../Utils/enum';
import billApi from '../../API/billApi';
// import FormAdd from './FormAdd';
// import FormEdit from './FormEdit';
// import FormView from './FormView';

interface OrderProps {}
const Order: React.FunctionComponent<OrderProps> = () => {
    const childEditRef: any = React.useRef();
    const childViewRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [orders, setOrders] = React.useState<IOrderGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    const [id, setId] = React.useState<number>(0);
    const [show, setShow] = React.useState<boolean>(false);

    const renderStatus = (status: number) => {
        console.log(status);
        switch (status) {
            case TypeStatusOrder.WAIT_CONFIRM:
                return 'Chờ xác nhận đơn hàng';
            case TypeStatusOrder.CONFIRMED:
                return 'Đã xác nhận đơn hàng';
            case TypeStatusOrder.PREPARING_ORDER:
                return 'Đang chuẩn bị đơn hàng';
            case TypeStatusOrder.SHIPPING:
                return 'Đơn hàng đang vận chuyển';
            case TypeStatusOrder.SUCCESSFUL_DELIVERY:
                return 'Đơn hàng đã giao đến';
            case TypeStatusOrder.RECEIVED_MONEY:
                return 'Đã thanh toán toàn bộ chi phí';
            case TypeStatusOrder.CANCEL_ORDER:
                return 'Đơn đã được hủy';
            default:
                return null;
        }
    };

    React.useEffect(() => {
        setIsLoading(true);
        orderApi
            .getAllOrder()
            .then((res) => {
                console.log(res);
                setOrders(res.data);
                setIsLoading(false);
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

    const columns: ColumnsType<IOrderGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'TÊN',
            dataIndex: 'first_name',
            key: 'first_name',
        },
        {
            title: 'HỌ',
            dataIndex: 'last_name',
            key: 'address',
        },
        {
            title: 'SỐ ĐIỆN THOẠI',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'ĐỊA CHỈ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'THỜI GIAN ĐẶT',
            dataIndex: 'time_order',
            key: 'time_order',
            render: (time_order) =>
                time_order && (
                    <p>{moment(time_order).tz('Asia/Ho_Chi_Minh').format('YYYY/MM/DD, h:mm:ss A')}</p>
                ),
        },
        {
            title: 'TỔNG TIỀN',
            dataIndex: 'total_order',
            key: 'total_order',
            render: (total_order) => <p>{total_order} VNĐ</p>,
        },
        {
            title: 'TRẠNG THÁI',
            dataIndex: 'image_product',
            key: 'image_product',
            render: (_: any, data: IOrderGet) => (
                <p>{renderStatus(data.status)}</p>
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IOrderGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenDrawEdit(data.id)}
                >
                    <FaEdit fontSize="20px" />
                </Button>
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IOrderGet) =>
                (data.status !== TypeStatusOrder.RECEIVED_MONEY && (
                    <Button
                        colorScheme="blue"
                        w="3.6rem"
                        h="3.6rem"
                        onClick={() => handleOpenAlertDialoger(data.id)}
                    >
                        <FaTrashAlt fontSize="20px"/>
                    </Button>
                )) &&
                (data.status !== TypeStatusOrder.CANCEL_ORDER && (
                    <Button
                        colorScheme="blue"
                        w="3.6rem"
                        h="3.6rem"
                        onClick={() => handleOpenAlertDialoger(data.id)}
                    >
                        <FaTrashAlt fontSize="20px" />
                    </Button>
                )),
        },
    ];

    const handleChangeInput = (text: string) => {
        orderApi.search(text).then((res) => {
            setOrders(res.data);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Đơn hàng</Heading>
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
                            placeholder="Nhập tên khách hàng hoặc địa chỉ"
                            searchType="product"
                            handleChangeInput={handleChangeInput}
                            setData={orders}
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
                        dataSource={orders}
                        pagination={{ pageSize: 12 }}
                    />
                )}

                <DrawerField ref={childEditRef}>
                    <FormEditStatus
                        id={id}
                        setIsChangeList={setIsChangeList}
                        isChangeList={isChangeList}
                    />
                </DrawerField>
                <AlertDialoger
                    ref={deleteBtnRef}
                    setOrders={setOrders}
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
export default Order;
