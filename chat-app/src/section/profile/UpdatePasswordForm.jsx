import React from "react";

function UpdatePasswordForm() {
  return (
    <div className="flex flex-col w-full p-4 space-y-6">
      <div className="rounded-sm border border-stroke dark:border-strokedark bg-white shadow-default dark:bg-boxdark md:max-w-150">
        <form action="" className="">
          <div className="flex flex-col gap-5.5 p-6.5">
            <div>
              <label
                htmlFor=""
                className="mb-3 block text-black dark:text-white"
              >
                Current password
              </label>
              <input
                type="text"
                placeholder="Enter your password.."
                required
                className="w-full rounded-lg border-[1.5px] border-stroke dark:border-form-strokedark bg-transparent py-3 px-5 text-black outline-none dark:text-white transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:focus:border-primary"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="mb-3 block text-black dark:text-white"
              >
                New password
              </label>
              <input
                type="text"
                placeholder="Choose new password.."
                required
                className="w-full rounded-lg border-[1.5px] border-stroke dark:border-form-strokedark bg-transparent py-3 px-5 text-black outline-none dark:text-white transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:focus:border-primary"
              />
            </div>
            
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

export default UpdatePasswordForm;
