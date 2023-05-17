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

import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import adsApi from '../../API/advertisementApi';

interface FormEditProps {
    id: number;
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormEdit: React.FunctionComponent<FormEditProps> = (props) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [heading, setHeading] = React.useState<string>('');
    const [headingPrev, setHeadingPrev] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [imageFirst, setImageFirst] = React.useState<any>();
    const [imageSecond, setImageSecond] = React.useState<any>();
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [isChange, setIsChange] = React.useState<boolean>(false);

    const [imagePreviewFirst, setImagePreviewFirst] = React.useState<any>();
    const [imagePreviewSecond, setImagePreviewSecond] = React.useState<any>();

    React.useEffect(() => {
        setIsLoading(true);
        adsApi
            .getAd(id)
            .then((res: any) => {
                setIsLoading(false);
                setHeading(res.heading);
                setHeadingPrev(res.heading);
                setTitle(res.title);
                setDescription(res.description);
                setImagePreviewFirst(res.image_first);
                setImagePreviewSecond(res.image_second);
                setIsActive(res.is_used);
            })
            .catch((error) => setIsLoading(false));
    }, [isChange]);

    const handleChangeHeading = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHeading(e.target.value);
    };

    const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleUploadImageFirst = (e: any) => {
        setImageFirst(e.target.files[0]);
        setImagePreviewFirst(URL.createObjectURL(e.target.files[0]));
    };

    const handleChangeActive = (e: any) => {
        setIsActive(e);
    };

    const handleUploadImageSecond = (e: any) => {
        setImageSecond(e.target.files[0]);
        setImagePreviewSecond(URL.createObjectURL(e.target.files[0]));
    };

    const handleSave = () => {
        const data = new FormData();
        data.append('heading', heading);
        data.append('title', title);
        data.append('image_first', imageFirst);
        data.append('image_second', imageSecond);
        data.append('description', description);
        data.append('is_used', JSON.stringify(isActive));
        adsApi
            .editAd(id, data)
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
                setIsChange(!isChange);
                setIsChangeList(!isChangeList);
            })
            .catch((error) => setIsLoading(false));
    };
    return (
        <Style.Wrapper>
            <Stack>
                <Heading mt="1rem">{`${headingPrev}`}</Heading>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Đầu mục
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        value={heading}
                        onChange={(e) => handleChangeHeading(e)}
                    />
                </FormControl>

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
                        Hình ảnh 1
                    </FormLabel>
                    <Input
                        type="file"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleUploadImageFirst(e)}
                    />

                    {imagePreviewFirst && (
                        <Image
                            src={imagePreviewFirst}
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
                        Hình ảnh 2
                    </FormLabel>
                    <Input
                        type="file"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleUploadImageSecond(e)}
                    />

                    {imagePreviewSecond && (
                        <Image
                            src={imagePreviewSecond}
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
                        data={description}
                        onChange={(event, editor) => {
                            const data: string = editor.getData();
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
