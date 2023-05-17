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
import TextArea from 'antd/es/input/TextArea';
import billApi from '../../API/billApi';
import meetingApi from '../../API/meetingApi';
import workerApi, { IWorkerGet } from '../../API/workerApi';

interface FormEditProps {
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

const FormEdit: React.FunctionComponent<FormEditProps> = (props) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isChange, setIsChange] = React.useState<boolean>(false);
    const [workers, setWorkers] = React.useState<IWorkerGet[]>([]);
    const [products, setProducts] = React.useState<any>([]);
    const [meeting, setMeeting] = React.useState<any>([]);
    const [workerHandle, setWorkerHandle] = React.useState<number>(0);


    console.log(workerHandle);
    
    React.useEffect(() => {
        workerApi.getAllWorker().then((res) => setWorkers(res.data));
        meetingApi.getDetail(id).then((res) => setMeeting(res.data));
        meetingApi.getProducts(id).then((res) => setProducts(res.data));
    }, [isChange]);

    const handleChangeWorkerHandle = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setWorkerHandle(Number(e.target.value));
    };
  

    const handleConfirm = () => {
            setIsLoading(true)
            meetingApi.confirm(id , { worker_id : workerHandle}).then(res => {
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
            })
    };

    return (
        <Style.Wrapper>
            <Flex gap="20px">
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Nhân viên tư vấn
                    </FormLabel>
                    <Select
                        height="4rem"
                        fontSize="1.4rem"
                        mb="0.6rem"
                        value={workerHandle}
                        placeholder='Chọn nhân viên tư vấn'
                        onChange={(e) => handleChangeWorkerHandle(e)}
                    >
                        {workers.map((item: any) => (
                            <option
                                key={item.id}
                                value={item.id}
                            >{`${item.user_name}`}</option>
                        ))}
                    </Select>
                </FormControl>
            </Flex>
            <Stack>
                <Text
                    style={{
                        fontSize: '18px',
                        fontWeight: '600',
                        margin: '20px',
                    }}
                >
                    {' '}
                    Sản phẩm quan tâm
                </Text>
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
            {!meeting.active && (
                <Button
                    colorScheme="blue"
                    w="16rem"
                    h="3.6rem"
                    fontSize="1.4rem"
                    style={{ marginTop: '2rem' }}
                    onClick={handleConfirm}
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
                        'Xác nhận'
                    )}
                </Button>
            )}
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

export default FormEdit;
