import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoute, Regex } from "../../../common/constants";
import { loginUser } from "../auth.actions";
import { PasswordField } from "./PasswordField";
import { EmailIcon } from "@chakra-ui/icons";
export default function LoginForm() {
  const { loading, success, error, userToken } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitForm = (data) => {
    console.log(data);
    dispatch(loginUser(data));
  };

  const toast = useToast();

  useEffect(() => {
    if (!loading && success && userToken) {
      navigate(PageRoute.CHAT_PAGE);
      toast({
        status: "success",
        description: "Logged in successfully",
      });
      if (userToken) {
        localStorage.setItem("jwt", userToken);
      }
    } else if (!loading && error) {
      toast({
        status: "error",
        description: error,
      });
    }
  }, [success, error, loading, toast]);

  return (
    <Container
    maxW="lg"
    py={{
      base: "12",
      md: "24",
    }}
    px={{
      base: "0",
      sm: "8",
    }}
    >
      <Stack spacing="8">
        <Stack spacing="6">
          <Stack
            spacing="2"
            textAlign="center"
          >
            <Heading
              size="sm"
            >
              Đăng nhập bằng tài khoản
            </Heading>
          </Stack>
        </Stack>
        <Box
          py={{
            base: "0",
            sm: "8",
          }}
          px={{
            base: "4",
            sm: "10",
          }}
          bg={{
            base: "transparent",
            sm: "white",
          }}
          boxShadow={{
            base: "none",
            sm: "md",
          }}
          borderRadius={{
            base: "none",
            sm: "xl",
          }}
        >
          <form onSubmit={handleSubmit(submitForm)}>
            <Stack spacing="6">
              <Stack spacing="5">
                <FormControl isInvalid={errors.email}>
                  <InputGroup>
                  <InputLeftElement>
                    <EmailIcon />
                  </InputLeftElement>
                  <Input
                    id="email"
                    type="email"
                    variant='flushed'
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Vui lòng nhập email của bạn",
                      pattern: {
                        value: Regex.EMAIL,
                        message: "Email is invalid",
                      },
                    })}
                  /></InputGroup>
                  
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <PasswordField
                  error={errors.password && errors.password.message}
                  register={register}
                  placeholder="Mật khẩu"
                />
              </Stack>
              <HStack spacing="1" justify="center">
                <Text color="muted">Bạn chưa có tài khoản?</Text>
                <Link variant="link" colorScheme="blue" href="signup" color="blue">
                    Đăng ký
                </Link>
              </HStack>
              <Stack spacing="6">
                <Button
                  variant="solid"
                  colorScheme="blue"
                  isLoading={loading}
                  type="submit"
                >
                  {loading ? <Spinner /> : "Đăng nhập"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
