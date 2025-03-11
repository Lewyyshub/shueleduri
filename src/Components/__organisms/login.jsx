import { useNavigate } from "react-router-dom";
import HeaderIcon from "../__atoms/headericon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("Email is incorect").required("Can’t be empty"),
  password: yup.string().required("Can’t be empty"),
});

function Login() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const savedUser = JSON.parse(localStorage.getItem("user"));

    if (
      savedUser &&
      savedUser.email === data.email &&
      savedUser.password === data.password
    ) {
      navigate("/home");
    } else {
      alert("იმეილი ან პაროლი არასწორია");
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col justify-center gap-[83px] items-center h-screen">
        <div className="headerdiv">
          <HeaderIcon />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-[#161D2F] border border-[#161D2F] p-8 rounded-xl shadow-xl w-[400px] text-white"
        >
          <h1 className="text-2xl font-semibold mb-5">Login</h1>

          <input
            type="email"
            placeholder="Email address"
            className="w-full p-3 mb-3 opacity-[0.5] border-b-[1px]"
            {...register("email")}
          />
          {errors.email && (
            <span className="text-[#FC4747] text-[13px] font-[400px]">
              {errors.email.message}
            </span>
          )}

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-3 opacity-[0.5] border-b-[1px]"
            {...register("password")}
          />
          {errors.password && (
            <span className="text-[#FC4747] text-[13px] font-[400px]">
              {errors.password.message}
            </span>
          )}

          <button
            type="submit"
            className="w-full bg-[#F55353] text-white py-3 rounded-md hover:bg-[#FFF] transition hover:text-[#161D2F]"
          >
            Login to your account
          </button>

          <p className="mt-4 text-sm text-center">
            Don’t have an account?
            <a
              href="#"
              onClick={() => navigate("/signup")}
              className="text-[#F55353] ml-1 cursor-pointer hover:underline"
            >
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
