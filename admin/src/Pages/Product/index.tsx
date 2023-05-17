import styled from 'styled-components';
import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Space, Table, Tag } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { useAppDispatch } from '../../Redux/hooks';
import { ColumnsType } from 'antd/es/table';
import productApi, { IProductGet } from '../../API/productApi';
import Search from '../../components/Search';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import FormView from './FormView';

interface ProductProps {}
const Product: React.FunctionComponent<ProductProps> = () => {
    const childAddRef: any = React.useRef();
    const childEditRef: any = React.useRef();
    const childViewRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [products, setProducts] = React.useState<IProductGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    const [id, setId] = React.useState<number>(0);

    React.useEffect(() => {
        setIsLoading(true);
        productApi
            .getAllProduct()
            .then((res) => {
                console.log(res);
                setProducts(res);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [isChangeList]);
    const handleOpenDrawer = (props: any) => {
        childAddRef.current.openDrawer(type);
    };

    const handleOpenAlertDialoger = (id: number) => {
        deleteBtnRef.current.openAlertDialoger(id);
    };

    const handleOpenDrawEdit= (id : number) => {
        setId(id);
        childEditRef.current.openDrawer();
    }

    const handleOpenDrawView = (id : number) => {
        setId(id);
        childViewRef.current.openDrawer();
    }

    const columns: ColumnsType<IProductGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'TÊN SẢN PHẨM',
            dataIndex: 'name_product',
            key: 'name_product',
        },
        {
            title: 'GIÁ SẢN PHẨM (VNĐ)',
            dataIndex: 'price_product',
            key: 'price_product',
            render: (price_product) => <p>{price_product} VNĐ</p>,
        },
        {
            title: 'GIẢM GIÁ (%)',
            dataIndex: 'sale',
            key: 'sale',
            render: (sale) => <p>{sale}%</p>,
        },
        {
            title: 'DANH MỤC',
            dataIndex: 'category_id',
            key: 'category_id',
        },
        {
            title: 'XẾP HẠNG (⭐)',
            dataIndex: 'rate',
            key: 'rate',
            render: (rate) => <p>{rate} ⭐</p>,
        },
        {
            title: 'HÌNH ẢNH',
            dataIndex: 'image_product',
            key: 'image_product',
            render: (image) => (
                <img
                    src={image}
                    alt=""
                    style={{ width: '120px' }}
                />
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IProductGet) => (
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
            render: (_: any, data: IProductGet) => (
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
            render: (_: any, data: IProductGet) => (
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
        productApi.search(text).then((res) => {
            setProducts(res);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Sản phẩm</Heading>
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
                            placeholder="Nhập tên sản phẩm"
                            searchType="product"
                            handleChangeInput={handleChangeInput}
                            setData={products}
                        />
                        <Button
                            colorScheme="blue"
                            size="lg"
                            fontSize="1.4rem"
                            w="10rem"
                            h="3.6rem"
                            onClick={() => handleOpenDrawer({ type: 'add' })}
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
                        dataSource={products}
                        pagination={{ pageSize: 12 }}
                    />
                )}
                <DrawerField ref={childAddRef}>
                    <FormAdd
                        setIsChangeList={setIsChangeList}
                        isChangeList={isChangeList}
                    />
                </DrawerField>
                <DrawerField ref={childViewRef}>
                    <FormView id={id} />
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
                    setProducts={setProducts}
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
export default Product;
