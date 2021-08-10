import { useState } from "react";
import { useAppDispatch } from "../app/hooks";
import { login, togglePanel } from "../redux/user";
import InputLabel from "./InputLabel";

const Login = () => {
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

      <h1 className="font-bold text-3xl my-3">會員登入</h1>
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

      <div className="flex mt-6 items-end">
        <p className="text-xs pl-2">
          還沒有帳號?{" "}
          <span
            className="text-green-400 cursor-pointer hover:text-green-200"
            onClick={() => dispatch(togglePanel("register"))}
          >
            註冊
          </span>
        </p>
        <button
          onClick={() => dispatch(login({ email, password }))}
          className="form-button"
        >
          登入
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

export default Login;
