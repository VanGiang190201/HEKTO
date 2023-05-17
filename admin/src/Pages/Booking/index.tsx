import {
    Button,
    Flex,
    Heading,
    Spinner,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import moment from 'moment';
import * as React from 'react';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';
import bookingApi, { IBookingGet } from '../../API/bookingApi';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import { useAppDispatch } from '../../Redux/hooks';
import Wrapper from './Booking.style';
import FormAddBooking from './FormAddBooking';
interface BookingProps {}

const Booking: React.FunctionComponent<BookingProps> = () => {
    const childRef: any = React.useRef();
    const cancelBtnRef: any = React.useRef();
    const [listBooking, setListBooking] = React.useState<any>([]);
    const [isLoading, setIsLoading] = React.useState(false);

    const dispatch = useAppDispatch();
    React.useEffect(() => {
        setIsLoading(true);
        bookingApi
            .myBooking()
            .then((res) => {
                setListBooking(res.data);
                setIsLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);
    const handleOpenDrawer = () => {
        childRef.current.openDrawer();
    };
    const handleOpenAlertDialoger = (id: number) => {
        cancelBtnRef.current.openAlertDialoger(id);
    };
    return (
        <Wrapper>
            <div className="container">
                <Stack>
                    <Flex justifyContent="space-between">
                        <Heading fontSize="2.8rem">My booking</Heading>
                    </Flex>
                </Stack>
                <Stack
                    mt="2rem"
                    bg="#fff"
                    p="2rem 2rem"
                    borderRadius="lg"
                >
                    <Flex
                        gap="4rem"
                        justifyContent="space-between"
                    >
                        <Button
                            colorScheme="blue"
                            size="lg"
                            fontSize="1.4rem"
                            w="12rem"
                            h="3.6rem"
                            onClick={() => handleOpenDrawer()}
                        >
                            <FaPlus /> <Text ml="0.4rem">Add new</Text>
                        </Button>
                        {/* <Search placeholder="Enter username" /> */}
                    </Flex>
                </Stack>
                {isLoading ? (
                    <Flex
                        justifyContent={'center'}
                        mt="5rem"
                    >
                        <Spinner
                            thickness="5px"
                            speed="0.65s"
                            emptyColor="gray.200"
                            color="blue.500"
                            size="xl"
                        />
                    </Flex>
                ) : (
                    <TableContainer mt="2rem">
                        <Table size="lg">
                            <Thead>
                                <Tr>
                                    <Th
                                        fontSize="1.2rem"
                                        fontWeight="800"
                                    >
                                        No
                                    </Th>
                                    <Th
                                        fontSize="1.2rem"
                                        fontWeight="800"
                                    >
                                        User
                                    </Th>
                                    <Th
                                        fontSize="1.2rem"
                                        fontWeight="800"
                                    >
                                        Listing
                                    </Th>
                                    <Th
                                        fontSize="1.2rem"
                                        fontWeight="800"
                                    >
                                        Car
                                    </Th>
                                    <Th
                                        fontSize="1.2rem"
                                        fontWeight="800"
                                    >
                                        Status
                                    </Th>
                                    <Th
                                        fontSize="1.2rem"
                                        fontWeight="800"
                                    >
                                        Start at
                                    </Th>
                                    <Th
                                        fontSize="1.2rem"
                                        fontWeight="800"
                                    >
                                        End at
                                    </Th>
                                    <Th></Th>
                                </Tr>
                            </Thead>
                            <Tbody bg="#fff">
                                {listBooking.map(
                                    (booking: IBookingGet, index: number) => (
                                        <Tr
                                            key={booking.id}
                                            _hover={{
                                                background: '#e2e8f0',
                                            }}
                                            h="6.2rem"
                                        >
                                            <Td>{index + 1}</Td>
                                            <Td>{`${booking.user.lastName} ${booking.user.firstName}`}</Td>
                                            <Td>{booking.listing.id}</Td>
                                            <Td>{booking.listing.car.name}</Td>
                                            <Td>{booking.status}</Td>
                                            <Td>
                                                {moment(booking.startAt).format(
                                                    'YYYY/MM/DD, h:mm:ss a',
                                                )}
                                            </Td>
                                            <Td>
                                                {moment(booking.endAt).format(
                                                    'YYYY/MM/DD, h:mm:ss a',
                                                )}
                                            </Td>
                                            <Td>
                                                {booking.status ==
                                                    'confirmed' ||
                                                booking.status ==
                                                    'cancelled' ? (
                                                    ''
                                                ) : (
                                                    <Button
                                                        colorScheme="blue"
                                                        size="lg"
                                                        fontSize="1.4rem"
                                                        w="10rem"
                                                        h="3.6rem"
                                                        onClick={() =>
                                                            handleOpenAlertDialoger(
                                                                booking.id,
                                                            )
                                                        }
                                                    >
                                                        <FaTrashAlt />
                                                        <Text ml="0.4rem">
                                                            Cancel
                                                        </Text>
                                                    </Button>
                                                )}
                                            </Td>
                                        </Tr>
                                    ),
                                )}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
                <DrawerField ref={childRef}>
                    <FormAddBooking setListBooking={setListBooking} />
                </DrawerField>
                <AlertDialoger
                    ref={cancelBtnRef}
                    setListBooking={setListBooking}
                />
            </div>
        </Wrapper>
    );
};

export default Booking;
