import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Box,
    Button,
    Spinner,
    Text,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react-use-disclosure';
import TextArea from 'antd/es/input/TextArea';
import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import sliderApi from '../../API/sliderApi';
import productApi from '../../API/productApi';
import categoryApi from '../../API/categoryApi';
import portfoliosApi from '../../API/portfoliosApi';
import adsApi from '../../API/advertisementApi';
import featuresApi from '../../API/featuresApi';
import orderApi from '../../API/orderApi';
import workerApi from '../../API/workerApi';
import imageApi from '../../API/imageApi';
import videoApi from '../../API/videoApi';
import blogApi from '../../API/blogApi';

interface AlertDialogProps {
    ref?: any;
    setSliders?: any;
    setProducts?: any;
    setCategories?: any;
    setPortfolios?: any;
    setAds?: any;
    setFeatures?: any;
    orderCancel?: boolean;
    setOrders?: any;
    setWorkers?: any;
    setImages ?: any;
    setVideos ?: any;
    setBlogs ?: any;
    type?: string;
}

const Wrapper = styled.div``;
const AlertDialoger: React.FunctionComponent<AlertDialogProps> = forwardRef(
    (props, ref) => {
        const {
            type,
            setSliders,
            setProducts,
            setCategories,
            setPortfolios,
            setFeatures,
            setAds,
            orderCancel,
            setOrders,
            setImages,
            setWorkers,
            setBlogs,
            setVideos
        } = props;
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [id, setId] = React.useState<number>(0);
        const [isLoading, setIsLoading] = React.useState<boolean>(false);
        const [reason, setReason] = React.useState<string>('');

        const location = useLocation();
        const cancelRef: any = React.useRef();
        useImperativeHandle(ref, () => ({
            openAlertDialoger(id: number) {
                setId(id);
                onOpen();
            },
        }));
        let title = 'Xác nhận xóa';
        if (location.pathname == '/booking') {
            title = 'Cancel booking';
        }
        if (type == 'cancel' && location.pathname == '/request-booking') {
            title = 'Cancel request booking';
        }
        if (type == 'confirm' && location.pathname == '/request-booking') {
            title = 'Confirm request booking';
        }

        //handle delete slider
        const handleDeleteSlider = () => {
            setIsLoading(true);
            sliderApi
                .deleteSlider(id)
                .then((res) => {
                    setIsLoading(false);
                    toast.success(`Xóa băng chuyền thành công`, {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setSliders(res);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete product

        const handleDeleteProduct = () => {
            setIsLoading(true);
            productApi
                .deleteProduct(id)
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
                    setProducts(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete category
        const handleDeleteCategory = () => {
            setIsLoading(true);
            categoryApi
                .deleteCategory(id)
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
                    setCategories(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete portfolio
        const handleDeletePortfolio = () => {
            setIsLoading(true);
            portfoliosApi
                .deletePortfolio(id)
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
                    setPortfolios(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete ad
        const handleDeleteAd = () => {
            setIsLoading(true);
            adsApi
                .deleteAd(id)
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
                    setAds(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete feature
        const handleDeleteFeature = () => {
            setIsLoading(true);
            featuresApi
                .deleteFeature(id)
                .then((res) => {
                    console.log(res);
                    setIsLoading(false);
                    toast.success(res.message, {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setFeatures(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };
        //handle Cancel order

        const handleCancelOrder = () => {
            setIsLoading(true);
            orderApi
                .cancelBill(id, { status: 0, note: reason })
                .then((res) => {
                    console.log(res);
                    setIsLoading(false);
                    toast.success(res.message, {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    orderApi
                        .changeStatusOrder(id, { status: 7 })
                        .then((res) => {
                            console.log(res);
                            onClose();
                            setOrders(res.data);
                        })
                        .catch((error) => setIsLoading(false));
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete worker

        const handleDeleteWorker = () => {
            setIsLoading(true);
            workerApi
                .deleteWorker(id)
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
                    setWorkers(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete image

        const handleDeleteImage = () => {
            setIsLoading(true);
            imageApi
                .deleteImage(id)
                .then((res) => {
                    setIsLoading(false);
                    console.log(res.data);
                    
                    toast.success(res.message, {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setImages(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete video
        const handleDeleteVideo = () => {
            setIsLoading(true);
            videoApi
                .delete(id)
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
                    setVideos(res.data);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        //handle delete blog
        const handleDeleteBlog = () => {
            setIsLoading(true);
            blogApi
                .deleteBlog(id)
                .then((res) => {
                    setIsLoading(false);
                    toast.success('Xóa bài viết thành công', {
                        position: 'top-right',
                        autoClose: 1000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setBlogs(res);
                    onClose();
                })
                .catch((error) => setIsLoading(false));
        };

        const handleChangeReason = (
            e: React.ChangeEvent<HTMLTextAreaElement>,
        ) => {
            setReason(e.target.value);
        };

        return (
            <Wrapper>
                <AlertDialog
                    isOpen={isOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader
                                fontSize="1.6rem"
                                fontWeight="bold"
                            >
                                {title}
                            </AlertDialogHeader>

                            <AlertDialogBody>
                                Việc này ảnh hưởng đến các bản ghi khác có liên
                                quan ⚓ Bạn có chắc chắn xóa nó ?
                                {orderCancel && (
                                    <Box style={{ marginTop: '10px' }}>
                                        <Text style={{ fontWeight: '700' }}>
                                            Lý do hủy đơn
                                        </Text>
                                        <TextArea
                                            placeholder="Lý do..."
                                            style={{ marginTop: '10px' }}
                                            rows={4}
                                            onChange={(e) =>
                                                handleChangeReason(e)
                                            }
                                        />
                                    </Box>
                                )}
                            </AlertDialogBody>

                            <AlertDialogFooter>
                                <Button
                                    ref={cancelRef}
                                    onClick={onClose}
                                    w="8rem"
                                    h="3rem"
                                    fontSize="1.2rem"
                                    outline="none"
                                    _focus={{ outline: 'none' }}
                                >
                                    Hủy
                                </Button>
                                {/* Button xóa slider  */}
                                {location.pathname == '/slider' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteSlider}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa product */}
                                {location.pathname == '/product' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteProduct}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa danh mục */}
                                {location.pathname == '/category' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteCategory}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa thể loại */}
                                {location.pathname == '/portfolios' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeletePortfolio}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa quảng cáo */}
                                {location.pathname == '/advertisement' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteAd}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa feature */}
                                {location.pathname == '/feature' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteFeature}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button hủy đơn */}
                                {location.pathname == '/order' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleCancelOrder}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Hủy đơn'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa worker */}
                                {location.pathname == '/worker' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteWorker}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa image */}
                                {location.pathname == '/image' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteImage}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa video */}
                                {location.pathname == '/video' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteVideo}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}

                                {/* Button xóa blog */}
                                {location.pathname == '/blog' && (
                                    <Button
                                        colorScheme="red"
                                        onClick={handleDeleteBlog}
                                        ml={3}
                                        w="8rem"
                                        h="3rem"
                                        fontSize="1.2rem"
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
                                            'Xóa'
                                        )}
                                    </Button>
                                )}
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </Wrapper>
        );
    },
);

export default AlertDialoger;
