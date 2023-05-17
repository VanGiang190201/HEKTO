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
import categoryApi, { ICategoryGet } from '../../API/categoryApi';
import portfoliosApi, { IPortfoliosGet } from '../../API/portfoliosApi';

interface FormViewProps {
    id: number;
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormView: React.FunctionComponent<FormViewProps> = (props) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [portfoliosId, setPortfoliosId] = React.useState<number>(0);
    const [image, setImage] = React.useState<any>();
    const [imagePreview, setImagePreview] = React.useState<any>();
    const [portfolios, setPortfolios] = React.useState<IPortfoliosGet[]>([]);

    React.useEffect(() => {
        setIsLoading(true);
        categoryApi
            .getDetailCategory(id)
            .then((res: any) => {
                setIsLoading(false);
                setName(res.name_categories);
                setImagePreview(res.image);
                setDescription(res.description_categories);
                setPortfoliosId(res.portfolios_id);
            })
            .catch((error) => setIsLoading(false));

        portfoliosApi.getAllPortfolios().then((res) => setPortfolios(res.data));
    }, []);

    return (
        <Style.Wrapper>
            <Stack>
                <FormControl mb="0.5rem">
                    <FormLabel
                        fontSize="1.5rem"
                        mt="2rem"
                        mb="0.6rem"
                    >
                        Tên danh mục
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        isReadOnly
                        value={name}
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
                        isReadOnly
                        value={description}
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
                        Thể loại
                    </FormLabel>
                    <Select
                        height="4rem"
                        fontSize="1.4rem"
                        mb="0.6rem"
                        value={portfoliosId}
                        isReadOnly
                        isDisabled
                        placeholder="Chọn thể loại"
                    >
                        {portfolios.map((portfolio: IPortfoliosGet) => (
                            <option
                                key={portfolio.id}
                                value={`${portfolio.id}`}
                            >{`${portfolio.name_portfolios}`}</option>
                        ))}
                    </Select>
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
