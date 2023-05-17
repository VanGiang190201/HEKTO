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


interface FormViewProps {
    id: number;
 
}

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id } = props;
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
                setDescription(res.description_feature);
                setImagePreview(res.image_feature);
                setIsActive(res.active);
            })
            .catch((error) => setIsLoading(false));
    }, [isChange]);
    

    
    return (
        <Style.Wrapper>
            <Stack>
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
                        value={description}
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

export default FormView;
