import { useAppSelector } from "../app/hooks";
import { selectUser } from "../redux/user";
import Login from "./Login";
import Register from "./Register";

const Modal = () => {
  const { panel } = useAppSelector(selectUser);
  return (
    <div
      className={`absolute top-0 left-0 right-0 w-full h-full bg-black/70 flex justify-center items-start transition duration-300 lg:items-center ${
        panel != "none" ? "z-40 opacity-100" : "opacity-0 hidden"
      }`}
    >
      {panel === "login" ? <Login /> : panel === "register" ? <Register /> : ""}
    </div>
  );
};

export default Modal;
