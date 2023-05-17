import styled from 'styled-components';
import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Table, Switch } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { FaEdit, FaPlus, FaTrashAlt, FaEye } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { useAppDispatch } from '../../Redux/hooks';
import { ColumnsType } from 'antd/es/table';
import sliderApi, { ISliderGet } from '../../API/sliderApi';
import Search from '../../components/Search';
// import FormAdd from './FormAdd';
import { toast } from 'react-toastify';
import imageApi, { IImageGet } from '../../API/imageApi';
import FormAdd from './FormAdd';

interface ImageProductProps {}
const ImageProduct: React.FunctionComponent<ImageProductProps> = (props) => {
    const childAddRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [images, setImages] = React.useState<IImageGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);


    React.useEffect(() => {
        setIsLoading(true);
        imageApi
            .getImages()
            .then((res) => {
                console.log(res);
                setImages(res);
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

    const columns: ColumnsType<IImageGet> = [
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
            title: 'MÃ ĐINH DANH',
            dataIndex: 'code_id',
            key: 'code_id',
        },
        {
            title: 'HÌNH ẢNH',
            dataIndex: 'image_product',
            key: 'image_product',
            render: (image_product) => (
                <img
                    src={image_product}
                    alt=""
                    style={{ width: '120px' }}
                />
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IImageGet) => (
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
    ];

    const handleChangeInput = (text: string) => {
        imageApi.search(text).then((res) => {
            setImages(res);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Hình ảnh sản phẩm</Heading>
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
                            placeholder="Nhập sản phẩm hoặc mã định danh"
                            searchType="slider"
                            setData={images}
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
                        dataSource={images}
                        pagination={{ pageSize: 12 }}
                    />
                )}
            </div>
            <AlertDialoger
                    ref={deleteBtnRef}
                    setImages={setImages}
                />
            <DrawerField ref={childAddRef}>
                <FormAdd
                    setIsChangeList={setIsChangeList}
                    isChangeList={isChangeList}
                />
            </DrawerField>
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
export default ImageProduct;
