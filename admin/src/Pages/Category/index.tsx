import styled from 'styled-components';
import { Button, Flex, Heading, Spinner, Stack, Text } from '@chakra-ui/react';
import { Space, Table, Tag } from 'antd';
import * as React from 'react';
import { FaEdit, FaEye, FaPlus, FaTrashAlt } from 'react-icons/fa';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { ColumnsType } from 'antd/es/table';
import categoryApi, { ICategoryGet } from '../../API/categoryApi';
import FormAdd from './FormAdd';
import Search from '../../components/Search';
import FormEdit from './FormEdit';
import FormView from './FormView';

interface CategoryProps {}
const Category: React.FunctionComponent<CategoryProps> = () => {
    const childAddRef: any = React.useRef();
    const childEditRef: any = React.useRef();
    const childViewRef: any = React.useRef();
    const deleteBtnRef: any = React.useRef();
    const [type, setType] = React.useState<string>('');
    const [categories, setCategories] = React.useState<ICategoryGet[]>();
    const [isLoading, setIsLoading] = React.useState(false);
    const [isChangeList, setIsChangeList] = React.useState(false);
    const [id, setId] = React.useState<number>(0);

    React.useEffect(() => {
        setIsLoading(true);
        categoryApi
            .getAllCategory()
            .then((res) => {
                console.log(res);
                setCategories(res);
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

    const handleOpenDrawEdit= (id : number) => {
        setId(id);
        childEditRef.current.openDrawer();
    }

    const handleOpenDrawView = (id : number) => {
        setId(id);
        childViewRef.current.openDrawer();
    }
    const columns: ColumnsType<ICategoryGet> = [
        {
            title: 'MÃ',
            dataIndex: 'id',
            key: 'id',
            render: (text) => <a>{text}</a>,
        },
        {
            title: 'TÊN DANH MỤC',
            dataIndex: 'name_categories',
            key: 'name_categories',
        },
        {
            title: 'MÔ TẢ',
            dataIndex: 'description_categories',
            key: 'description_categories',
        },
        {
            title: 'ID THỂ LOẠI',
            dataIndex: 'portfolios_id',
            key: 'portfolios_id',
        },
        {
            title: 'ẢNH',
            dataIndex: 'image',
            key: 'image',
            render: (image) => <img src={image} alt='' style={{ width : '100%'}}/>,
        },
        {
            key: 'action',
            render: (_: any, data: ICategoryGet) => (
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
            render: (_: any, data: ICategoryGet) => (
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
            render: (_: any, data: ICategoryGet) => (
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
        categoryApi.search(text).then((res) => {
            setCategories(res);
        });
    };

    return (
        <Style.Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">Danh mục</Heading>
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
                            placeholder="Nhập tên danh mục"
                            searchType="categories"
                            handleChangeInput={handleChangeInput}
                            setData={categories}
                        />
                        <Button
                            colorScheme="blue"
                            size="lg"
                            fontSize="1.4rem"
                            w="12rem"
                            h="3.6rem"
                            onClick={() => handleOpenDrawerAdd({ type: 'add' })}
                        >
                            <FaPlus /> <Text ml="0.4rem">Add new</Text>
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
                        dataSource={categories}
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
                    setCategories={setCategories}
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
export default Category;
