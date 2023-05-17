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
import carApi, { ICarGet } from '../../API/carApi';
import { useAppDispatch } from '../../Redux/hooks';
import { editCarById, getCarById } from '../../Redux/slices';
interface FormEditCarProps {
    idCar: number;
    setListCar: any;
}

const FormEditCar: React.FunctionComponent<FormEditCarProps> = (props) => {
    const { idCar, setListCar } = props;
    const [namePrev, setNamePrev] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [brand, setBrand] = React.useState<string>('');
    const [build, setBuild] = React.useState<string>('');
    const [year, setYear] = React.useState<number>();
    const [model, setModel] = React.useState<string>('');
    const [location, setLocation] = React.useState<string>('');
    const [dayPrice, setDayPrice] = React.useState<number>();
    const [isFeatured, setIsFeature] = React.useState<boolean>(true);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const dispatch = useAppDispatch();
    React.useEffect(() => {
        setIsLoading(true);
        dispatch(getCarById(idCar))
            .unwrap()
            .then((res: ICarGet) => {
                setIsLoading(false);
                setName(res.name);
                setNamePrev(res.name);
                setBrand(res.brand);
                setBuild(res.build);
                setYear(res.year);
                setModel(res.model);
                setLocation(res.location);
                setDayPrice(res.dayPrice);
                setIsFeature(res.isFeatured);
            })
            .catch((error) => setIsLoading(false));
    }, []);
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
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

    const handleUpdateCar = () => {
        let updateCar = {
            name: name,
            brand: brand,
            build: build,
            year: year,
            model: model,
            location: location,
            dayPrice: dayPrice,
            isFeatured: isFeatured,
        };
        dispatch(editCarById({ id: idCar, data: updateCar }))
            .unwrap()
            .then((res) => {
                setNamePrev(name)
                toast.success(`Update ${namePrev} success`, {
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
            .catch((error) => console.log(error));
    };
    return (
        <Stack>
            <Heading mt="1rem">{`Edit ${namePrev}`}</Heading>

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
                        Name
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        defaultValue={name}
                        onChange={(e) => handleChangeName(e)}
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
                        Brand
                    </FormLabel>
                    <Input
                        type="text"
                        h="4rem"
                        fontSize="1.4rem"
                        defaultValue={brand}
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
                    defaultValue={build}
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
                        defaultValue={year}
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
                        defaultValue={model}
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
                    defaultValue={location}
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
                    defaultValue={dayPrice}
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
                    value={isFeatured ? 'true' : 'false'}
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
                onClick={handleUpdateCar}
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
                    'Update'
                )}
            </Button>
        </Stack>
    );
};

export default FormEditCar;
