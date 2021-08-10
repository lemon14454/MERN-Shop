import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { register, togglePanel } from "../redux/user";
import InputLabel from "./InputLabel";

const Register = () => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="bg-white p-4 rounded-md w-[90%] mt-[150px] lg:mt-0 lg:w-[500px] relative">
      <button
        onClick={() => dispatch(togglePanel("none"))}
        className="absolute top-5 right-5 bg-red-500 rounded-md p-1 hover:scale-105 transition duration-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <h1 className="font-bold text-3xl my-3">會員註冊</h1>
      <InputLabel
        type="text"
        name="name"
        label="使用者名稱"
        value={name}
        onChange={setName}
      />
      <InputLabel
        type="text"
        name="email"
        label="電子郵件"
        value={email}
        onChange={setEmail}
      />
      <InputLabel
        type="password"
        name="password"
        label="密碼"
        value={password}
        onChange={setPassword}
      />
      <InputLabel
        type="password"
        name="confirmPassword"
        label="確認密碼"
        value={confirmPassword}
        onChange={setConfirmPassword}
      />

      <div className="flex mt-6 items-end">
        <p className="text-xs pl-2">
          已經有帳號?{" "}
          <span
            className="text-green-400 cursor-pointer hover:text-green-200"
            onClick={() => dispatch(togglePanel("login"))}
          >
            登入
          </span>
        </p>
        <button
          onClick={() => dispatch(register({ name, email, password }))}
          className="form-button"
        >
          註冊
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Register;
