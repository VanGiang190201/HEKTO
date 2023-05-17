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
import portfoliosApi, { IPortfoliosGet } from '../../API/portfoliosApi';

interface FormEditProps {
    id: number;
    setIsChangeList?: any;
    isChangeList?: boolean;
}

const FormEdit: React.FunctionComponent<FormEditProps> = (props) => {
    const { id, setIsChangeList, isChangeList } = props;
    const [name, setName] = React.useState<string>('');
    const [description, setDescription] = React.useState<string>('');
    const [isChange, setIsChange] = React.useState<boolean>(false);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [namePrev, setNamePrev] = React.useState<string>('');

    React.useEffect(() => {
        setIsLoading(true);
        portfoliosApi
            .getPortfolio(id)
            .then((res: any) => {
                setIsLoading(false);
                setName(res.name_portfolios);
                setNamePrev(res.name_portfolios);
                setDescription(res.description_portfolios);
            })
            .catch((error) => setIsLoading(false));
    }, [isChange]);

    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    const handleChangeDescription = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setDescription(e.target.value);
    };

    const handleSave = () => {
        portfoliosApi
            .editPortfolio(id, {
                name_portfolios: name,
                description_portfolios: description,
            })
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
                setIsChange(!isChange)
                setIsChangeList(!isChangeList);
            });
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
                        Tên thể loại
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
                        fontSize="1.4rem"
                        value={description}
                        onChange={(e) => handleChangeDescription(e)}
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
