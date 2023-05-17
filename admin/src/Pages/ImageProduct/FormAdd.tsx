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

interface FormAddProps {
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormAdd: React.FunctionComponent<FormAddProps> = (props) => {
    const { setIsChangeList, isChangeList } = props;
    const [productId, setProductId] = React.useState<number>(0);
    const [codeId, setCodeId] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [products, setProducts] = React.useState<IProductGet[]>([]);

    console.log(products);

    React.useEffect(() => {
        productApi.getAllProduct().then((res) => setProducts(res));
    }, []);

    const handleChangeCodeId = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCodeId(e.target.value);
    };

    const handleChangeProductId = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setProductId(Number(e.target.value));
    };
    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = () => {
        const data = new FormData();
        data.append('code_id', codeId);
        data.append('product_id', JSON.stringify(productId));
        data.append('image_product', image);
        imageApi
            .create(data)
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
                <Heading mt="1rem">Tạo hình ảnh khác cho sản phẩm </Heading>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Mã định danh
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeCodeId(e)}
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
                        Ảnh
                    </FormLabel>
                    <Input
                        type="file"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleUploadImage(e)}
                    />

                    {imagePreview && (
                        <Image
                            src={imagePreview}
                            alt=""
                            preview={false}
                            style={{ height: '260px' }}
                        />
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
