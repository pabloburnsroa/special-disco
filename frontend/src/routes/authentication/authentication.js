import SignInForm from '../../components/signin/SignIn';
import SignUpForm from '../../components/signup/SignUp';

const Authentication = () => {
  return (
    <div className="authentication-container">
      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
