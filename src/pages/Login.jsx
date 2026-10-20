import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import lottieLogin from "../assets/lotties/login.json";
import { useForm } from "react-hook-form";
import useAuth from "../hooks/useAuth";
import { Notyf } from "notyf";
import SocialLogin from "../components/SocialLogin";
import { LoaderPinwheel, Leaf, ArrowRight, Sprout } from "lucide-react";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";

  const { loginUser, loading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const notyf = new Notyf({
      duration: 2000,
      position: {
        x: "center",
        y: "top",
      },
    });

    try {
      const result = await loginUser(data.email, data.password);

      if (result.user) {
        notyf.success("Welcome back to Tree Planet!");
        navigate(from, { replace: true });
      }
    } catch (error) {
      console.error(error.code, error.message);
      notyf.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50 px-4 py-12 sm:px-6 lg:px-12">

      {/* Background decorations */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-green-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-28 -right-20 h-96 w-96 rounded-full bg-emerald-200/30 blur-3xl" />

      <div className="relative mx-auto flex min-h-[calc(100vh-6rem)] max-w-7xl items-center justify-center">

        <div className="grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-16">

          {/* Login form */}
        <section className="order-2 mx-auto w-full max-w-lg lg:order-2">

            <div className="rounded-[2rem] border border-white/80 bg-white/85 p-6 shadow-[0_20px_70px_-25px_rgba(22,101,52,0.20)] backdrop-blur-xl sm:p-10 lg:p-12">

              {/* Logo / Brand */}
              <Link
                to="/"
                className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-green-100 bg-green-50/80 px-4 py-2 transition-colors hover:bg-green-100"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white shadow-sm">
                  <Leaf size={19} />
                </span>

                <span className="text-lg font-bold tracking-tight text-green-800">
                  Tree <span className="text-green-600">Planet</span>
                </span>
              </Link>

              {/* Heading */}
              <div className="mb-8">
                <p className="mb-3 text-xs font-bold uppercase tracking-[0.2em] text-green-600">
                  Welcome Back
                </p>

                <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                  Login to your
                  <span className="mt-1 block text-green-600">
                    account.
                  </span>
                </h1>

                <p className="mt-4 text-sm leading-6 text-gray-500 sm:text-base">
                  Your little green paradise is waiting for you. Sign in to
                  continue your journey with Tree Planet.
                </p>
              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-5"
              >

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                  {errors.email && (
                    <p className="mt-1.5 text-xs font-medium text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label
                      htmlFor="password"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Password
                    </label>
                  </div>

                  <input
                    id="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must contain at least 6 characters",
                      },
                      maxLength: {
                        value: 20,
                        message: "Password cannot exceed 20 characters",
                      },
                      pattern: {
                        value: /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
                        message:
                          "Password must contain uppercase, lowercase, number, and special character",
                      },
                    })}
                    className="w-full rounded-xl border border-gray-200 bg-gray-50/70 px-4 py-3.5 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 hover:border-green-200 focus:border-green-500 focus:bg-white focus:ring-4 focus:ring-green-100"
                  />

                  {errors.password && (
                    <p className="mt-1.5 text-xs font-medium leading-5 text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* Login button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl border border-green-600 bg-transparent px-5 py-3.5 text-sm font-bold text-green-700 shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-green-900/15 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  <span className="absolute inset-0 origin-top scale-y-0 bg-green-600 transition-transform duration-300 ease-out group-hover:scale-y-100 group-hover:delay-75" />

                  <span className="relative z-10 flex items-center justify-center gap-2 transition-colors duration-200 group-hover:text-white">
                    {loading ? (
                      <>
                        <LoaderPinwheel size={19} className="animate-spin" />
                        Signing you in...
                      </>
                    ) : (
                      <>
                        Login to your account
                        <ArrowRight
                          size={18}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </span>
                </button>

              </form>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">
                <div className="h-px flex-1 bg-gray-200" />
                <span className="text-xs font-medium uppercase tracking-wider text-gray-400">
                  Or continue with
                </span>
                <div className="h-px flex-1 bg-gray-200" />
              </div>

              {/* Social login */}
              <SocialLogin />

              {/* Registration */}
              <p className="mt-7 text-center text-sm text-gray-500">
                Don't have an account?{" "}
                <Link
                  to="/signUp"
                  className="font-bold text-green-700 underline-offset-4 transition-colors hover:text-green-900 hover:underline"
                >
                  Create one
                </Link>
              </p>

              {/* Bottom note */}
              <div className="mt-7 flex items-center justify-center gap-2 border-t border-gray-100 pt-5 text-xs text-gray-400">
                <Sprout size={15} className="text-green-600" />
                Growing a greener world, one plant at a time.
              </div>

            </div>
          </section>

          {/* Illustration */}
          <section className="order-1 mx-auto flex w-full max-w-xl flex-col items-center lg:order-1">

            <div className="relative w-full">

              {/* Decorative circles */}
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-green-200/60 sm:h-96 sm:w-96" />

              <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-100/50 blur-2xl sm:h-80 sm:w-80" />

              <Lottie
                className="relative z-10 mx-auto w-full max-w-[520px]"
                animationData={lottieLogin}
                loop
              />
            </div>

            {/* Illustration text */}
            <div className="relative z-10 -mt-5 max-w-md px-4 text-center lg:-mt-8">

              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-white/80 px-4 py-2 text-xs font-semibold text-green-700 shadow-sm">
                <Leaf size={14} />
                Your journey starts here
              </span>

              <h2 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-800 sm:text-3xl">
                Make room for
                <span className="text-green-600"> more green.</span>
              </h2>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-gray-500 sm:text-base">
                Discover beautiful plants, find your next favorite, and bring
                a little more nature into your everyday life.
              </p>

            </div>
          </section>

        </div>
      </div>
    </main>
  );
};

export default Login;