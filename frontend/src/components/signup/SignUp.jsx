import React, { useState } from "react";


const SignUp = () => {
  const [isActive, setIsActive] = useState(true);


  return (
    <section className="xl:h-screen w-full bg-black flex">
      <div className="xl:h-screen xl:w-24 h-[93vh] w-7 bg-[#EE2922] flex justify-center items-end relative">
        <img
          src="/assets/leftimage.png"
          alt="left"
          className="absolute bottom-24 xl:bottom-5 xl:h-[300px] xl:w-[100px]"
        />
      </div>

      <div className="">
        <img
          src="/assets/Group 100.jpg"
          alt="right"
          className="xl:h-[280px] xl:w-[150px] absolute right-0 h-24 w-12"
        />
      </div>

      <div className="flex flex-col mt-10 xl:flex-row items-center xl:justify-evenly w-full px-4">
  
        <div className="flex flex-col items-center gap-4 text-center mb-6">
          <img
            src="/assets/Logo.png"
            alt="Logo"
            className="xl:h-[40px] h-[28px] w-auto"
          />
          <p className="text-white text-2xl lg:text-4xl font-light">
            Authorized Access
          </p>
        </div>

       
        <div
          className={`${
            isActive ? "h-[420px]" : "h-[350px]"
          } w-full lg:w-[400px] border rounded-lg shadow-md p-4`}
        >
         
          <div className="flex justify-between mb-4">
            <button
              className={`${
                isActive ? "bg-gradient-to-r from-black to-[#EE2922]" : "bg-[#EE2922]"
              } w-1/2 text-white py-2 rounded-l-lg`}
              onClick={() => setIsActive(true)}
            >
              Sign Up
            </button>
            <button
              className={`${
                isActive ? "bg-[#EE2922]" : "bg-gradient-to-l from-black to-[#EE2922]"
              } w-1/2 text-white py-2 rounded-r-lg`}
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>

         
          {isActive ? (
            <form>
              {/* Sign Up Form */}
              <div className="mb-3">
                <label className="block text-gray-400 text-sm">Name</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm">Email</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm">Phone No.</label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-3">
                <label className="block text-gray-400 text-sm">Password</label>
                <input
                  type="password"
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm">
                  Confirm Password
                </label>
                <input
                  type="password"
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#EE2922] text-white py-2 font-semibold rounded-lg hover:bg-red-600 transition"
              >
                SIGN UP
              </button>
            </form>
          ) : (
            <form>
              {/* Login Form */}
              <div className="mb-4">
                <label className="block text-gray-400 text-sm">Email</label>
                <input
                  type="email"
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-400 text-sm">Password</label>
                <input
                  type="password"
                  className="w-full bg-transparent border-b border-gray-600 text-white focus:outline-none focus:border-red-500"
                />
              </div>
              <button
                type="submit"
                className="xl:w-1/2 w-[120px] bg-[#EE2922]  text-white py-2 rounded-lg hover:bg-red-600 transition mt-6"
              >
                LOGIN
              </button>
              <a
                href="#"
                className="text-white font-light ml-5 xl:text-sm text-[12px] underline mt-8"
              >
                Forgot your password?
              </a>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default SignUp;
