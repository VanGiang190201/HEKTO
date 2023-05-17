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
import productApi from '../../API/productApi';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

interface FormAddProps {
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormAdd: React.FunctionComponent<FormAddProps> = (props) => {
    const { setIsChangeList, isChangeList } = props;
    const [name, setName] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>(0);
    const [sale, setSale] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [rate, setRate] = React.useState<number>(0);
    const [categoryId, setCategoryId] = React.useState<number>(0);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [categories, setCategories] = React.useState<ICategoryGet[]>([]);

    React.useEffect(() => {
        categoryApi.getAllCategory().then((res) => setCategories(res));
    }, []);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangePrice = (e: any) => {
        setPrice(e);
    };

    const handleChangeSale = (e: any) => {
        setSale(e);
    };

    const handleChangeRate = (e: any) => {
        setRate(e);
    };

    const handleChangeCategories = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setCategoryId(Number(e.target.value));
    };
    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = () => {

        
        const data = new FormData()
        data.append('name_product' , name);
        data.append('price_product' , JSON.stringify(price));
        data.append('sale' , JSON.stringify(sale));
        data.append('image_product' , image);
        data.append('description_product' , description);
        data.append('rate' , JSON.stringify(rate));
        data.append('category_id' , JSON.stringify(categoryId));
        productApi
            .create(data)
            .then((res) => {
                setIsLoading(false);
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
            .catch((error) => setIsLoading(false));
    };
    return (
        <Style.Wrapper>
            <Stack>
                <Heading mt="1rem">Tạo sản phẩm mới </Heading>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tên sản phẩm
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeName(e)}
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
                        Giá sản phẩm (VNĐ)
                    </FormLabel>
                    <InputNumber
                        min={0}
                        style={{ width: '200px', height: '40px' }}
                        onChange={(e) => handleChangePrice(e)}
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
                        Giảm giá (%)
                    </FormLabel>
                    <InputNumber
                        min={0}
                        max={100}
                        style={{ width: '200px', height: '40px' }}
                        onChange={(e) => handleChangeSale(e)}
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
                        Mô tả
                    </FormLabel>

                    <CKEditor
                        editor={ClassicEditor}
                        data=""
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                        }}
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
                        Xếp hạng (⭐)
                    </FormLabel>
                    <InputNumber
                        min={0}
                        max={5}
                        style={{ width: '200px', height: '40px' }}
                        onChange={(e) => handleChangeRate(e)}
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
                        Danh mục
                    </FormLabel>
                    <Select
                        height="4rem"
                        fontSize="1.4rem"
                        mb="0.6rem"
                        placeholder="Chọn danh mục"
                        onChange={(e) => handleChangeCategories(e)}
                    >
                        {categories.map((category: ICategoryGet) => (
                            <option
                                key={category.id}
                                value={`${category.id}`}
                            >{`${category.name_categories}`}</option>
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
