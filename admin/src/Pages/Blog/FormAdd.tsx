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
import sliderApi from '../../API/sliderApi';

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import styled from 'styled-components';
import blogApi from '../../API/blogApi';

interface FormAddProps {
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormAdd: React.FunctionComponent<FormAddProps> = (props) => {
    const { setIsChangeList, isChangeList } = props;
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [timeRelease, setTimeRelease] = React.useState<string>('');
    const [author, setAuthor] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };
    const handleChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAuthor(e.target.value);
    };
    const handleChangeTime = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTimeRelease(e.target.value);
    };

    const handleUploadImage = (e: any) => {
        setImage(e.target.files[0]);
        setImagePreview(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = () => {
        const data = new FormData();
        data.append('title_blog', title);
        data.append('description_blog', description);
        data.append('author_blog', author);
        data.append('time_release', timeRelease);
        data.append('image_blog', image);
           blogApi
            .create(data)
            .then((res) => {
                setIsLoading(false);
                console.log(res);
                toast.success('Thêm bài viết thành công', {
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
                <Heading mt="1rem">Tạo bài viết mới </Heading>
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
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tác giả
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeAuthor(e)}
                    />
                </FormControl>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Thời gian xuất bản
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeTime(e)}
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
