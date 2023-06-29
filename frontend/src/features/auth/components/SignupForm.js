import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  FormErrorMessage,
  Spinner,
  Link,
  useToast,
} from "@chakra-ui/react";
import { Logo } from "./Logo";
import { PasswordField } from "./PasswordField";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { registerUser } from "../auth.actions";
import { Regex } from "../../../common/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function SignupForm() {
  const { loading, userInfo, success, error } = useSelector(
    (state) => state.auth
  );

  const navigate= useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (success) navigate("/login");

  }, [navigate, userInfo, success]);
  const dispatch = useDispatch();
  const submitForm = (data) => {
    dispatch(registerUser(data));
  };

  const toast = useToast();

  useEffect(() => {
    if (!loading && success) {
      toast({
        status: "success",
        description: "Logged in successfully",
      });
    } else if (!loading && error) {
      toast({
        status: "error",
        description: error,
      });
    }
  }, [success, error, loading]);
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
              Đăng ký tài khoản Zalo
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
                <FormControl isInvalid={errors.name}>
                  <Input
                    id="name"
                    type="name"
                    name="name"
                    placeholder="Tên của bạn"
                    {...register("name", {
                      required: "This field is required",
                    })}
                  />
                  <FormErrorMessage>
                    {errors.name && errors.name.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.email}>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "This field is required",
                      pattern: {
                        value: Regex.EMAIL,
                        message: "Email is invalid",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <PasswordField
                  error={errors.password && errors.password.message}
                  register={register}
                  placeholder='Mật khẩu'
                />
                <PasswordField
                  name="passwordConfirm"
                  placeholder="Xác nhận mật khẩu"
                  error={
                    errors.passwordConfirm && errors.passwordConfirm.message
                  }
                  register={register}
                  watch={watch}
                />
              </Stack>
              <HStack spacing="1" justify="center">
              <Text color="muted">Bạn đã có tài khoản?</Text>
              <Link variant="link" colorScheme="blue" role="a" href="/login" color="blue">
                Đăng nhập
              </Link>
            </HStack>
              <Stack spacing="6">
                <Button
                  variant="solid"
                  colorScheme="blue"
                  isLoading={loading}
                  type="submit"
                >
                  {loading ? <Spinner /> : "Đăng ký"}
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
