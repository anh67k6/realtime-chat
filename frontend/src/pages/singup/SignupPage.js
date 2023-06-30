import { useDispatch, useSelector } from "react-redux";
import SignupForm from "../../features/auth/components/SignupForm";
import "./SignupPage.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageRoute } from "../../common/constants";
import { validateUser } from "../../features/auth/auth.actions";
function Signup() {
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
    <div className="signup-form-container">
      <SignupForm />
    </div>
  );
}

export default Signup;
