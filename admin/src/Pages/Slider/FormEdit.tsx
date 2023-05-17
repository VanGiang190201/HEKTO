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
import { Switch, Image } from 'antd';

interface FormEditProps {
    id: number;
    setIsChangeList ?:any;
    isChangeList ?: boolean;
}

const FormEdit: React.FunctionComponent<FormEditProps> = (props) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [titlePrev, setTitlePrev] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [isChange, setIsChange] = React.useState<boolean>(false);

    
    React.useEffect(() => {
        setIsLoading(true);
        sliderApi
            .getDetail(id)
            .then((res: any) => {
                setIsLoading(false);
                setTitle(res[0].title_carousel);
                setDescription(res[0].description_carousel);
                setImagePreview(res[0].image_carousel);
                setIsActive(res[0].active);
                setTitlePrev(res[0].title_carousel);
            })
            .catch((error) => setIsLoading(false));
    }, [isChange]);
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleChangeDescription = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(e.target.value);
    };

    const handleChangeActive = (e: any) => {
        setIsActive(e);
    };

    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleUpdate = () => {
        const data = new FormData() 
        data.append('image_carousel' , image);
        data.append('title_carousel' , title);
        data.append('description_carousel' , description);
        data.append('active' , JSON.stringify(isActive));
        sliderApi
            .editSlider(id, data)
            .then((res) => {
                setIsLoading(false);
                toast.success('Cập nhật băng chuyền thành công', {
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
        <Stack>
            <Heading mt="1rem">{`${titlePrev}`}</Heading>
            <FormControl mb="0.5rem">
                <FormLabel
                    fontSize="1.5rem"
                    mb="0.6rem"
                    mt="2rem"
                >
                    Tiêu đề
                </FormLabel>
                <Input
                    type="text"
                    h="4rem"
                    fontSize="1.4rem"
                    defaultValue={title}
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
                    Mô tả
                </FormLabel>
                <Input
                    type="text"
                    h="4rem"
                    defaultValue={description}
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
                    Hoạt động
                </FormLabel>
                <Switch
                    onChange={(e) => handleChangeActive(e)}
                    checked={isActive}
                />
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
                    'Update'
                )}
            </Button>
        </Stack>
    );
};

export default FormEdit;
