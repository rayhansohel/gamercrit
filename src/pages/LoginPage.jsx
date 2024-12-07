import { Helmet } from "react-helmet-async";
import LoginForm from './../components/LoginForm';


const LoginPage = () => {
  return (
    <div className="min-h-[calc(100vh-192px)] flex justify-center items-center">
      <Helmet>
        <title>Login - Gamer Crit</title>
      </Helmet>
      <div >
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
