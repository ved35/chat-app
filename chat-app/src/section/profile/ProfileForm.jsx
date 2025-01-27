import React from "react";
import { Camera } from "@phosphor-icons/react";
import User1 from "../../images/user/user-01.png";
import SelectInput from "../../componets/from/SelectInput";

function ProfileForm() {
  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      <div className="relative z-30 w-full rounded-full p-1 backdrop-blur sm:max-w-36 sm:p-3">
        <div className="relative drop-shadow-2">
          <img
            src={User1}
            alt=""
            className="rounded-full object-center object-cover"
          />
          <label
            htmlFor="profile"
            className="absolute bottom-0 right-0 flex items-center justify-center rounded-full p-2 bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
          >
            <Camera />
            <input
              type="file"
              name="profile"
              id="profile"
              className="sr-only"
            />
          </label>
        </div>
      </div>
      <div className="rounded-sm border border-stroke dark:border-strokedark bg-white shadow-default dark:bg-boxdark md:max-w-150">
        <form action="" className="">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label
                htmlFor=""
                className="mb-3 block text-black dark:text-white"
              >
                Name
              </label>
              <input
                type="text"
                placeholder="Enter your name.."
                className="w-full rounded-lg border-[1.5px] border-stroke dark:border-form-strokedark bg-transparent py-3 px-5 text-black outline-none dark:text-white transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="mb-3 block text-black dark:text-white"
              >
                Job Title
              </label>
              <input
                type="text"
                placeholder="Enter your job title.."
                className="w-full rounded-lg border-[1.5px] border-stroke dark:border-form-strokedark bg-transparent py-3 px-5 text-black outline-none dark:text-white transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="mb-3 block text-black dark:text-white"
              >
                Bio
              </label>
              <input
                type="text"
                placeholder="Enter your bio.."
                className="w-full rounded-lg border-[1.5px] border-stroke dark:border-form-strokedark bg-transparent py-3 px-5 text-black outline-none dark:text-white transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:focus:border-primary"
              />
            </div>
            <SelectInput />
            <button
              type="submit"
              className="w-full cursor-pointer rounded-lg border-primary bg-primary py-3 px-6 text-white transition hover:bg-opacity-90"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProfileForm;
