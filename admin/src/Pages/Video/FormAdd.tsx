import styled from 'styled-components';
import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
    Select,
} from '@chakra-ui/react';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Image, InputNumber, Switch } from 'antd';
import categoryApi, { ICategoryGet } from '../../API/categoryApi';
import portfoliosApi, { IPortfoliosGet } from '../../API/portfoliosApi';
import productApi, { IProductGet } from '../../API/productApi';
import imageApi from '../../API/imageApi';
import videoApi from '../../API/videoApi';

interface FormAddProps {
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormAdd: React.FunctionComponent<FormAddProps> = (props) => {
    const { setIsChangeList, isChangeList } = props;
    const [productId, setProductId] = React.useState<number>(0);
    const [title, setTitle] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [video, setVideo] = React.useState<string>("");
    const [products, setProducts] = React.useState<IProductGet[]>([]);


    React.useEffect(() => {
        productApi.getAllProduct().then((res) => setProducts(res));
    }, []);

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleChangeProductId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductId(Number(e.target.value));
    };
    const handleChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideo(e.target.value);
    };

    const handleSave = () => {
        videoApi
            .create({
                media : video,
                title : title,
                product_id : productId
            })
            .then((res) => {
                setIsLoading(false);
                console.log(res);
                toast.success(res.message, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsChangeList(!isChangeList);
            })
            .catch((error) => {
                toast.error(error.message, {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };
    return (
        <Style.Wrapper>
            <Stack>
                <Heading mt="1rem">Tạo video cho sản phẩm</Heading>
                <FormControl mb="0.5rem">
                    <FormLabel  
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tiêu đề
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeTitle(e)}
                    />
                </FormControl>
                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Link Video
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeVideo(e)}
                    />

                    {video && (
                          <iframe width="260" height="145" src={video}></iframe>
                    )}
                </FormControl>
                <FormControl
                    id="branch"
                    mb="0.5rem"
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Sản phẩm
                    </FormLabel>
                    <Select
                        height="4rem"
                        fontSize="1.4rem"
                        mb="0.6rem"
                        value={productId}
                        placeholder="Chọn sản phẩm"
                        onChange={(e) => handleChangeProductId(e)}
                    >
                        {products.map((product: IProductGet) => (
                            <option
                                key={product.id}
                                value={`${product.id}`}
                            >{`${product.name_product}`}</option>
                        ))}
                    </Select>
                </FormControl>
                <Button
                    colorScheme="blue"
                    w="10rem"
                    h="3.6rem"
                    fontSize="1.4rem"
                    style={{ marginTop: '2rem' }}
                    onClick={handleSave}
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
                        'Lưu'
                    )}
                </Button>
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

export default FormAdd;
