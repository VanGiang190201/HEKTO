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


interface FormAddProps {
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormAdd: React.FunctionComponent<FormAddProps> = (props) => {
    const { setIsChangeList, isChangeList } = props;
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [portfoliosId , setPortfoliosId] = React.useState<number>(0);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [portfolios, setPortfolios] = React.useState<IPortfoliosGet[]>([]);

    React.useEffect(() => {
        portfoliosApi.getAllPortfolios().then((res) => setPortfolios(res.data));
    }, []);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleChangePortfolios = (
        e: React.ChangeEvent<HTMLSelectElement>,
    ) => {
        setPortfoliosId(Number(e.target.value));
    };
    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = () => {

        
        const data = new FormData()
        data.append('name_categories' , name);
        data.append('description_categories' , description);
        data.append('image' , image);
        data.append('portfolios_id' , JSON.stringify(portfoliosId));
        categoryApi
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
                <Heading mt="1rem">Tạo danh mục mới </Heading>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tên danh mục
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
                        Mô tả
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeDescription(e)}
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
                        Thể loại
                    </FormLabel>
                    <Select
                        height="4rem"
                        fontSize="1.4rem"
                        mb="0.6rem"
                        placeholder="Chọn thể loại"
                        onChange={(e) => handleChangePortfolios(e)}
                    >
                        {portfolios.map((portfolio: IPortfoliosGet) => (
                            <option
                                key={portfolio.id}
                                value={`${portfolio.id}`}
                            >{`${portfolio.name_portfolios}`}</option>
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
