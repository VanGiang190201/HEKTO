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
import featuresApi from '../../API/featuresApi';


interface FormEditProps {
    id: number;
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormEdit: React.FunctionComponent<FormEditProps> = (props) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [name, setName] = React.useState<string>('');
    const [namePrev, setNamePrev] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [isChange, setIsChange] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsLoading(true);
        featuresApi
            .getFeature(id)
            .then((res: any) => {
                setIsLoading(false);
                setName(res.name_feature);
                setNamePrev(res.name_feature);
                setDescription(res.description_feature);
                setImagePreview(res.image_feature);
                setIsActive(res.active);
            })
            .catch((error) => setIsLoading(false));
    }, [isChange]);
    

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
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
        data.append('name_feature' , name);
        data.append('description_feature' , description);
        data.append('image_feature' , image);
        data.append('active' , JSON.stringify(isActive));
        featuresApi
            .editFeature(id,data)
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
            <Heading mt="1rem">{`${namePrev}`}</Heading>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tên tính năng
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        value={name}
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
                        value={description}
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
