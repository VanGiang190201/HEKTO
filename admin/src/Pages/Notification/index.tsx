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
import { Image, InputNumber, Switch } from 'antd';
import * as React from 'react';

import { toast } from 'react-toastify';
import notificationApi from '../../API/notificationApi';

interface NotificationProps {}
const Notification: React.FunctionComponent<NotificationProps> = (props) => {
    const [title, setTitle] = React.useState<string>('');
    const [message, setMessage] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const fileRef = React.useRef<any>();
    
    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    };

    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const resetInput = () => {
        setTitle("");
        setMessage("");
        setImage("");
        fileRef.current.value = "";
        setImagePreview("");   
    };
    const handleSave = () => {
        setIsLoading(true)
        const data = new FormData()
        data.append('title' , title);
        data.append('message' , message);
        data.append('image' , image);

        notificationApi
        .create(data)
        .then((res) => {
            setIsLoading(false);
            resetInput();

            toast.success(res.message, {
                position: 'top-right',
                autoClose: 1000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
            });
           
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
                <Heading mt="1rem">Tạo thông báo </Heading>
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
                        value={title}
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
                        Nội dung
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        value={message}
                        onChange={(e) => handleChangeMessage(e)}
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
                        Hình ảnh
                    </FormLabel>
                    <Input
                        type="file"
                        h="4rem"
                        ref={fileRef}
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
                        'Gủi'
                    )}
                </Button>
            </Stack>
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
export default Notification;
