import React, { useContext} from "react";
import "./login.scss";
import Swal from "sweetalert2";
import { AppContext } from "../../router/router";
import useForm from "../../hook/hookForm";
import { getUser } from "../../services/primitives";



const Login = () => {
  const { setIsLogin  } =
    useContext(AppContext);

  const [dataForm, handleChange, resetForm] = useForm()

  const handleSubmit = async (event) => {
    event.preventDefault();
    const loggedUser = await getUser(dataForm);
    if (loggedUser) {
      Swal.fire(
        `Exelente ${loggedUser.name}`,
        "Has iniciado sesión exitosamente",
        "success"
      ).then(() => {
        console.log("Setting login image:", loggedUser.img);
        setIsLogin(true);
     
      });
    } else {
      Swal.fire(
        "Ooops!",
        "las credenciales ingresadas son incorrectas",
        "error"
      );
    }

    sessionStorage.setItem("user", JSON.stringify(loggedUser));
    resetForm();
  };

  return (
    <>
   
      <div className="container__login">
        <form onSubmit={handleSubmit}>

          <h1>Bienvenido</h1>
          <p>Inicia Sesion</p>
          <label>Nombre de usuario:</label>
          <input
            onChange={handleChange}
            name="name"
            value={dataForm?.name || ""}
            type="text"
          />
          <label>Contraseña:</label>
          <input
            onChange={handleChange}
            name="password"
            value={dataForm?.password || ""}
            type="password"
          />
          <button className="buttom-Form" type="submit">
            Iniciar sesión
          </button>
        </form>
      </div>
    </>
  );
};

export default Login;
