import {
  HStack,
  Input,
  InputGroup,
  VStack,
} from "@chakra-ui/react";
import { useContext, useEffect, useRef, useState } from "react";
import { BiMicrophone } from "react-icons/bi";
import { BsCardImage, BsFillSendFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { sendMessage } from "../../chat.actions";
import { ChatEvent } from "../../chat.reducer";
import { SocketContext } from "../../../../plugins/socket/SocketProvider";

const ChatInput = ({ chat, socketConnected }) => {
  const socketService = useContext(SocketContext);

  const [message, setMessage] = useState("");
  const [ownerTyping, setOwnerTyping] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const sendMessageAction = () => {
    dispatch(sendMessage({ chatId: chat._id, content: message }))
      .unwrap()
      .then((response) => {
        socketService.emit(ChatEvent.NEW_MESSAGE, response.data);
      });
    setMessage("");
  };
  const handleSendMessage = (e) => {
    if (e.key === "Enter" && message) sendMessageAction();
  };

  const typingTimeout = useRef(null);

  const onMessageChange = (e) => {
    setMessage(e.target.value);
    if (!socketConnected) return;
    if (e.target.value) {
      typingTimeout.current && clearTimeout(typingTimeout.current);
      typingTimeout.current = setTimeout(() => {
        setOwnerTyping(false);
      }, 3000);
      setOwnerTyping(true);
    } else setOwnerTyping(false);
  };

  useEffect(() => {
    if (!socketConnected) return;
    if (ownerTyping) {
      console.log(userInfo);
      socketService.emit(ChatEvent.TYPING, chat, userInfo);
    } else {
      socketService.emit(ChatEvent.STOP_TYPING, chat);
    }
  }, [ownerTyping]);

  return (
    <VStack w="full">
      <HStack w="full" px={4} py={4}>
        <InputGroup>
          <Input
            type="text"
            variant='flushed'
            placeholder="Type a message..."
            onKeyDown={(e) => handleSendMessage(e)}
            onChange={onMessageChange}
            value={message}
          />
        </InputGroup>
      </HStack>
    </VStack>
  );
};

export default ChatInput;
