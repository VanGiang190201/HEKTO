import {
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
import { toast } from 'react-toastify';
import bookingApi from '../../API/bookingApi';
import listingApi, { IListingGet } from '../../API/listingApi';
import { useAppDispatch } from '../../Redux/hooks';
interface FormAddBookingProps {
    setListBooking?: any;
}

const FormAddBooking: React.FunctionComponent<FormAddBookingProps> = (
    props,
) => {
    const { setListBooking } = props;
    const [listingId, setListingId] = React.useState<number>(0);
    const [informationListChose, setInformationListChose] = React.useState<any>(
        {},
    );
    const [startAt, setStartAt] = React.useState<string>('');
    const [endAt, setEndAt] = React.useState<string>('');
    const [listing, setListing] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    React.useEffect(() => {
        listingApi.getAllListing().then((res) => setListing(res.data));
    }, []);

    React.useEffect(() => {
        listingApi
            .getListingById(listingId)
            .then((res: any) => setInformationListChose(res.data));
    }, [listingId]);
    const dispatch = useAppDispatch();
    console.log(informationListChose, listingId);
    const handleChangeListing = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setListingId(Number(e.target.value));
    };
    const handleChangeStartAt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStartAt(e.target.value);
    };
    const handleChangeEndAt = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEndAt(e.target.value);
    };

    const handleAddNewBooking = () => {
        let newBooking = {
            listingId,
            startAt,
            endAt,
        };
        setIsLoading(true);
        bookingApi
            .bookingNew(newBooking)
            .then((res) => {
                setIsLoading(false);
                toast.success('Add new booking success', {
                    position: 'top-right',
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                });
                bookingApi.myBooking().then((res) => {
                    setListBooking(res.data);
                });
            })
            .catch((error) => setIsLoading(false));
    };
    return (
        <Stack>
            <Heading mt="1rem">Booking </Heading>
            <FormControl
                mb="0.5rem"
                isRequired
            >
                <FormLabel
                    fontSize="1.5rem"
                    mb="0.6rem"
                >
                    Listing
                </FormLabel>
                <Select
                    height="4rem"
                    fontSize="1.4rem"
                    mb="0.6rem"
                    placeholder="Select listing"
                    onChange={(e) => handleChangeListing(e)}
                >
                    {listing.map((item: IListingGet) => (
                        <option
                            key={item.id}
                            value={`${item.id}`}
                        >
                            {`${item.id}--${item.car.name}`}
                        </option>
                    ))}
                </Select>
            </FormControl>
            {Object.keys(informationListChose).length > 0 && (
                <Stack
                    bg="#ccc"
                    p="1rem 2rem"
                >
                    <Text fontWeight="600">Information of listing</Text>
                    <Stack padding="0 1rem">
                        <FormLabel
                            fontSize="1.4rem"
                            mb="0.6rem"
                        >
                            Available start time
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            cursor="auto"
                            fontSize="1.4rem"
                            readOnly={true}
                            value={moment(informationListChose.startAt).format(
                                'YYYY/MM/DD, h:mm:ss a',
                            )}
                        />
                        <FormLabel
                            fontSize="1.4rem"
                            mb="0.6rem"
                        >
                            Available end time
                        </FormLabel>
                        <Input
                            type="text"
                            h="4rem"
                            fontSize="1.4rem"
                            cursor="auto"
                            readOnly={true}
                            value={moment(informationListChose.endAt).format(
                                'YYYY/MM/DD, h:mm:ss a',
                            )}
                        />
                    </Stack>
                </Stack>
            )}
            <FormControl
                id="branch"
                mb="0.5rem"
                isRequired
            >
                <FormLabel
                    fontSize="1.5rem"
                    mb="0.6rem"
                >
                    Start at
                </FormLabel>
                <Input
                    type="datetime-local"
                    h="4rem"
                    fontSize="1.4rem"
                    onChange={(e) => handleChangeStartAt(e)}
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
                    End at
                </FormLabel>
                <Input
                    type="datetime-local"
                    h="4rem"
                    fontSize="1.4rem"
                    onChange={(e) => handleChangeEndAt(e)}
                />
            </FormControl>

            <Button
                colorScheme="blue"
                w="10rem"
                h="3.6rem"
                fontSize="1.4rem"
                style={{ marginTop: '2rem' }}
                onClick={handleAddNewBooking}
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

export default FormAddBooking;
