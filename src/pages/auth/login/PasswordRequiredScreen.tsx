import { useState } from "react";
import { useAuth } from "../../../hooks/auth/useUser";
import { useLocation, useNavigate } from "react-router-dom";
import { ConfirmSignInOutput } from "aws-amplify/auth";
import useErrorHandler from "../../../hooks/errors/useErrorHandler";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validationSchemaPassword } from "./validationSchemaLogin";
import UnibeBackgraund from '../../../assets/auth/UnibeBackgraund.jpg';
import UnibeLogo from '../../../assets/header/LogoUnibe.png';
import { SignUpStepEnum } from "../../../enums/auth/signUpStepEnum";

const PasswordRequiredScreen = () => {
  const { handleConfirmSignIn } = useAuth();
  const { handleError, errorMessage, clearError } = useErrorHandler();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const location = useLocation();
  const { attributes } = location.state || {};
  const navigate = useNavigate();

  const navigateHome = (res: ConfirmSignInOutput) => {
    if (res.nextStep.signInStep === SignUpStepEnum.DONE) {
      navigate("/home");
      clearError();
    }
  };

  const handleSubmit = async (values: { password: string }) => {
    try {
      setIsLoading(true);
      const response = await handleConfirmSignIn(values.password, attributes);
      navigateHome(response);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      handleError({ error });
    }
  };

  return (
      <div  className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${UnibeBackgraund})` }}>
       <div className="w-full max-w-3xl p-12 space-y-6 bg-white bg-opacity-90 rounded-lg shadow-lg mx-4 sm:mx-10">
       <div className="flex justify-center mb-6">
          <img src={UnibeLogo} alt="Logo" className="h-32 w-32" />
        </div>
        <h2 className="text-lg font-semibold text-center text-gray-700">Cambia tu contraseña, por favor</h2>
        {errorMessage && (
          <div className="p-4 text-red-600 bg-red-100 rounded-lg">{errorMessage}</div>
        )}
          <Formik
            initialValues={{ password: "" }}
            validationSchema={validationSchemaPassword}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div className="relative">
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Contraseña"
                    className="w-full px-5 py-3 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-4 flex items-center text-gray-500"
                  >
                    {showPassword ? <FaEyeSlash size={20} /> : <FaEye size={20} />}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className={`w-full px-5 py-3 font-semibold text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 ${
                    isSubmitting || isLoading
                      ? "bg-blue-300 cursor-not-allowed"
                      : "bg-dark-primary hover:bg-blue-600"
                  }`}
                >
                  {isSubmitting || isLoading ? "Cargando..." : "Confirmar"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
  );
};

export default PasswordRequiredScreen;
