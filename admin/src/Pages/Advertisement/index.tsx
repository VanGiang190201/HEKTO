import styled from 'styled-components';
import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Table, Switch } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { useAppDispatch } from '../../Redux/hooks';
import { ColumnsType } from 'antd/es/table';
import adsApi, { IAdsGet } from '../../API/advertisementApi';
import Search from '../../components/Search';
import { toast } from 'react-toastify';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import FormView from './FormView';

interface AdvertisementProps {}
const Advertisement: React.FunctionComponent<AdvertisementProps> = () => {
    const childAddRef: any = React.useRef();
    const childEditRef: any = React.useRef();
    const childViewRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [ads, setAds] = React.useState<IAdsGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    const [id, setId] = React.useState<number>(0);


    React.useEffect(() => {
        setIsLoading(true);
        adsApi
            .getAllAds()
            .then((res) => {
                console.log(res);
                setAds(res);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [isChangeList]);

    const handleChangeActive = (id: number) => {
        adsApi.updateActive(id).then((res) => {
            toast.success(res.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });

            setIsChangeList(!isChangeList);
        });
    };

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

    const columns: ColumnsType<IAdsGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'ĐẦU MỤC',
            dataIndex: 'heading',
            key: 'heading',
        },
        {
            title: 'TIÊU ĐỀ',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'HÌNH ẢNH 1',
            dataIndex: 'image_first',
            key: 'image_first',
            render: (image) => (
                <img
                    src={image}
                    alt=""
                    style={{ width: '120px' }}
                />
            ),
        },
        {
            title: 'HÌNH ẢNH 2',
            dataIndex: 'image_second',
            key: 'image_second',
            render: (image) => (
                <img
                    src={image}
                    alt=""
                    style={{ width: '120px' }}
                />
            ),
        },
        {
            dataIndex: 'is_used',
            key: 'is_used',
            render: (_: any, data: IAdsGet) => (
                <Switch
                    defaultChecked={data.is_used}
                    onChange={() => handleChangeActive(data.id)}
                />
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IAdsGet) => (
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
            render: (_: any, data: IAdsGet) => (
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
            render: (_: any, data: IAdsGet) => (
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
        adsApi.search(text).then((res) => {
            setAds(res);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Quảng cáo</Heading>
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
                            placeholder="Nhập tiêu đề hoặc đầu mục"
                            // searchType="car"
                            handleChangeInput={handleChangeInput}
                            setData={ads}
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
                        dataSource={ads}
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
                    setAds={setAds}
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
export default Advertisement;
