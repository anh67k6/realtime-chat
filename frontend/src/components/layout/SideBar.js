import {
  Avatar,
  Box,
  CloseButton,
  Drawer,
  DrawerContent,
  Flex,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorModeValue,
  useDisclosure,
  useMediaQuery,
} from "@chakra-ui/react";

import { useContext, useState } from "react";
import { AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import { FiChevronDown, FiMenu, FiSettings } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";

const LinkItems = [{ name: "Settings", icon: FiSettings, to: "/" }];

export const NavSize = {
  SMALL: "sm",
  LARGE: "lg",
};

export default function Sidebar({ children }) {

  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        placement="left"
        size="full"
      >
        <DrawerContent>
          <SidebarContent
          />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <Box ml={{ base: 0, md:"60px" }}>
        {children}
      </Box>

    </Box>
  );
}

const SidebarContent = ({
  setNavSize,
  navSize,
  isMoblie,
  ...rest
}) => {

  const dispatch = useDispatch();

  const handleSignout = () => {
    console.log("Sign out");
    // localStorage.clear();
    // // navigate log in
    // socketService?.disconnect();
    // dispatch(logOut());
  };
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: navSize === NavSize.LARGE ? "240px" : "60px" }}
      pos="fixed"
      h="full"
      zIndex={1}
      {...rest}
    >
      <Flex h="full" direction="column" justifyContent="space-between">
        <Flex
          h="20"
          w="full"
          align="center"
          justify={navSize === NavSize.LARGE ? "start" : "center"}
          mx={navSize === NavSize.LARGE ? 8 : 0}
        >
          <HStack>
            <Avatar
              name={userInfo?.name}
              // src={`${BASE_URL}/${userInfo?.photo}`}
              size="sm"
            />
          </HStack>
        </Flex>
        <Box>
          <Menu>
            {userInfo && (
              <MenuButton>
                <HStack>
                  {LinkItems.map((link) => (
                    <NavItem
                      key={link.name}
                      icon={link.icon}
                      navSize={navSize}
                      to={link.to}
                    >
                      {link.name}
                    </NavItem>
                  ))}
                  {navSize === NavSize.LARGE && (
                    <HStack>
                      <Text fontSize="sm">{userInfo?.name}</Text>
                      <Box display={{ base: "none", md: "flex" }}>
                        <FiChevronDown />
                      </Box>
                    </HStack>
                  )}
                </HStack>
              </MenuButton>
            )}
            <MenuList
              bg={useColorModeValue("white", "gray.900")}
              borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              <MenuItem onClick={handleSignout}>
                <Icon mr={"4"} fontSize="16" as={AiOutlineLogout} />
                Sign out
              </MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Flex>
    </Box>
  );
};

const NavItem = ({ icon, children, navSize, to, ...rest }) => {
  return (
    <Tooltip label={navSize === NavSize.SMALL && children} placement="right">
      <Link
        href={to}
        style={{ textDecoration: "none" }}
        _focus={{ boxShadow: "none" }}
      >
        <Flex
          align="center"
          // alignItems={navSize == NavSize.SMALL ? "center" : "flex-start"}
          justify={navSize == NavSize.SMALL ? "center" : "flex-start"}
          p="4"
          mx={navSize === NavSize.SMALL ? "1" : "4"}
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: "cyan.400",
            color: "white",
          }}
          {...rest}
        >
          {icon && (
            <Icon
              mr={navSize === NavSize.SMALL ? "0" : "4"}
              fontSize="16"
              _groupHover={{
                color: "white",
              }}
              as={icon}
            />
          )}
          {navSize === NavSize.LARGE && children}
        </Flex>
      </Link>
    </Tooltip>
  );
};

