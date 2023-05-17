import {
    Box,
    Avatar,
    BoxProps,
    CloseButton,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Icon,
    IconButton,
    Text,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { ReactNode, ReactText } from 'react';
import { IconType } from 'react-icons';
import {
    FaAdversal,
    FaBell,
    FaBlog,
    FaBoxes,
    FaBuysellads,
    FaCarSide,
    FaFacebookMessenger,
    FaFeatherAlt,
    FaHeadset,
    FaImage,
    FaInbox,
    FaMoon,
    FaPhotoVideo,
    FaShippingFast,
    FaSlidersH,
    FaStar,
    FaUserFriends,
    FaUserTie,
    FaWallet,
} from 'react-icons/fa';
import { FiHome, FiLogOut, FiMenu, FiStar, FiTrendingUp } from 'react-icons/fi';
import { NavLink, useLocation } from 'react-router-dom';
import { Button } from 'antd';
import styled from 'styled-components';

import { config } from '../../../Configs';
import { useAppDispatch, useAppSelector } from '../../../Redux/hooks';
import { logout } from '../../../Redux/slices';
import {
    clearStoredAuth,
    getStoredUser,
} from '../../../Utils/helper/localStorage';

interface LinkItemProps {
    name: string;
    icon: IconType;
    url: string;
}

const LinkItemsAdmin: Array<LinkItemProps> = [
    { name: 'Trang chủ', icon: FiHome, url: config.routes.home },
    {
        name: 'Khách hàng',
        icon: FaUserFriends,
        url: config.routes.customers,
    },
    { name: 'Nhân viên', icon: FaUserTie, url: config.routes.workers },
    { name: 'Thể loại', icon: FaStar, url: config.routes.portfolios },
    {
        name: 'Danh mục',
        icon: FaBoxes,
        url: config.routes.category,
    },
    { name: 'Sản phẩm', icon: FaInbox, url: config.routes.product },
    { name: 'Đơn hàng', icon: FaShippingFast, url: config.routes.order },
    {
        name: 'Quảng cáo',
        icon: FaAdversal,
        url: config.routes.advertisement,
    },
    { name: 'Tính năng', icon: FaFeatherAlt, url: config.routes.features },
    { name: 'Bài viết', icon: FaBlog, url: config.routes.blog },
    { name: 'Băng chuyền', icon: FaSlidersH, url: config.routes.slider },
    { name: 'Tư vấn', icon: FaHeadset, url: config.routes.meeting },
    {
        name: 'Sản phẩm cùng loại',
        icon: FaImage,
        url: config.routes.imageProduct,
    },
    { name: 'Video sản phẩm', icon: FaPhotoVideo, url: config.routes.video },
    { name: 'Thông báo', icon: FaBell, url: config.routes.notification },
];

const LinkItemsStaff: Array<LinkItemProps> = [
    { name: 'Trang chủ', icon: FiHome, url: config.routes.home },
    {
        name: 'Khách hàng',
        icon: FaUserFriends,
        url: config.routes.customers,
    },

    { name: 'Thể loại', icon: FaStar, url: config.routes.portfolios },
    {
        name: 'Danh mục',
        icon: FaBoxes,
        url: config.routes.category,
    },
    { name: 'Sản phẩm', icon: FaInbox, url: config.routes.product },
    { name: 'Đơn hàng', icon: FaShippingFast, url: config.routes.order },
    {
        name: 'Quảng cáo',
        icon: FaAdversal,
        url: config.routes.advertisement,
    },
    { name: 'Tính năng', icon: FaFeatherAlt, url: config.routes.features },
    { name: 'Bài viết', icon: FaBlog, url: config.routes.blog },
    { name: 'Băng chuyền', icon: FaSlidersH, url: config.routes.slider },
    { name: 'Tư vấn', icon: FaHeadset, url: config.routes.meeting },
    {
        name: 'Sản phẩm cùng loại',
        icon: FaImage,
        url: config.routes.imageProduct,
    },
    { name: 'Video sản phẩm', icon: FaPhotoVideo, url: config.routes.video },
    { name: 'Thông báo', icon: FaBell, url: config.routes.notification },
];

export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const user = getStoredUser();
    return (
        <Box
            minH="100vh"
            bg={useColorModeValue('gray.100', 'gray.900')}
        >
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>

            {/* mobilenav */}
            <MobileNav
                onOpen={onOpen}
                user={user}
            />
            <Box
                ml={{ base: 0, md: 60 }}
                p="4"
            >
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    const dispatch = useAppDispatch();
    const user = getStoredUser();
    return (
        <Wrapper>
            <Box
                transition="3s ease"
                bg={useColorModeValue('white', 'gray.900')}
                borderRight="1px"
                borderRightColor={useColorModeValue('gray.200', 'gray.700')}
                // w={{ base: 'full', md: 60 }}
                w="20rem"
                pos="fixed"
                zIndex="10"
                h="full"
                {...rest}
            >
                <Flex
                    h="20"
                    alignItems="center"
                    mx="8"
                    mt="2rem"
                    justifyContent="space-between"
                >
                    <Text
                        fontSize="3.6rem"
                        fontFamily="monospace"
                        fontWeight="bold"
                    >
                        HEKTO
                    </Text>
                    <CloseButton
                        display={{ base: 'flex', md: 'none' }}
                        onClick={onClose}
                    />
                </Flex>
                <Box
                    style={{ overflowY: 'auto', maxHeight: '80%' }}
                    className="scroll"
                >
                    {user.role == 1
                        ? LinkItemsAdmin.map((link) => (
                              <NavItem
                                  key={link.name}
                                  icon={link.icon}
                                  href={link.url}
                                  style={
                                      location.pathname == link.url
                                          ? {
                                                background: '#0bc5ea',
                                                color: '#fff',
                                            }
                                          : {}
                                  }
                              >
                                  {link.name}
                              </NavItem>
                          ))
                        : LinkItemsStaff.map((link) => (
                              <NavItem
                                  key={link.name}
                                  icon={link.icon}
                                  href={link.url}
                                  style={
                                      location.pathname == link.url
                                          ? {
                                                background: '#0bc5ea',
                                                color: '#fff',
                                            }
                                          : {}
                                  }
                              >
                                  {link.name}
                              </NavItem>
                          ))}
                </Box>
                <Button
                    onClick={() => {
                        dispatch(logout());
                        clearStoredAuth();
                        window.location.href = config.routes.login;
                    }}
                    style={{
                        margin: '16px 0 0 14px',
                        height: '40px',
                        width: '80%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Icon
                        mr="4"
                        fontSize="20"
                        fontWeight={700}
                        as={FiLogOut}
                    />{' '}
                </Button>
            </Box>
        </Wrapper>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    href: string;
    children: ReactText;
}

const NavItem = ({ icon, children, href, ...rest }: NavItemProps) => {
    return (
        <NavLink
            to={href}
            style={{
                textDecoration: 'none',
            }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                mt="1.6rem"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </NavLink>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
    user: any;
}
const MobileNav = ({ onOpen, user, ...rest }: MobileProps) => {
    const handleClickWallet = () => {
        window.open("https://sandbox.vnpayment.vn/merchantv2/Users/Login.htm","_blank")
    };

    const handleClickMessage = () => {
        window.open(
            'https://dashboard.tawk.to/#/inbox/636a79bedaff0e1306d66170/all',
            '_blank',
        );
    };
    return (
        <Flex
            p="0 8rem"
            height="6rem"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between' }}
            position="fixed"
            top="0"
            w="full"
            zIndex="9"
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Flex
                gap="40px"
                ml="140px"
            >
                <FaWallet
                    fontSize="24px"
                    cursor="pointer"
                    color="#3182ce"
                    onClick={handleClickWallet}
                />
                <FaFacebookMessenger
                    fontSize="24px"
                    cursor="pointer"
                    color="#3182ce"
                    onClick={handleClickMessage}
                />
            </Flex>

            <HStack spacing={{ base: '0', md: '6' }}>
                <Button>
                    <FaMoon />
                </Button>
                <Flex alignItems={'center'}>
                    <HStack>
                        <Avatar
                            size={'lg'}
                            src={user?.avatar}
                        />
                        <VStack
                            display={{ base: 'none', md: 'flex' }}
                            alignItems="flex-start"
                            spacing="1px"
                            ml="4rem"
                        >
                            <Text
                                fontSize="1.6rem"
                                fontWeight={'500'}
                            >
                                {user?.display_name}
                            </Text>
                            <Text
                                fontSize="lg"
                                color="gray.600"
                                fontStyle={'500'}
                            >
                                {user?.role == 1
                                    ? 'Quản trị viên'
                                    : 'Nhân viên'}
                            </Text>
                        </VStack>
                    </HStack>
                </Flex>
            </HStack>
        </Flex>
    );
};

const Wrapper = styled.div`
    .scroll {
        ::-webkit-scrollbar {
            border-radius: 0;
            width: 8px;
        }

        ::-webkit-scrollbar-thumb {
            border-radius: 4px;
            background-color: rgba(0, 0, 0, 0.15);
        }

        ::-webkit-scrollbar-track {
            border-radius: 0;
            background-color: rgba(0, 0, 0, 0);
        }
    }
`;
