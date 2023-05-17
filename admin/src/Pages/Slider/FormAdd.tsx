import {
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Select,
    Spinner,
    Stack,
    Text,
} from '@chakra-ui/react';
import moment from 'moment';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Image, Switch } from 'antd';
import bookingApi from '../../API/bookingApi';
import sliderApi from '../../API/sliderApi';
import { useAppDispatch } from '../../Redux/hooks';
interface FormAddProps {
    setIsChangeList ?:any;
    isChangeList ?: boolean;
}

const FormAdd: React.FunctionComponent<FormAddProps> = (
    props,
) => {
    const {setIsChangeList, isChangeList } = props;
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [image , setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleChangeDescription = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    };

    const handleChangeActive =  (e: any) => {
        setIsActive(e);
    };

    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = () => {
        const data = new FormData() 
        data.append('image_carousel' , image);
        data.append('title_carousel' , title);
        data.append('description_carousel' , description);
        data.append('active' , JSON.stringify(isActive));
        sliderApi
            .create(data)
            .then((res) => {
                setIsLoading(false);
                console.log(res);
                toast.success('Thêm băng chuyền thành công', {
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
        <Stack>
            <Heading mt="1rem">Tạo băng chuyền mới </Heading>
            <FormControl
                mb="0.5rem"
                >
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

                {
                    imagePreview && <Image src={imagePreview} alt='' preview={false} style={{height : "260px"}}/>
                }
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
                <Switch onChange={(e) => handleChangeActive(e)} checked={isActive}/>
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
                    'Save'
                )}
            </Button>
        </Stack>
    );
};

export default FormAdd;
