'use client';
import React, { useState } from 'react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = () => {
    console.log('Login attempt:', { email, password, rememberMe });
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
                <div className='flex md:hidden items-center gap-x-2'>
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
            <h3 className="text-white font-bold text-xl sm:text-2xl mb-2">Welcome Back</h3>
            <p className="text-white text-opacity-90 text-sm">
              Selamat datang kembali ke login
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div>
              <div className="block text-white text-sm font-medium mb-2">
                Email Address
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kkp.go.id@gmail.com"
                className="w-full px-4 py-3 bg-black bg-opacity-20 rounded-full text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-white focus:bg-black focus:bg-opacity-30 transition-all duration-300 text-sm sm:text-base"
              />
            </div>

            <div>
              <div className="block text-white text-sm font-medium mb-2">
                Password
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-black bg-opacity-20 rounded-full text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-white focus:bg-black focus:bg-opacity-30 transition-all duration-300 text-sm sm:text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors touch-manipulation"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div 
                className="flex items-center text-white text-sm cursor-pointer touch-manipulation"
                onClick={() => setRememberMe(!rememberMe)}
              >
                <div className="relative mr-2">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="sr-only"
                  />
                  <div className={`w-4 h-4 border-2 border-white border-opacity-50 rounded transition-all duration-200 ${rememberMe ? 'bg-white bg-opacity-20' : 'bg-transparent'}`}>
                    {rememberMe && (
                      <svg className="w-3 h-3 text-white mt-0.5 ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
                Remember me
              </div>
            </div>

            <button
              onClick={handleLogin}
              className="w-full bg-black bg-opacity-30 hover:bg-black hover:bg-opacity-40 active:bg-black active:bg-opacity-50 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30 touch-manipulation text-sm sm:text-base"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      {/* Bottom spacing for mobile */}
      <div className="h-8 sm:h-12"></div>
    </div>
  );
};

export default LoginPage;