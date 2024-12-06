import { Helmet } from "react-helmet-async";
import RegisterForm from './../components/RegisterForm';

const RegisterPage = () => {
  return (
    <div>
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
