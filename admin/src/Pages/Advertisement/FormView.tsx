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
    Box,
} from '@chakra-ui/react';
import * as React from 'react';
import { toast } from 'react-toastify';
import { Image, InputNumber, Switch } from 'antd';


import adsApi from '../../API/advertisementApi';

interface FormViewProps {
    id: number;
    
}

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id} = props;
    const [heading, setHeading] = React.useState<string>('');
    const [headingPrev, setHeadingPrev] = React.useState<string>('');
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
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
                        isReadOnly
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
                        Hình ảnh 1
                    </FormLabel>

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

                    <Box style={{padding : '1rem'}}>
                        <div
                            dangerouslySetInnerHTML={{
                                __html: description ?? '',
                            }}
                        />
                    </Box>
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
