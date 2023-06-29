import { useDispatch } from "react-redux";
import ChatBox from "../../chat/ChatBox/ChatBox";
import ChatSideBar from "../../chat/ChatSideBar/ChatSideBar";
import MainLayout from "../../layout/MainLayout";
import { HStack, Divider } from "@chakra-ui/react";
import { useEffect } from "react";

function ChatPage() {
  const dispatch = useDispatch();

  return (
    <MainLayout>
      <HStack spacing={0}>
        <ChatSideBar />
        <Divider orientation="verticle" height="full" width="1px" />
        <ChatBox />
      </HStack>
    </MainLayout>
  );
}

export default ChatPage;
