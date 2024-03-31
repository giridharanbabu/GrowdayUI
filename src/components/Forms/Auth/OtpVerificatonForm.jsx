"use client";
import {
  authSelectors,
  verifyEmail,
} from "@/application/reducers/auth-reducer";
import { useRouter } from "next/navigation";
import React, {
  useState,
  ChangeEvent,
  FormEvent,
  useRef,
  useEffect,
} from "react";
import { useDispatch, useSelector } from "react-redux";

const OTPVerificationForm = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {
    loading: isLoading,
    data: verifyData,
    error: isError,
  } = useSelector(authSelectors.verifyEmail);
  const [otp, setOTP] = useState(Array(6).fill("")); // Initialize with an array of 6 empty strings
  const lastInputRef = useRef(null);

  const handleChange = (index, e) => {
    const value = e.target.value;
    // Update OTP value
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Move focus to the next input field if a number is entered
    if (value.length === 1 && index < otp.length - 1) {
      const nextIndex = index + 1;
      const nextInput = document.getElementById(`otp-input-${nextIndex}`);
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  useEffect(() => {
    if (!isLoading && verifyData.status === "success") {
      router.replace("/dashboard");
    }
  }, [verifyData, , isLoading, router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate OTP validation (hardcoded OTP: "123456")
    const enteredOTP = otp.join("");
    dispatch(verifyEmail(enteredOTP));
    // if (enteredOTP === '123456') {
    // Redirect to dashboard
    // window.location.href = '/dashboard';
    // }
  };

  return (
    <form
      className="flex flex-col justify-center items-center"
      onSubmit={handleSubmit}
    >
      <div>
        {otp.map((value, index) => (
          <input
            key={index}
            id={`otp-input-${index}`}
            type="number"
            maxLength={1}
            value={value}
            className="w-12 h-12 mx-1 text-center border border-gray-300 rounded"
            onChange={(e) => handleChange(index, e)}
            ref={index === otp.length - 1 ? lastInputRef : null} // Ref for the last input
          />
        ))}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="transform transition-transform duration-300 ease-in-out hover:scale-105 bg-palatteSecondary rounded-md px-5 py-2 text-gray-50 font-light text-base mt-5"
      >
        {isLoading ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default OTPVerificationForm;
