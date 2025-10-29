"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    captcha: "",
    acceptTerms: false,
  });
  const [captchaCode, setCaptchaCode] = useState(generateCaptcha());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    dateOfBirth: "",
    captcha: "",
    acceptTerms: "",
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
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      captcha: "",
      acceptTerms: "",
      general: "",
    };

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    // Date of Birth validation
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = "Date of birth is required";
    } else {
      const birthDate = new Date(formData.dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
      ) {
        age--;
      }

      if (age < 18) {
        newErrors.dateOfBirth = "You must be at least 18 years old";
      }
    }

    // CAPTCHA validation
    if (!formData.captcha) {
      newErrors.captcha = "CAPTCHA is required";
    } else if (formData.captcha.toUpperCase() !== captchaCode) {
      newErrors.captcha = "CAPTCHA code is incorrect";
    }

    // Terms validation
    if (!formData.acceptTerms) {
      newErrors.acceptTerms = "You must accept the terms and conditions";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      dateOfBirth: "",
      captcha: "",
      acceptTerms: "",
      general: "",
    });

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsSubmitting(false);
    setShowSuccess(true);

    // Redirect to homepage after 4 seconds
    setTimeout(() => {
      router.push("/");
    }, 4000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
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
        <div className="max-w-lg w-full text-center">
          <div className="relative p-8 rounded-3xl surface/80 backdrop-blur-lg border border-custom/60 shadow-2xl">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            </div>

            {/* Success Animation */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                {/* Animated Camera Shutter */}
                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 relative">
                  <div className="absolute inset-3 bg-white rounded-full animate-shutter"></div>
                  <div className="absolute w-6 h-6 bg-gray-800 rounded-full z-10"></div>
                  <div className="absolute w-3 h-3 bg-white rounded-full z-20 animate-flash"></div>
                </div>

                {/* Floating Photo Frames */}
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-5 h-6 border-2 border-white bg-yellow-100 shadow-lg animate-float-photo"
                    style={{
                      top: `${20 + Math.random() * 60}%`,
                      left: `${10 + Math.random() * 80}%`,
                      transform: `rotate(${Math.random() * 30 - 15}deg)`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  >
                    <div className="w-full h-3/4 bg-white border-b"></div>
                    <div className="w-3 h-1 bg-gray-300 mx-auto mt-1"></div>
                  </div>
                ))}
              </div>
            </div>

            {/* Success Message */}
            <h3 className="text-2xl font-bold text-custom mb-3">
              Welcome to Nueve Lens!
            </h3>
            <p className="text-light mb-4">
              Your account has been successfully created
            </p>
            <div className="space-y-2 text-sm text-light">
              <p>🎉 Ready to book your first photoshoot</p>
              <p>📸 Explore amazing portfolios</p>
              <p>📖 Discover photography tips & blogs</p>
            </div>

            {/* Progress with Camera Animation */}
            <div className="mt-6 flex items-center justify-center space-x-4">
              <div className="flex space-x-1">
                {[1, 2, 3, 4].map((dot) => (
                  <div
                    key={dot}
                    className="w-2 h-2 bg-primary rounded-full animate-pulse"
                    style={{ animationDelay: `${dot * 0.2}s` }}
                  ></div>
                ))}
              </div>
              <span className="text-sm text-light">
                Setting up your profile...
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="relative p-8 rounded-3xl surface/80 backdrop-blur-lg border border-custom/60 shadow-2xl">
          <div className="absolute inset-0 overflow-hidden rounded-3xl -z-10">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          </div>

          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Side - Branding */}
            <div className="md:w-2/5 flex flex-col justify-center items-center text-center p-6">
              <div className="relative w-24 h-24 transform hover:scale-105 transition-transform duration-300 mb-6">
                <Image
                  src="/nueve-lens.png"
                  alt="Nueve lens"
                  fill
                  className="object-contain drop-shadow-lg"
                  priority
                />
              </div>

              <h1 className="text-3xl font-bold text-custom mb-4">
                Join Nueve Lens
              </h1>
              <p className="text-light text-lg mb-6 leading-relaxed">
                Book professional photoshoots, explore stunning portfolios, and
                get inspired by our photography blogs
              </p>

              <div className="space-y-3 text-sm text-light">
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Book professional photoshoots</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Explore stunning portfolios</span>
                </div>
                <div className="flex items-center justify-center">
                  <svg
                    className="w-5 h-5 mr-2 text-green-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Read expert photography blogs</span>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="md:w-3/5">
              <h1 className="text-2xl font-bold text-center text-custom mb-2">
                Create Your Account
              </h1>
              <p className="text-light text-center mb-8">
                Join our photography community
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        errors.firstName ? "border-red-500" : "border-custom"
                      }`}
                      placeholder="First name"
                      disabled={isSubmitting}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.firstName}
                      </p>
                    )}
                  </div>
                  <div>
                    <input
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                        errors.lastName ? "border-red-500" : "border-custom"
                      }`}
                      placeholder="Last name"
                      disabled={isSubmitting}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1 flex items-center">
                        <svg
                          className="w-3 h-3 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

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
                        className="w-3 h-3 mr-1"
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
                    placeholder="Password (min. 8 characters)"
                    disabled={isSubmitting}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
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

                {/* Date of Birth Field */}
                <div>
                  <label className="block text-sm text-light mb-2">
                    Date of Birth (Must be 18+)
                  </label>
                  <input
                    name="dateOfBirth"
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-2xl focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm ${
                      errors.dateOfBirth ? "border-red-500" : "border-custom"
                    }`}
                    disabled={isSubmitting}
                  />
                  {errors.dateOfBirth && (
                    <p className="text-red-500 text-sm mt-1 flex items-center">
                      <svg
                        className="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {errors.dateOfBirth}
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
                          className="w-3 h-3 mr-1"
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

                {/* Terms Checkbox */}
                <div className="flex items-start space-x-3">
                  <input
                    name="acceptTerms"
                    type="checkbox"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mt-1 w-4 h-4 text-primary bg-gray-100 border-custom rounded focus:ring-primary focus:ring-2"
                    disabled={isSubmitting}
                  />
                  <label className="text-sm text-light">
                    I agree to the{" "}
                    <a href="#" className="text-primary hover:underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primary hover:underline">
                      Privacy Policy
                    </a>
                  </label>
                </div>
                {errors.acceptTerms && (
                  <p className="text-red-500 text-sm flex items-center">
                    <svg
                      className="w-3 h-3 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {errors.acceptTerms}
                  </p>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full primary text-white py-3 px-6 rounded-2xl font-medium hover:shadow-lg transform hover:scale-105 transition-all duration-300 shadow-lg disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg relative overflow-hidden mt-4"
                >
                  {isSubmitting ? (
                    <>
                      <span className="opacity-0">Create Account</span>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-light text-sm">
                  Already have an account?{" "}
                  <a
                    href="/login"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign in
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
