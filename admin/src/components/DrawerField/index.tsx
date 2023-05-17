import {
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    useDisclosure,
} from '@chakra-ui/react';
import * as React from 'react';
import { forwardRef, useImperativeHandle } from 'react';
import { useLocation } from 'react-router-dom';

import Wrapper from './DrawerField.style';

interface DrawerProps {
    ref?: any;
    children: React.ReactNode;
}
const DrawerField: React.FunctionComponent<DrawerProps> = forwardRef(
    (props, ref) => {
        const { children } = props;
        const { isOpen, onOpen, onClose } = useDisclosure();
        const [type, setType] = React.useState<string>('');
        const location = useLocation();
        useImperativeHandle(ref, () => ({
            openDrawer(type ?: any) {
                setType(type);
                onOpen();
            },
        }));
        return (
            <Wrapper>
                <Drawer
                    isOpen={isOpen}
                    placement="right"
                    onClose={onClose}
                    size="xl"
                >
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerCloseButton
                            fontSize="1.4rem"
                            mr="1rem"
                            mt="1rem"
                            tabIndex={-1}
                        />

                        <DrawerBody overflowY="auto" mt="3rem" paddingRight="2.4rem">{children}</DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Wrapper>
        );
    },
);

export default DrawerField;
