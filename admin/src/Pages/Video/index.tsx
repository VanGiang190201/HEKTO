import styled from 'styled-components';
import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Table, Switch } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { FaEdit, FaPlus, FaTrashAlt, FaEye } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { ColumnsType } from 'antd/es/table';
import Search from '../../components/Search';
// import FormAdd from './FormAdd';
import FormAdd from './FormAdd';
import videoApi, { IVideoGet } from '../../API/videoApi';

interface VideoProps {}
const Video: React.FunctionComponent<VideoProps> = (props) => {
    const childAddRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [videos, setVideos] = React.useState<IVideoGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);


    React.useEffect(() => {
        setIsLoading(true);
        videoApi
            .getVideos()
            .then((res) => {
                console.log(res);
                
                console.log(res);
                setVideos(res.data);
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

    const columns: ColumnsType<IVideoGet> = [
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
            title: 'TIÊU ĐỀ',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'VIDEO',
            dataIndex: 'media',
            key: 'media',
            render: (media) => (
                <iframe width="260" height="145" src={media}></iframe>
            ),
        },
        {
            key: 'action',
            render: (_: any, data: IVideoGet) => (
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
        videoApi.search(text).then((res) => {
            setVideos(res.data);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Video sản phẩm</Heading>
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
                            placeholder="Nhập tên sản phẩm "
                            searchType="slider"
                            setData={videos}
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
                        dataSource={videos}
                        pagination={{ pageSize: 12 }}
                    />
                )}
            </div>
            <AlertDialoger
                    ref={deleteBtnRef}
                    setVideos={setVideos}
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
export default Video;
