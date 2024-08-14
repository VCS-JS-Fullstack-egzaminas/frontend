import './Authentication.css';
import '../../components/ui/Button';

const Authentication = () => {
  return (
    <div className="auth-container">
      <input
        type="text"
        placeholder="Username"
        className="input-field-one"
      />
      <input
        type="password"
        placeholder="Password"
        className="input-field-one"
      />
      <div className="button-div">
      <button>Login</button>
      </div>
    </div>
  );
};

export default Authentication;