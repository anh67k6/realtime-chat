import { useDispatch, useSelector } from "react-redux";
import LoginForm from "../../features/auth/components/LoginForm";
import "./LoginPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../common/constants";
import { validateUser } from "../../features/auth/auth.actions";
function Login() {
  const { validateSuccess, validateLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(validateUser());
  }, []);

  useEffect(() => {
    if (validateSuccess && !validateLoading)
      navigate(PageRoute.HOME_PAGE);
  }, [validateLoading, validateSuccess]);

  return (
    <div className="login-form-container">
      <LoginForm />
    </div>
  );
}

export default Login;
