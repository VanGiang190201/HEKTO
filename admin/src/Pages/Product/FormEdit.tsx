import {
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Stack,
} from '@chakra-ui/react';
import * as React from 'react';
import { toast } from 'react-toastify';
import sliderApi, { ISliderGet } from '../../API/sliderApi';
import { Switch, Image, InputNumber } from 'antd';
import productApi from '../../API/productApi';
import categoryApi, { ICategoryGet } from '../../API/categoryApi';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';

interface FormEditProps {
    id: number;
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormEdit: React.FunctionComponent<FormEditProps> = (props) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [namePrev, setNamePrev] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [price, setPrice] = React.useState<number>();
    const [sale, setSale] = React.useState<number>();
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [rate, setRate] = React.useState<number>();
    const [categoryId, setCategoryId] = React.useState<number>();
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [categories, setCategories] = React.useState<ICategoryGet[]>([]);
    const [isChange, setIsChange] = React.useState<boolean>(false);

    console.log(price);

    React.useEffect(() => {
        setIsLoading(true);
        productApi
            .getProductById(id)
            .then((res: any) => {
                setIsLoading(false);
                setName(res[0].name_product);
                setNamePrev(res[0].name_product);
                setPrice(res[0].price_product);
                setSale(res[0].sale);
                setImagePreview(res[0].image_product);
                setDescription(res[0].description_product);
                setRate(res[0].rate);
                setCategoryId(res[0].category_id);
            })
            .catch((error) => setIsLoading(false));

        categoryApi.getAllCategory().then((res) => setCategories(res));
    }, [isChange]);
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

    const handleUpdate = () => {
        const data = new FormData();
        data.append('name_product', name);
        data.append('price_product', JSON.stringify(price));
        data.append('sale', JSON.stringify(sale));
        data.append('image_product', image);
        data.append('description_product', description);
        data.append('rate', JSON.stringify(rate));
        data.append('category_id', JSON.stringify(categoryId));
        productApi
            .editProduct(id, data)
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
                setIsChange(!isChange)
                setIsChangeList(!isChangeList);
            })
            .catch((error) => setIsLoading(false));
    };
    return (
        <Style.Wrapper>
            <Stack>
                <Heading mt="1rem">{`${namePrev}`}</Heading>
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
                        defaultValue={name}
                        onChange={(e) => handleChangeName(e)}
                    />
                </FormControl>

                <FormControl
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
                        value={price}
                        onChange={(e) => handleChangePrice(e)}
                    />
                </FormControl>
                <FormControl
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
                        value={sale}
                        onChange={(e) => handleChangeSale(e)}
                    />
                </FormControl>

                <FormControl
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
                        data={description}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            setDescription(data);
                        }}
                    />
                </FormControl>
                <FormControl
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
                        value={rate}
                        style={{ width: '200px', height: '40px' }}
                        onChange={(e) => handleChangeRate(e)}
                    />
                </FormControl>
                <FormControl
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
                        value={categoryId}
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
                    onClick={handleUpdate}
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
                        'Chỉnh sửa'
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

export default FormEdit;
