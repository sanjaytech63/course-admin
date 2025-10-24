import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import InputField from '../components/ui/InputField';
import { BiLock, BiMailSend } from 'react-icons/bi';
import Button from '../components/ui/Button';
import { FiLogIn } from 'react-icons/fi';
import { loginUserSchema } from '../validations/userValidation';
import { handleError, handleSuccess } from '../utils/toastHandler';
import { useAuthStore } from '../store/authStore';
import { login } from '../api/authService';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser, setTokens } = useAuthStore();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const handleChange = (field: string) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const { email, password } = loginUserSchema.parse(formData);

      const response: any = await login(email, password);
      const { user } = response.data;

      const accessToken = response.data.accessToken;
      const refreshToken = response.data.refreshToken;

      setTokens(accessToken || '', refreshToken || '');
      setUser(user);

      handleSuccess(response?.message);

      setFormData({ email: '', password: '' });
      setErrors({ email: '', password: '' });
      navigate('/');
    } catch (err) {
      if (err instanceof Error && 'issues' in err) {
        const zodError = err as any;
        const fieldErrors: any = {};

        if (Array.isArray(zodError.issues)) {
          zodError.issues.forEach((issue: any) => {
            if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
          });
        }

        setErrors(fieldErrors);
      } else {
        handleError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="flex justify-center">
            <div className="w-12 h-12 rounded-md bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold text-xl">S</span>
            </div>
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Or{' '}
            <Link
              to="/register"
              className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
            >
              Create a new account
            </Link>
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <InputField
              type="email"
              label="Email address"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange('email')}
              error={errors.email}
              icon={<BiMailSend />}
            />

            <InputField
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange('password')}
              error={errors.password}
              icon={<BiLock />}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:text-indigo-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <Button
              isLoading={loading}
              type="submit"
              className="w-full  flex items-center justify-center py-2.5 space-x-2 rounded-md text-sm"
            >
              <FiLogIn size={16} />
              <span>Sign In</span>
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
