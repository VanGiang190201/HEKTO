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
import carApi from '../../API/carApi';
import { useAppDispatch } from '../../Redux/hooks';
import { createCar } from '../../Redux/slices';
interface FormAddCarProps {
    setListCar: any;
}

const FormAddCar: React.FunctionComponent<FormAddCarProps> = (props) => {
    const { setListCar } = props;
    const [brand, setBrand] = React.useState<string>('');
    const [build, setBuild] = React.useState<string>('');
    const [year, setYear] = React.useState<number>(1);
    const [model, setModel] = React.useState<string>('');
    const [location, setLocation] = React.useState<string>('');
    const [dayPrice, setDayPrice] = React.useState<number>(1);
    const [isFeatured, setIsFeature] = React.useState<boolean>(true);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const dispatch = useAppDispatch();
    let newCar = {
        brand,
        build,
        year,
        model,
        location,
        dayPrice,
        isFeatured,
    };

    const handleChangeBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(e.target.value);
    };
    const handleChangeBuild = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBuild(e.target.value);
    };
    const handleChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        setYear(Number(e.target.value));
    };
    const handleChangeModel = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModel(e.target.value);
    };
    const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLocation(e.target.value);
    };
    const handleChangeDayPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDayPrice(Number(e.target.value));
    };
    const handleChangeIsFeature = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let isCheck = e.target.value === 'true';
        setIsFeature(isCheck);
    };

    const handleAddNewCar = () => {
        setIsLoading(true);
        dispatch(createCar(newCar))
            .unwrap()
            .then((res) => {
                setIsLoading(false);
                toast.success('Add new car success', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
                carApi.getMyCars().then((res) => {
                    setListCar(res.data);
                });
            })
            .catch((error) => setIsLoading(false));
    };
    return (
        <Stack>
            <Heading mt="1rem">Add new car</Heading>
            <Flex gap="1rem">
                <FormControl
                    id="branch"
                    mb="0.5rem"
                    isRequired
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Brand
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeBrand(e)}
                    />
                </FormControl>
            </Flex>
            <FormControl
                id="branch"
                mb="0.5rem"
                isRequired
            >
                <FormLabel
                    fontSize="1.5rem"
                    mb="0.6rem"
                >
                    Build
                </FormLabel>
                <Input
                    type="text"
                    h="4rem"
                    fontSize="1.4rem"
                    onChange={(e) => handleChangeBuild(e)}
                />
            </FormControl>
            <Flex gap="1rem">
                <FormControl
                    id="branch"
                    mb="0.5rem"
                    isRequired
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Year
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeYear(e)}
                    />
                </FormControl>
                <FormControl
                    id="branch"
                    mb="0.5rem"
                    isRequired
                >
                    <FormLabel
                        fontSize="1.5rem"
                        mb="0.6rem"
                    >
                        Model
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        onChange={(e) => handleChangeModel(e)}
                    />
                </FormControl>
            </Flex>

            <FormControl
                id="branch"
                mb="0.5rem"
                isRequired
            >
                <FormLabel
                    fontSize="1.5rem"
                    mb="0.6rem"
                >
                    Location
                </FormLabel>
                <Input
                    type="text"
                    h="4rem"
                    fontSize="1.4rem"
                    onChange={(e) => handleChangeLocation(e)}
                />
            </FormControl>
            <FormControl
                id="branch"
                mb="0.5rem"
                isRequired
            >
                <FormLabel
                    fontSize="1.5rem"
                    mb="0.6rem"
                >
                    Price/Day (USD)
                </FormLabel>
                <Input
                    type="text"
                    h="4rem"
                    fontSize="1.4rem"
                    onChange={(e) => handleChangeDayPrice(e)}
                />
            </FormControl>
            <FormControl
                id="branch"
                mb="0.5rem"
                isRequired
            >
                <FormLabel
                    fontSize="1.5rem"
                    mb="0.6rem"
                >
                    Feature
                </FormLabel>
                <Select
                    h="4rem"
                    fontSize="1.4rem"
                    onChange={(e) => handleChangeIsFeature(e)}
                >
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </Select>
            </FormControl>
            <Button
                colorScheme="blue"
                w="10rem"
                h="3.6rem"
                fontSize="1.4rem"
                style={{ marginTop: '2rem' }}
                onClick={handleAddNewCar}
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
                    'Save'
                )}
            </Button>
        </Stack>
    );
};

export default FormAddCar;
