import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Stack,
    Text,
} from '@chakra-ui/react';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Switch, Image, InputNumber } from 'antd';
import productApi from '../../API/productApi';
import categoryApi, { ICategoryGet } from '../../API/categoryApi';
import styled from 'styled-components';
import orderApi from '../../API/orderApi';
import moment from 'moment';
import 'moment-timezone';
import TextArea from 'antd/es/input/TextArea';
import billApi from '../../API/billApi';

interface FormEditStatusProps {
    id: number;
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const statusOrder = [
    {
        id: 1,
        status: 'Chờ xác nhận đơn hàng',
    },
    {
        id: 2,
        status: 'Đã xác nhận đơn hàng',
    },
    {
        id: 3,
        status: 'Đang chuẩn bị đơn hàng',
    },
    {
        id: 4,
        status: 'Đơn hàng đang vận chuyển',
    },
    {
        id: 5,
        status: 'Đơn hàng đã giao đến',
    },
    {
        id: 6,
        status: 'Đã thanh toán toàn bộ chi phí',
    },
];

const FormEditStatus: React.FunctionComponent<FormEditStatusProps> = (
    props,
) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [firstName, setFirstName] = React.useState<string>('');
    const [lastName, setLastName] = React.useState<string>('');
    const [address, setAddress] = React.useState<string>('');
    const [phone, setPhone] = React.useState<string>('');
    const [apartment, setApartment] = React.useState<string>('');
    const [city, setCity] = React.useState<string>('');
    const [timeOrder, setTimeOrder] = React.useState<string>('');
    const [totalPay, setTotalPay] = React.useState<number>();
    const [status, setStatus] = React.useState<number>();
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [products, setProducts] = React.useState<any>();
    const [isChange, setIsChange] = React.useState<boolean>(false);
    const [note, setNote] = React.useState<string>('');
    const [show, setShow] = React.useState<boolean>(false);
    const [timeHandle, setTimeHandle] = React.useState<string>('');
    const [personHandle, setPersonHandle] = React.useState<string>('');
    const [methodPay, setMethodPay] = React.useState<string>('');
    console.log(show);

    React.useEffect(() => {
        setIsLoading(true);
        orderApi
            .getDetail(id)
            .then((res: any) => {
                setIsLoading(false);
                setMethodPay(res.data.method_payment);
                setFirstName(res.data.first_name);
                setLastName(res.data.last_name);
                setPhone(res.data.phone);
                setAddress(res.data.address);
                setApartment(res.data.apartment);
                setCity(res.data.city);
                setTimeOrder(res.data.time_order);
                setTotalPay(res.data.total_order);
                setStatus(res.data.status);
            })
            .catch((error) => setIsLoading(false));

        orderApi.getProductsOrder(id).then((res) => setProducts(res.data));

        billApi.getDetail(id).then((res: any) => {
            setNote(res.note);
            setTimeHandle(res.time_update);
            setPersonHandle(res.display_name);
            setShow(!!res.id);
        });
    }, [isChange]);

    const handleChangeStatusOrder = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setStatus(Number(e.target.value));
    };
    const handleUpdate = () => {
        orderApi.changeStatusOrder(id, { status }).then((res) => {
            setIsLoading(false);
            toast.success(res.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
            setIsChange(!isChange);
            setIsChangeList(!isChangeList);
        });
    };

    const handleSaveBill = () => {
        orderApi.saveBill(id, { status: 1, note: note }).then((res) => {
            setIsLoading(false);
            toast.success(res.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
            handleUpdate();
        });
    };

    const handleChangeNote = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };
    return (
        <Style.Wrapper>
            <Stack>
                {!show ? (
                    <Heading
                        mt="1rem"
                        mb="2rem"
                    >
                        Cập nhật trạng thái đơn hàng
                    </Heading>
                ) : (
                    <Heading
                        mt="1rem"
                        mb="2rem"
                    >
                        Trạng thái đơn hàng
                    </Heading>
                )}
                <FormControl mb="0.5rem">
                    {show ? (
                        status === 7 ? (
                            <Text
                                style={{
                                    fontWeight: '600',
                                    marginLeft: '20px',
                                }}
                            >
                                Đơn hàng đã bị hủy
                            </Text>
                        ) : (
                            <Select
                                height="4rem"
                                fontSize="1.4rem"
                                mb="0.6rem"
                                value={status}
                                isDisabled
                            >
                                {statusOrder.map((item: any) => (
                                    <option
                                        key={item.id}
                                        value={item.id}
                                    >{`${item.status}`}</option>
                                ))}
                            </Select>
                        )
                    ) : (
                        <Select
                            height="4rem"
                            fontSize="1.4rem"
                            mb="0.6rem"
                            value={status}
                            onChange={(e) => handleChangeStatusOrder(e)}
                        >
                            {statusOrder.map((item: any) => (
                                <option
                                    key={item.id}
                                    value={item.id}
                                >{`${item.status}`}</option>
                            ))}
                        </Select>
                    )}
                </FormControl>
                {status === 6 || status === 7 ? (
                    <Box style={{ marginTop: '10px' }}>
                        <Text style={{ fontWeight: '700' }}>Ghi chú</Text>
                        <TextArea
                            placeholder=""
                            readOnly={show}
                            value={note}
                            style={{ marginTop: '10px' }}
                            rows={3}
                            onChange={(e) => handleChangeNote(e)}
                        />
                        {!show ? (
                            <Button
                                colorScheme="blue"
                                w="16rem"
                                h="3.6rem"
                                fontSize="1.4rem"
                                style={{ marginTop: '2rem' }}
                                onClick={handleSaveBill}
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
                                    'Thành công'
                                )}
                            </Button>
                        ) : (
                            <Flex
                                style={{
                                    gap: '20px',
                                    borderBottom: '2px solid #ccc',
                                    paddingBottom: '10px',
                                }}
                            >
                                <FormControl mb="0.5rem">
                                    <FormLabel
                                        fontSize="1.5rem"
                                        mt="2rem"
                                        mb="0.6rem"
                                    >
                                        Người xử lý
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        h="4rem"
                                        fontSize="1.4rem"
                                        isReadOnly
                                        value={personHandle}
                                    />
                                </FormControl>
                                <FormControl mb="0.5rem">
                                    <FormLabel
                                        fontSize="1.5rem"
                                        mt="2rem"
                                        mb="0.6rem"
                                    >
                                        Thời gian xử lý
                                    </FormLabel>
                                    <Input
                                        type="text"
                                        h="4rem"
                                        fontSize="1.4rem"
                                        isReadOnly
                                        value={moment(timeHandle)
                                            .tz('Asia/Ho_Chi_Minh')
                                            .format('YYYY/MM/DD, h:mm:ss A')}
                                    />
                                </FormControl>
                            </Flex>
                        )}
                    </Box>
                ) : (
                    <Button
                        colorScheme="blue"
                        w="16rem"
                        h="3.6rem"
                        fontSize="1.4rem"
                        style={{ marginTop: '2rem' }}
                        onClick={handleUpdate}
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
                            'Cập nhật trạng thái'
                        )}
                    </Button>
                )}
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Phương thức thanh toán
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        isReadOnly
                        value={
                            methodPay == 'online'
                                ? 'Thanh toán online'
                                : 'Thanh toán khi nhận hàng'
                        }
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
                            isReadOnly
                            value={firstName}
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
                            isReadOnly
                            value={lastName}
                        />
                    </FormControl>
                </Flex>

                <FormControl mb="0.5rem">
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
                        isReadOnly
                        value={phone}
                    />
                </FormControl>

                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Địa chỉ
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        isReadOnly
                        value={address}
                    />
                </FormControl>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Thời gian đặt
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        isReadOnly
                        value={moment(timeOrder).tz('Asia/Ho_Chi_Minh').format(
                            'YYYY/MM/DD, h:mm:ss A',
                        )}
                    />
                </FormControl>
                <Flex gap="20px">
                    <FormControl mb="0.5rem">
                        <FormLabel
                            fontSize="1.5rem"
                            mt="2rem"
                            mb="0.6rem"
                        >
                            Căn hộ
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            fontSize="1.4rem"
                            isReadOnly
                            value={apartment}
                        />
                    </FormControl>
                    <FormControl mb="0.5rem">
                        <FormLabel
                            fontSize="1.5rem"
                            mt="2rem"
                            mb="0.6rem"
                        >
                            Thành phố
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            fontSize="1.4rem"
                            isReadOnly
                            value={city}
                        />
                    </FormControl>
                </Flex>
                <Stack>
                    {products?.map((product: any, i: number) => (
                        <Box mt="20px">
                            <Flex
                                justifyContent="space-evenly"
                                flex="1 2"
                                gap="20px"
                            >
                                <Image
                                    src={product.image_product}
                                    alt=""
                                    preview={false}
                                    style={{ width: '140px' }}
                                />
                                <Box w="100%">
                                    <Flex justifyContent="space-between">
                                        <Text
                                            style={{
                                                fontSize: '18px',
                                                fontWeight: '700',
                                            }}
                                        >
                                            {product.name_product}
                                        </Text>
                                        <Text
                                            style={{
                                                fontWeight: '700',
                                            }}
                                        >{`x ${product.number}`}</Text>
                                    </Flex>
                                    <Flex justifyContent="space-between">
                                        <Text>{`Loại: ${
                                            product.selected_code_product
                                                ? product.selected_code_product
                                                : 'Mặc định'
                                        }`}</Text>
                                        <Text>{`Giá: ${product.price_product}`}</Text>
                                    </Flex>
                                </Box>
                            </Flex>
                        </Box>
                    ))}
                </Stack>
                <Box
                    style={{
                        height: '46px',
                        padding: '8px',
                        textAlign: 'center',
                        backgroundColor: '#3182ce',
                    }}
                >
                    <Text style={{ fontSize: '20px', fontWeight: '700' }}>
                        Tổng tiền : {totalPay}
                    </Text>
                </Box>
            </Stack>
        </Style.Wrapper>
    );
};

const Style = {
    Wrapper: styled.div`
        .ck-editor__editable:not(.ck-editor__nested-editable) {
            min-height: 200px;
        }
    `,
};

export default FormEditStatus;
