import {
    Box,
    Button,
    Flex,
    FormControl,
    FormHelperText,
    FormLabel,
    Heading,
    Input,
    Spinner,
    Stack,
    Text,
    useColorModeValue,
} from '@chakra-ui/react';
import * as React from 'react';
import * as yup from 'yup';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import authApi, { IAuthBody } from '../../API/authApi';
import { useAppDispatch } from '../../Redux/hooks';
import { login } from '../../Redux/slices/auth';
import Wrapper from './Login.style';
import { setStoredAuth, setStoredUserInformation } from '../../Utils/helper/localStorage';
import { config } from '../../Configs';

interface LoginProps {}

interface IFormLogin {
    email: string;
    password: string;
}

const Login: React.FunctionComponent<LoginProps> = () => {
    const dispatch = useAppDispatch();
    const [isLoading, setIsLoading] = React.useState(false);

    const schemaLogin = yup.object().shape({
        email: yup
            .string()
            .required('Email is required!')
            .email('Enter a valid mail!'),
        password: yup.string().required('Password is required!'),
    });

    const {
        register,
        handleSubmit,
        formState: { errors, dirtyFields, isSubmitted },
        getFieldState,
    } = useForm<IFormLogin>({
        resolver: yupResolver(schemaLogin),
        mode: 'onTouched',
    });

    const onSubmit = (data: IAuthBody) => {
        console.log(data);
        setIsLoading(true);

        authApi.login(data)
            .then((res) => {
                if (res.access_token) {
                    setIsLoading(false);
                    setStoredAuth(res.access_token);
                    setStoredUserInformation(res);
                    window.location.href = '/';
                }
            })
            .catch(() => {
                setIsLoading(false);
                toast.error(`Invalid email or username`, {
                    position: 'top-right',
                    autoClose: 800,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
            });
    };

    return (
        <Wrapper>
            <Flex
                minH={'100vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
            >
                <Stack w="48rem">
                    <Stack
                        align={'center'}
                        mb="2rem"
                    >
                        <Heading fontSize="3rem">
                            Sign in to your account
                        </Heading>
                        <Text
                            fontSize="1.7rem"
                            color={'gray.600'}
                            fontWeight="600"
                        >
                            to manage HEKTO{' '}
                            {/* <Link color={'blue.400'}>features</Link> */}
                            ✌️
                        </Text>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={12}
                        h="34rem"
                    >
                        <Stack spacing={4}>
                            <FormControl
                                id="email"
                                mb="1rem"
                                // isRequired
                                onSubmit={handleSubmit(onSubmit)}
                            >
                                <FormLabel
                                    fontSize="1.5rem"
                                    mb="0.6rem"
                                >
                                    Email address
                                </FormLabel>
                                <Input
                                    type="email"
                                    h="4rem"
                                    fontSize="1.4rem"
                                    id="email"
                                    // register={register}
                                    // errors={errors}
                                    {...register('email')}
                                    placeholder="Email address"
                                />
                                {((dirtyFields.email &&
                                    errors &&
                                    errors.email) ||
                                    isSubmitted) && (
                                    <FormHelperText
                                        color="red"
                                        fontSize="1.3rem"
                                    >
                                        {errors.email?.message &&
                                            errors.email?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl
                                id="password"
                                mb="1rem"
                                // isRequired
                            >
                                <FormLabel
                                    fontSize="1.5rem"
                                    mb="0.6rem"
                                >
                                    Password
                                </FormLabel>
                                <Input
                                    type="password"
                                    h="4rem"
                                    fontSize="1.4rem"
                                    placeholder="Password"
                                    {...register('password')}
                                />
                                {((dirtyFields.password &&
                                    errors &&
                                    errors.password) ||
                                    isSubmitted) && (
                                    <FormHelperText
                                        color="red"
                                        fontSize="1.3rem"
                                    >
                                        {errors.password?.message &&
                                            errors.password?.message}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <Stack spacing={10}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}
                                ></Stack>
                                <Button
                                    bg={'blue.400'}
                                    color={'white'}
                                    h="4rem"
                                    fontSize="1.6rem"
                                    _hover={{
                                        bg: 'blue.500',
                                    }}
                                    onClick={handleSubmit(onSubmit)}
                                    type="submit"
                                    disabled={
                                        !!errors.email || !!errors.password
                                    }
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
                                        'Sign in'
                                    )}
                                </Button>
                            </Stack>
                        </Stack>
                        {/* <LoginForm /> */}
                    </Box>
                </Stack>
            </Flex>
        </Wrapper>
    );
};

export default Login;
