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
import {
    
    useDisclosure,
} from '@chakra-ui/react';

interface FormViewProps {
    id: number;
    
}

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id } = props;
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isActive, setIsActive] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const { onClose } = useDisclosure();
    
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
            })
            .catch((error) => setIsLoading(false));
    }, []);
    return (
        <Stack>
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
                    isReadOnly
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
                    isReadOnly
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
                    checked={isActive}
                />
            </FormControl>
        </Stack>
    );
};

export default FormView;
