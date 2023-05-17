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
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';
import FormView from './FormView';
import { toast } from 'react-toastify';

interface SliderProps {
   
}
const Slider: React.FunctionComponent<SliderProps> = (props) => {

    const childAddRef: any = React.useRef();
    const childEditRef: any = React.useRef();
    const childViewRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [sliders, setSliders] = React.useState<ISliderGet[]>();
    const [id, setId] = React.useState<number>(0);
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    React.useEffect(() => {
        setIsLoading(true);
        sliderApi
            .getAllSlider()
            .then((res) => {
                console.log(res);
                setSliders(res);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, [isChangeList]);


    const handleChangeActive = (id: number) => {
        sliderApi.updateActiveSlider(id).then((res) => {
            toast.success(res.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
        });
    };

    const handleOpenDrawerAdd = (props: any) => {
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
    const columns: ColumnsType<ISliderGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'TIÊU ĐỀ',
            dataIndex: 'title_carousel',
            key: 'title_carousel',
        },
        {
            title: 'MÔ TẢ',
            dataIndex: 'description_carousel',
            key: 'description_carousel',
        },
        {
            title: 'HÌNH ẢNH',
            dataIndex: 'image_carousel',
            key: 'image_carousel',
            render: (image) => (
                <img
                    src={image}
                    alt=""
                    style={{ width: '120px' }}
                />
            ),
        },
        {
            dataIndex: 'active',
            key: 'active',
            render: (_: any, data: ISliderGet) => (
                <Switch
                    defaultChecked={data.active}
                    onChange={() => handleChangeActive(data.id)}
                />
            ),
        },
        {
            key: 'action',
            render: (_: any, data: ISliderGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenDrawView(data.id)}
                >
                    <FaEye fontSize="20px"/>
                </Button>
            ),
        },
        {
            key: 'action',
            render: (_: any, data: ISliderGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenAlertDialoger(data.id)}
                >
                    <FaTrashAlt fontSize="16px"/>
                </Button>
            ),
        },
        {
            key: 'action',
            render: (_: any, data: ISliderGet) => (
                <Button
                    colorScheme="blue"
                    w="3.6rem"
                    h="3.6rem"
                    onClick={() => handleOpenDrawEdit(data.id)}
                >
                    <FaEdit fontSize="16px"/>
                </Button>
            ),
        },
    ];

    const handleChangeInput = (text: string) => {
        sliderApi.search(text).then((res) => {
            setSliders(res);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Băng chuyền</Heading>
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
                            placeholder="Nhập tiêu đề băng chuyền"
                            searchType="slider"
                            handleChangeInput={handleChangeInput}
                            setData={sliders}
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
                        dataSource={sliders}
                        pagination={{ pageSize: 10 }}
                    />
                )}
                
                <AlertDialoger
                    ref={deleteBtnRef}
                    setSliders={setSliders}
                />
            </div>
            <DrawerField ref={childViewRef}>
                <FormView id={id}/>
            </DrawerField>
            <DrawerField ref={childAddRef}>
                <FormAdd setIsChangeList={setIsChangeList} isChangeList={isChangeList} />
            </DrawerField>
            <DrawerField ref={childEditRef}>
                <FormEdit id={id} setIsChangeList={setIsChangeList} isChangeList={isChangeList}/>
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
export default Slider;
