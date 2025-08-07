"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { fi } from "zod/locales";

const formSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z.string().min(6, "Password harus minimal 6 karakter"),
});

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setLoading(true);
    try {
    } catch (error) {
      if (error instanceof Error) {
        console.log("error", error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 via-cyan-500 to-blue-400 relative overflow-hidden">
      {/* Header with Logos */}
      <div className="md:mb-6 animate-slide-down w-full flex justify-center">
        {/* Desktop Header - preserved original layout */}
        <div className="flex justify-center items-center mt-2">
          <div className="flex justify-center flex-col md:flex-row px-2 items-center md:space-x-2 space-x-1 lg:space-x-4">
            <div className="w-20 hidden md:block h-20 aspect-square transform hover:scale-110 transition-transform duration-300 hover:rotate-3">
              <img
                src="/assets/KKP.png"
                alt="Logo KKP"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="flex md:hidden items-center gap-x-2">
              <img
                src="/assets/KKP.png"
                alt="Logo KKP"
                className="w-16 h-16 aspect-square object-contain drop-shadow-lg"
              />
              <img
                src="/assets/dirjen.png"
                className="w-22 h-22 aspect-square object-contain drop-shadow-lg"
                alt="Logo Dirjen"
              />
            </div>

            <div className="text-white ">
              <h4 className="text-sm md:text-[13px] md:font-bold lg:text-[16px] lg:font-semibold hover:text-yellow-200 transition-colors text-center duration-300">
                KEMENTERIAN KELAUTAN DAN PERIKANAN
              </h4>
              <h1 className="text-lg md:text-2xl lg:max-w-sm lg:font-bold uppercase text-center lg:text-2xl font-semibold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default justify-center flex">
                direktorat jenderal <br /> perikanan tangkap
              </h1>
            </div>

            <div className="w-25 hidden md:block aspect-square h-25 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3">
              <img
                src="/assets/dirjen.png"
                className="w-full h-full object-contain drop-shadow-lg"
                alt="Logo Dirjen"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Login Form - Centered and Responsive */}
      <div className="relative z-10 flex mt-8 items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-yellow-400 to-orange-400 rounded-2xl p-6 sm:p-8 shadow-2xl w-full max-w-sm sm:max-w-md mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">
              Welcome Back
            </h3>
            <p className="text-white text-opacity-90 text-sm">
              Selamat datang kembali ke login
            </p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="space-y-4 sm:space-y-6"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-white text-sm font-medium mb-2"
              >
                Email Address
              </label>
              <input
                {...form.register("email")}
                id="email"
                type="email"
                placeholder="kkp.go.id@gmail.com"
                className="w-full px-4 py-3 bg-black bg-opacity-20 rounded-full text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-white focus:bg-black focus:bg-opacity-30 transition-all duration-300 text-sm sm:text-base"
              />
              {form.formState.errors.email && (
                <p className="text-red-700 text-xs font-bold mt-1 ml-4">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-white text-sm font-medium mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  {...form.register("password")}
                  id="password"
                  placeholder="••••••••"
                  type="password"
                  className="w-full px-4 py-3 pr-12 bg-black bg-opacity-20 rounded-full text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-white focus:bg-black focus:bg-opacity-30 transition-all duration-300 text-sm sm:text-base"
                />
                {form.formState.errors.password && (
                  <p className="text-red-700 text-xs font-bold mt-1 ml-4">
                    {form.formState.errors.password.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={!form.formState.isValid}
              className={clsx(
                "w-full text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 touch-manipulation text-sm sm:text-base",
                {
                  "bg-black bg-opacity-30 cursor-pointer hover:bg-black hover:bg-opacity-40 active:bg-black active:bg-opacity-50 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 ":
                    form.formState.isValid,
                  "bg-red-600 cursor-not-allowed":
                    !form.formState.isValid || loading,
                }
              )}
            >
              Login
            </button>
          </form>
        </div>
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-8 sm:h-12"></div>
    </div>
  );
};

export default LoginPage;
