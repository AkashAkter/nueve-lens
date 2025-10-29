"use client";

import { useState } from "react";
import Image from "next/image";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    captcha: "",
  });
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    captcha: "",
    general: "",
  });

  function generateCaptcha() {
    const characters = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
      captcha: "",
      general: "",
    };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    // CAPTCHA validation
    if (!formData.captcha) {
      newErrors.captcha = "CAPTCHA is required";
    } else if (formData.captcha.toUpperCase() !== captchaCode) {
      newErrors.captcha = "CAPTCHA code is incorrect";
    }

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password && !newErrors.captcha;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: "", password: "", captcha: "", general: "" });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Reset after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setFormData({ email: "", password: "", captcha: "" });
      setCaptchaCode(generateCaptcha());
      setErrors({ email: "", password: "", captcha: "", general: "" });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const refreshCaptcha = () => {
    setCaptchaCode(generateCaptcha());
    setFormData({ ...formData, captcha: "" });
    setErrors({ ...errors, captcha: "" });
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center">
          <div className="relative p-12 rounded-3xl surface/80 backdrop-blur-lg border border-custom/60 shadow-2xl">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            {/* Success Animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Animated Checkmark */}
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-12 h-12 text-white animate-checkmark"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>

                {/* Floating Particles */}
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-green-400 rounded-full animate-float"
                    style={{
                      top: `${Math.random() * 100}%`,
                      left: `${Math.random() * 100}%`,
                      animationDelay: `${i * 0.3}s`,
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-2xl font-bold text-custom mb-4">
              Welcome to the Lens!
            </h3>
            <p className="text-light mb-2">Your vision is being focused...</p>
            <p className="text-sm text-light">
              Redirecting you to amazing experiences
            </p>

            {/* Loading Bar */}
            <div className="mt-6 bg-gray-200 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full animate-loading-bar"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="relative p-8 md:p-12 rounded-3xl surface/80 backdrop-blur-lg border border-custom/60 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>

          <div className="flex justify-center mb-8">
            <div className="relative w-20 h-20 transform hover:scale-105 transition-transform duration-300">
              <Image
                src="/nueve-lens.png"
                alt="Nueve lens"
                fill
                className="object-contain drop-shadow-lg"
                priority
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div>
              <input
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                  errors.email ? "border-red-500" : "border-custom"
                }`}
                placeholder="Email address"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <input
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                  errors.password ? "border-red-500" : "border-custom"
                }`}
                placeholder="Password"
                disabled={isSubmitting}
              />
              {errors.password && (
                <p className="text-red-500 text-sm mt-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.password}
                </p>
              )}
            </div>

            {/* CAPTCHA Field */}
            <div className="space-y-2">
              <div className="flex space-x-4">
                <div className="flex-1">
                  <input
                    name="captcha"
                    type="text"
                    required
                    value={formData.captcha}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm uppercase ${
                      errors.captcha ? "border-red-500" : "border-custom"
                    }`}
                    placeholder="Enter CAPTCHA"
                    maxLength={6}
                    disabled={isSubmitting}
                  />
                </div>
                <div className="flex items-center">
                  <div className="relative">
                    <div className="primary text-white rounded-2xl p-3 min-w-[100px] shadow-lg">
                      <div className="text-sm font-mono font-bold tracking-widest text-center select-none">
                        {captchaCode}
                      </div>
                    </div>
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 animate-shine"></div>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={refreshCaptcha}
                  className="text-sm text-light hover:text-custom transition-colors duration-200 disabled:opacity-50 flex items-center"
                  disabled={isSubmitting}
                >
                  <svg
                    className="w-4 h-4 mr-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                    />
                  </svg>
                  Refresh CAPTCHA
                </button>
                {errors.captcha && (
                  <p className="text-red-500 text-sm flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.captcha}
                  </p>
                )}
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
                <p className="text-red-700 text-sm flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {errors.general}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full primary text-white py-3 px-6 rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg relative overflow-hidden mt-4"
            >
              {isSubmitting ? (
                <>
                  <span className="opacity-0">Sign In</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                </>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-light hover:text-custom transition-colors duration-200 text-sm"
            >
              Forgot password?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
