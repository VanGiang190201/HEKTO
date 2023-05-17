import {
    Button,
    Flex,
    Heading,
    Spinner,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Box,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';
import * as React from 'react';
import { FaEdit, FaPlus, FaTrashAlt } from 'react-icons/fa';
import carApi, { ICarGet } from '../../API/carApi';
import AlertDialoger from '../../components/AlertDialoger';
import DrawerField from '../../components/DrawerField';
import Search from '../../components/Search';
import { useAppDispatch } from '../../Redux/hooks';
import FormAddCar from './FormAddCar';
import FormEditCar from './FormEditCar';
import Wrapper from './Home.style';
import CardItem from './Components/CardItem';
import statisticalApi from '../../API/statisicalApi';
import { config } from '../../Configs';
interface HomeProps {}

const Home: React.FunctionComponent<HomeProps> = () => {
    const [listStatistical, setListStatistical] = React.useState<any>();

    React.useEffect(() => {
        statisticalApi.getAll().then((res) => setListStatistical(res.data));
    }, []);

    console.log(listStatistical);

    return (
        <Wrapper>
            <Flex
                gap="2rem"
                flexWrap="wrap"
            >
                <CardItem
                    quantity={listStatistical?.users.count}
                    title="Khách hàng"
                    imageSrc="https://cdn.pixabay.com/photo/2016/06/03/15/35/customer-service-1433639__340.png"
                    linkRoute={config.routes.customers}
                />
                <CardItem
                    quantity={listStatistical?.workers.count}
                    title="Nhân viên"
                    imageSrc="https://1office.vn/wp-content/uploads/2019/07/phan-loai-nhan-su.jpg"
                    linkRoute={config.routes.workers}
                />
                <CardItem
                    quantity={listStatistical?.portfolios.count}
                    title="Thể loại sản phẩm"
                    imageSrc="https://delilegend.com/img_data/images/tai-sao-nen-su-dung-do-go-noi-that.jpg"
                    linkRoute={config.routes.portfolios}
                />
                <CardItem
                    quantity={listStatistical?.categories.count}
                    title="Danh mục sản phẩm"
                    imageSrc="https://housedesign.vn/wp-content/uploads/2019/12/do-go-noi-that.jpg"
                    linkRoute={config.routes.category}
                />
                <CardItem
                    quantity={listStatistical?.products.count}
                    title="Sản phẩm thương hiệu"
                    imageSrc="https://zsofa.vn/wp-content/uploads/2018/10/sofa-giuong-goc.jpg"
                    linkRoute={config.routes.product}
                />
                <CardItem
                    quantity={listStatistical?.orders.count}
                    title="Đơn hàng đang hoạt động"
                    imageSrc="https://d2kh7o38xye1vj.cloudfront.net/wp-content/uploads/2021/10/banner-tracking.png"
                    linkRoute={config.routes.order}
                />
                <CardItem
                    quantity={listStatistical?.blogs.count}
                    title="Bài viết"
                    imageSrc="https://img.freepik.com/free-vector/blogging-fun-content-creation-online-streaming-video-blog-young-girl-making-selfie-social-network-sharing-feedback-self-promotion-strategy-vector-isolated-concept-metaphor-illustration_335657-855.jpg"
                    linkRoute={config.routes.blog}
                />
                <CardItem
                    quantity={listStatistical?.features.count}
                    title="Tính năng"
                    linkRoute={config.routes.features}
                    imageSrc="https://thumbs.dreamstime.com/b/features-small-chalkboard-d-top-view-office-desk-stationery-red-business-concept-79426604.jpg"
                />
                <CardItem
                    quantity={listStatistical?.meeting.count}
                    title="Cuộc gặp cần sắp xếp"
                    linkRoute={config.routes.meeting}
                    imageSrc="https://cdn.nhanlucnganhluat.vn/uploads/tin-tuc/2021/01/27/anh-facebook-360-200/Nh%C3%A2n%20vi%C3%AAn%20t%C6%B0%20v%E1%BA%A5n%20l%C3%A0%20g%C3%AC%20v%C3%A0%20b%E1%BA%A3ng%20m%C3%B4%20t%E1%BA%A3%20c%C3%B4ng%20vi%E1%BB%87c%20chi%20ti%E1%BA%BFt.jpg"
                />
            </Flex>
        </Wrapper>
    );
};

export default Home;
