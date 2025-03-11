import HeaderIcon from "../__atoms/headericon";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email("იმეილი არასწორია").required("Can’t be empty"),
  password: yup
    .string()
    .required("Can’t be empty")
    .matches(
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
      "პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს, ერთ დიდ და ერთ პატარა ასოს და ერთ ციფრს"
    ),
  confirmPassword: yup
    .string()
    .required("Repeat password")
    .oneOf([yup.ref("password"), null], "პაროლები არ ემთხვევა"),
});

function Container() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = (data) => {
    const { confirmPassword, ...userData } = data;
    localStorage.setItem("user", JSON.stringify(userData));
    navigate("/login");
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
          <h1 className="text-2xl font-semibold mb-5">Sign Up</h1>
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
          <input
            type="password"
            placeholder="Repeat password"
            className="w-full p-3 mb-3 opacity-[0.5] border-b-[1px]"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <span className="text-[#FC4747] text-[13px] font-[400px]">
              {errors.confirmPassword.message}
            </span>
          )}
          <button
            type="submit"
            className="w-full bg-[#F55353] text-white py-3 rounded-md hover:bg-[#FFF] transition hover:text-[#161D2F]"
          >
            Create an account
          </button>
          <p className="mt-4 text-sm text-center">
            Already have an account?
            <a
              href="#"
              onClick={() => navigate("/login")}
              className="text-[#F55353] ml-1 cursor-pointer hover:underline"
            >
              Login
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Container;
