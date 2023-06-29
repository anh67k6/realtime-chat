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

import { PasswordField } from "./PasswordField";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { signupUser } from "../../store/auth/auth.action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EMAIL_REGEX =
  /^(([a-zA-Z0-9]+)([.]{1})?)*[a-zA-Z0-9]@([a-zA-Z0-9]+[.])+[a-zA-Z0-9]+$/;

export default function SignupForm() {
  const { loading, userInfo, success, error } = useSelector(
    (state) => state.auth
  );

  console.log(success)

  const toast = useToast();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    if (success) navigate("/login");
  }, [navigate, userInfo, success]);

  const submitForm = (data) => {
    console.log(data);
    dispatch(signupUser(data));
  };

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
              Create your own account
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
                    placeholder="Name"
                    {...register("name", {
                      required: "Vui lòng điền tên",
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
                      required: "Vui lòng điền email",
                      pattern: {
                        value: EMAIL_REGEX,
                        message: "Email không hợp lệ",
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
                />
                <PasswordField
                  name="passwordConfirm"
                  label="Confirm Password"
                  error={
                    errors.passwordConfirm && errors.passwordConfirm.message
                  }
                  register={register}
                  watch={watch}
                />
              </Stack>
              <HStack spacing="1" justify="center">
                <Text color="muted">Bạn đã có tài khoản?</Text>
                <Link variant="link" colorScheme="blue" role="a" href="/login">
                  Đăng ký
                </Link>
              </HStack>
              <Stack spacing="6">
                <Button
                  variant="solid"
                  colorScheme="blue"
                  type="submit"
                >Đăng ký</Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Container>
  );
}
