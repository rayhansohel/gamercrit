import { Helmet } from "react-helmet-async";
import RegisterForm from './../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="min-h-[calc(100vh-192px)] flex justify-center items-center">
      <Helmet>
        <title>Register - Gamer Crit</title>
      </Helmet>
      <div>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
