import * as React from 'react';
import { Box } from '@chakra-ui/react';
// import BreadCrumb from '../Components/BreadCrump';
import SidebarWithHeader from '../Components/Sidebar';

interface IDefaultLayoutProps {
    children: React.ReactElement;
}

const DefaultLayout: React.FunctionComponent<IDefaultLayoutProps> = ({
    children,
}) => {
    return (
        <>
            <SidebarWithHeader>
                <Box mt="54px">
                    {/* <Box p="0 60px">
                        <BreadCrumb />
                    </Box> */}
                    <Box>{children}</Box>
                </Box>
            </SidebarWithHeader>
        </>
    );
};

export default DefaultLayout;
