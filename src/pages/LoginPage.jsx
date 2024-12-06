import { Helmet } from "react-helmet-async";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div>
      <Helmet>
        <title>Login - Gamer Crit</title>
      </Helmet>
      <div>Login Page</div>
    </div>
  );
};

export default LoginPage;
