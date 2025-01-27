import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from "../../componets/Logo";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResendOtp, VerifyOtp } from "../../redux/Slices/auth";

const schema = Yup.object().shape({
  otp: Yup.array().of(
    Yup.string()
      .matches(/^\d$/, "Must be a digit")
      .length(1, "Otp must be 4 digit")
      .required("Otp isRequired")
  ),
});

function Verification() {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => state.auth);
  
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      otp: ["", "", "", ""],
    },
  });

  const [resendDisabled, setResendDisabled] = useState(false);
  const [timer, setTimer] = useState(60);
  const inputRef = useRef([]);

  const email = new URLSearchParams(location.search).get("email");

  useEffect(() => {
    if (inputRef.current[0]) {
      inputRef.current[0].focus();
    }
  }, []);

  useEffect(() => {
    console.log("errors", errors);
  }, [errors]);
  // Timer effect for disbale resend button

  useEffect(() => {
    if (resendDisabled) {
      let timer = setInterval(() => {
        setTimer((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            setResendDisabled(false);
            return 0;
          }
        });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendDisabled]);

  const handleChangeInput = (e, index) => {
    const value = e.target.value;
    console.log("Handling change for input", value);
    if (/^\d$/.test(value)) {
      setValue(`otp[${index}]`, value, {
        shouldValidate: true,
      });
      if (index < 3) {
        inputRef.current[index + 1]?.focus();
      }
    } else if (value === "") {
      setValue(`otp[${index}]`, "");
      if (index > 0 && e.nativeEvent.inputType === "deleteContentBackward") {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const onSubmit = (data) => {
    console.log("form data", data);
    const otp = data.otp.join("");
    try {
      dispatch(VerifyOtp({ email, otp }, navigate));
    } catch (error) {
      console.log("verification fail", error);
    }
  };

  const handleDisabledOtp = async () => {
    setResendDisabled(true);
    setTimer(60);
    try {
      dispatch(ResendOtp(email));
      console.log("resend otp success");
    } catch (error) {
      console.log("resend otp fail", error);
    }
  };

  return (
    <div className="overflow-hidden px-4 dark:bg-boxdark-2 sm:px-8">
      <div className="flex h-screen flex-col items-center justify-center overflow-hidden">
        <div className="no-scrollbar overflow-y-auto py-20">
          <div className="mx-auto w-full max-w-[480px]">
            <div className="text-center">
              <Link to="/" className="mx-auto mb-10 inline-flex">
                <Logo />
              </Link>

              <div className="bg-white p-4 shadow-14 rounded-xl dark:bg-boxdark lg:p-7.5 xl:p-12.5">
                <h1 className="mb-2.5 text-3xl font-black leading-[48px] text-black dark:text-white capitalize">
                  Verfy Your Account
                </h1>

                <p className="mb-7.5 font-medium">
                  Enter the 4 digit code sent to registered enail id
                </p>

                <form action="" onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-row items-center gap-4.5">
                    {Array.from({ length: 4 }).map((_, index) => {
                      return (
                        <Controller
                          key={index}
                          name={`otp[${index}]`}
                          control={control}
                          render={({ field }) => {
                            return (
                              <input
                                {...field}
                                ref={(el) => (inputRef.current[index] = el)}
                                type="text"
                                maxLength="1"
                                className="w-full rounded-md border-[1.5px] border-stroke bg-transparent px-5 py-3 text-center text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-white dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                                onChange={(e) => handleChangeInput(e, index)}
                                onKeyDown={(e) => {
                                  if (
                                    e.key === "Backspace" &&
                                    getValues(`otp[${index}]`) === ""
                                  ) {
                                    inputRef.current[index - 1]?.focus();
                                  }
                                }}
                              />
                            );
                          }}
                        />
                      );
                    })}
                  </div>
                  {errors.otp && (
                    <p className="text-red pt-2">{errors.otp.message}</p>
                  )}
                  <p className="mb-5 mt-4 text-black font-medium text-left dark:text-white space-x-2 flex flex-row items-center">
                    <div>Did not receive a code?</div>
                    <button
                      type="button"
                      disabled={resendDisabled}
                      onClick={handleDisabledOtp}
                      className={`${
                        resendDisabled ? "text-body" : "text-primary"
                      }`}
                    >
                      Resend {resendDisabled ? `in ${timer}s` : ""}
                    </button>
                  </p>

                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-primary p-[13px] font-bold hover:bg-opacity-90 text-white"
                    disabled={isLoading || isSubmitting}
                  >
                    {isLoading || isSubmitting ? "Submitting..." : "Verify"}
                  </button>

                  <span className="mt-5 block text-red">
                    Don't share verification code with anyone!
                  </span>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Verification;
