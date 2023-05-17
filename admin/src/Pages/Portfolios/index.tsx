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
import portfoliosApi, { IPortfoliosGet } from '../../API/portfoliosApi';
import Search from '../../components/Search';
import FormAdd from './FormAdd';
import FormEdit from './FormEdit';

interface PortfoliosProps {}
const Portfolios: React.FunctionComponent<PortfoliosProps> = () => {
    const childAddRef: any = React.useRef();
    const childEditRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [portfolios, setPortfolios] = React.useState<IPortfoliosGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    const [id, setId] = React.useState<number>(0);

    React.useEffect(() => {
        setIsLoading(true);
        portfoliosApi
            .getAllPortfolios()
            .then((res) => {
                console.log(res);
                setPortfolios(res.data);
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


    const columns: ColumnsType<IPortfoliosGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'TÊN THỂ LOẠI',
            dataIndex: 'name_portfolios',
            key: 'name_portfolios',
        },
        {
            title: 'MÔ TẢ',
            dataIndex: 'description_portfolios',
            key: 'description_portfolios',
        },
        {
            key: 'action',
            render: (_: any, data: IPortfoliosGet) => (
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
            render: (_: any, data: IPortfoliosGet) => (
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
        portfoliosApi.search(text).then((res) => {
            setPortfolios(res.data);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Thể loại</Heading>
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
                            placeholder="Nhập tên thể loại"
                            searchType="portfolios"
                            handleChangeInput={handleChangeInput}
                            setData={portfolios}
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
                        dataSource={portfolios}
                        pagination={{ pageSize: 12 }}
                    />
                )}
            </div>
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
                setPortfolios={setPortfolios}
            />
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
export default Portfolios;
