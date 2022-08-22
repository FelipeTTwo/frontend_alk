import styles from "../styles/login.module.css";
import logo from "../images/logoManagement.svg";
import axios from "axios";
import FormError from "../components/FormError";
import { useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { UserContext } from "../context/UserProvider";
import { useForm } from "react-hook-form";
import { formValidate } from "../utilities/formValidate";
import { ToastContainer } from "react-toastify";
import { alertError } from "../utilities/Alerts";

const Login = () => {
  const { online, setOnline } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    provideAccess();
  }, [online]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { required } = formValidate();

  const onSubmit = async (data) => {
    try {
      const URI = "https://alkemyapp.herokuapp.com/users/login";
      const res = await axios({
        method: "post",
        url: URI,
        data,
        withCredentials: true,
      });
      setOnline(res.data.results.isOnline);
    } catch (error) {
      alertError(error.response.data);
    }
  };

  const provideAccess = () => {
    if (online) {
      navigate("/management");
      console.log("usuario online");
    } else {
      console.log("usuario offline");
    }
  };

  return (
    <div className={`col-lg-5 ${styles.login}`}>
      <div className={styles.content}>
        <div className={styles["login-box"]}>
          <div className={styles.header}>
            <img src={logo} alt="logo" />
          </div>

          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="text"
                id="exampleInputEmail1"
                placeholder="Ingresa tu correo electrónico"
                name="email"
                {...register("email", {
                  required,
                })}
              />
            </div>
            {errors.email && <FormError error={errors.email} />}

            <div className={styles["input-box"]}>
              <input
                className={styles.input}
                type="password"
                id="exampleInputEmail2"
                placeholder="Ingresa tu contraseña"
                name="password"
                {...register("password", {
                  required,
                })}
              />
            </div>
            {errors.password && <FormError error={errors.password} />}

            <span className={styles["button-box"]}>
              <button>Iniciar Sesión</button>
            </span>
          </form>
        </div>
        <div className={styles["login-box"]}>
          <p className={styles["text"]}>
            ¿Todavía no tienes una cuenta?
            <Link to="/register">Registrarse</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
