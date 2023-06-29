import { Box, Spinner, VStack } from "@chakra-ui/react";
import ChatSideHeader from "./ChatSideHeader.js";

const ChatSideBar = () => {
  return (
    <VStack
      bg="white"
      h="100vh"
      overflowY="auto"
      resize="horizontal"
      minW="300px"
    >
      <ChatSideHeader />
    </VStack>
  );
};

export default ChatSideBar;
