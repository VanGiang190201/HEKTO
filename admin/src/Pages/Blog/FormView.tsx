import {
    Box,
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

import { Image, Switch } from 'antd';

import styled from 'styled-components';
import blogApi from '../../API/blogApi';

interface FormViewProps {
 
    id : number;
}

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id } = props;
    const [title, setTitle] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [timeRelease, setTimeRelease] = React.useState<string>('');
    const [author, setAuthor] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isChange, setIsChange] = React.useState<boolean>(false);
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [headingPrev, setHeadingPrev] = React.useState<string>('');

    React.useEffect(() => {
        setIsLoading(true);
        blogApi
            .getDetail(id)
            .then((res: any) => {
                setIsLoading(false);
                setTitle(res.title_blog);
                setHeadingPrev(res.title_blog);
                setAuthor(res.author_blog);
                setTimeRelease(res.time_release);
                setDescription(res.description_blog);
                setImagePreview(res.image_blog);
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
                        Tiêu đề
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        isReadOnly
                        value={title}
                        
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
                        isReadOnly
                        value={author}
                        
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
                        value={timeRelease}
                        isReadOnly
                        fontSize="1.4rem"
                     
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
