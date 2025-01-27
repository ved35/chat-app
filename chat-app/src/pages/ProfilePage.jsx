import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ProfileForm, UpdatePasswordForm } from "../section/profile";

function ProfilePage() {
  const [openTab, setOpenTab] = useState(1);

  const activeClasses = "text-primary border-primary";
  const inactiveClasses = "border-transparent";

  return (
    <div className="w-full rounded-sm border border-stroke dark:border-strokedark bg-white dark:bg-boxdark py-7.5 px-20 shadow-default overflow-auto no-scrollbar">
      {/* buttons for tab */}
      <div className="mb-6 flex flex-wrap gap-5 border-b border-stroke dark:border-strokedark sm:gap-10">
        <Link
          to="#"
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            openTab === 1 ? activeClasses : inactiveClasses
          }`}
          onClick={() => {
            setOpenTab(1);
          }}
        >
          Profile
        </Link>
        <Link
          to="#"
          className={`border-b-2 py-4 text-sm font-medium hover:text-primary md:text-base ${
            openTab === 2 ? activeClasses : inactiveClasses
          }`}
          onClick={() => {
            setOpenTab(2);
          }}
        >
          Update password
        </Link>
      </div>
      {/* content for tabs */}
      <div>
        <div className={`${openTab === 1 ? 'block' : 'hidden'}`}>
          <ProfileForm />
        </div>
        <div className={`${openTab === 2 ? 'block' : 'hidden'}`}>
          <UpdatePasswordForm />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
