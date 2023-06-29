import { Box, Spinner, useToast } from "@chakra-ui/react";
import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateUser } from "../../features/auth/auth.actions";
import { setIsSocketConnected } from "../../features/auth/auth.reducer";
import { SocketContext } from "../../plugins/socket/SocketProvider";
import Sidebar from "../components/Sidebar";

function MainLayout({ children }) {
  const { validateError, validateSuccess, validateLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const toast = useToast();
  const navigate = useNavigate();
  const socketService = useContext(SocketContext);

  useEffect(() => {
    if (!socketService) return;
    dispatch(validateUser())
      .unwrap()
      .then(() => {
        if (!socketService?.socket?.connected) socketService.connect();
        dispatch(setIsSocketConnected(true));
      });
  }, [socketService]);

  useEffect(() => {
    if (!validateLoading && validateError && !validateSuccess) {
      toast({
        status: "error",
        description: validateError,
      });
      navigate("/login");
    }
  }, [validateLoading, validateError, validateSuccess]);

  return validateLoading ? (
    <Box w="full" h="full" flex justifyContent="center" alignItems="center">
      <Spinner />
    </Box>
  ) : (
    <>
      <Sidebar>{children}</Sidebar>
    </>
  );
}

export default MainLayout;
