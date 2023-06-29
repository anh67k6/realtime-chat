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
  Link,
  Spinner,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { PasswordField } from "./PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../store/auth/auth.action";

const EMAIL_REGEX =
  /^(([a-zA-Z0-9]+)([.]{1})?)*[a-zA-Z0-9]@([a-zA-Z0-9]+[.])+[a-zA-Z0-9]+$/;

export default function LoginForm() {
  const toast = useToast();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, success, error, userToken } = useSelector(
    (state) => state.auth
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitForm = (data) => {
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (!loading && success && userToken) {
      navigate("/chat");
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
            spacing={{
              base: "2",
              md: "3",
            }}
            textAlign="center"
          >
            <Heading
              size={{
                base: "xs",
                md: "sm",
              }}
            >
              Log in to your account
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
                  <Input
                    id="email"
                    type="text"
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Vui lòng điền đầy đủ thông tin",
                      pattern: {
                        value : EMAIL_REGEX,
                        message: "Email không hợp lệ",
                      }
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <PasswordField
                  error={errors.password && errors.password.message}
                  register={register}
                />
              </Stack>
              <HStack justify="center">
                <div />
                <Button variant="link" size="sm">
                  Quên mật khẩu?
                </Button>
              </HStack>
              <HStack spacing="1" justify="center">
                <Text color="muted">Chưa có mật khẩu?</Text>
                <Link variant="link" colorScheme="blue" href="signup">
                  Đăng ký
                </Link>
              </HStack>
              <Stack spacing="6">
                <Button variant="solid" colorScheme="blue" type="submit">
                  Đăng nhập
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
