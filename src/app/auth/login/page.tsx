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
      {/* Background Map Silhouette */}
      <div className="absolute inset-0 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1200 800" fill="none">
          {/* Indonesia map silhouette approximation */}
          <path d="M200 300 Q250 280 300 300 L350 320 Q400 310 450 330 L500 340 Q520 360 540 350 L580 370 Q600 390 640 380 L680 400 Q720 390 750 410 L800 420 Q850 400 880 420 L920 430 Q950 440 980 430" stroke="currentColor" strokeWidth="3" fill="none" className="text-teal-600"/>
          <ellipse cx="250" cy="400" rx="40" ry="25" fill="currentColor" className="text-teal-600"/>
          <ellipse cx="350" cy="450" rx="30" ry="20" fill="currentColor" className="text-teal-600"/>
          <ellipse cx="450" cy="480" rx="35" ry="22" fill="currentColor" className="text-teal-600"/>
          <ellipse cx="550" cy="460" rx="28" ry="18" fill="currentColor" className="text-teal-600"/>
          <ellipse cx="650" cy="500" rx="45" ry="30" fill="currentColor" className="text-teal-600"/>
          <ellipse cx="750" cy="520" rx="38" ry="25" fill="currentColor" className="text-teal-600"/>
          <ellipse cx="850" cy="490" rx="32" ry="20" fill="currentColor" className="text-teal-600"/>
        </svg>
      </div>

      {/* Header with Logos */}
    <div className="flex items-center space-x-4 ps-80">

            {/* Logo KKP */}
            <div className="w-20 h-20 transform hover:scale-110 transition-transform duration-300 hover:rotate-3"> 

              <img
                src="/assets/KKP.png"
                alt="Logo KKP"
                className="w-full h-full object-contain drop-shadow-lg"
              />
            </div>
            <div className="text-white">
              <div className="text-sm font-semibold hover:text-yellow-200 transition-colors duration-300">
                PROFILE KEKUATAN SUMBER DAYA MANUSIA
              </div>
              <div className="text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
                DIREKTORAT
              </div>
              <div className="text-2xl font-bold text-yellow-300 hover:text-yellow-200 transition-colors duration-300 cursor-default">
                JENDRAL PERIKANAN TANGKAP
              </div>
            </div>
            {/* Logo Kementerian */}
            <div className="w-30 h-30 mr-60 transform hover:scale-110 transition-transform duration-300 hover:-rotate-3">
              <img
                src="/assets/dirjen.png"
                className="w-full h-full object-contain drop-shadow-lg"
                alt="Logo Dirjen"
              />
            </div>
          </div>

      {/* Login Form */}
      <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-120px)]">
        <div className="bg-gradient-to-b from-yellow-400 to-orange-400 rounded-2xl p-8 shadow-2xl w-full max-w-md mx-4">
          <div className="text-center mb-8">
            <h3 className="text-white font-bold text-2xl mb-2">Welcome Back</h3>
            <p className="text-white text-opacity-90 text-sm">
              Selamat datang kembali ke login
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <div className="block text-white text-sm font-medium mb-2">
                Email Address
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ateng@gmail.com"
                className="w-full px-4 py-3 bg-black bg-opacity-20 rounded-full text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-white focus:bg-black focus:bg-opacity-30 transition-all duration-300"
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
                  className="w-full px-4 py-3 pr-12 bg-black bg-opacity-20 rounded-full text-white placeholder-white placeholder-opacity-70 border border-white border-opacity-30 focus:outline-none focus:border-white focus:bg-black focus:bg-opacity-30 transition-all duration-300"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-opacity-70 hover:text-white hover:text-opacity-100 transition-colors"
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
                className="flex items-center text-white text-sm cursor-pointer"
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
              className="w-full bg-black bg-opacity-30 hover:bg-black hover:bg-opacity-40 text-white font-semibold py-3 px-6 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-30"
            >
              Login
            </button>
          </div>

         
        </div>
      </div>
    </div>
  );
};

export default LoginPage;