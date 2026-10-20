import React from "react";
import { UserRound, ShieldCheck, Leaf, Mail } from "lucide-react";
import useAuth from "../../../hooks/useAuth";
import useRole from "../../../hooks/useRole";

const Profile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  const displayName = user?.displayName || "Plant Lover";
  const email = user?.email || "No email available";
  const photoURL = user?.photoURL;

  return (
    <div className="min-h-[80vh] bg-base-200 px-4 py-12 transition-colors duration-300 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Page Heading */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
            <Leaf size={28} />
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-base-content sm:text-4xl">
            My Profile
          </h1>

          <p className="mt-2 text-base-content/60">
            Your personal space in the Tree Planet community.
          </p>
        </div>

        {/* Profile Card */}
        <div className="overflow-hidden rounded-3xl border border-base-300 bg-base-100 shadow-xl">
          {/* Green Banner */}
          <div className="relative h-36 bg-gradient-to-r from-green-700 via-emerald-600 to-lime-500 sm:h-44">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute -right-8 -top-12 h-40 w-40 rounded-full border-[20px] border-white" />
              <div className="absolute -bottom-16 left-10 h-40 w-40 rounded-full border-[20px] border-white" />
            </div>
          </div>

          {/* Avatar and Name */}
          <div className="px-6 pb-8 sm:px-10">
            <div className="-mt-16 flex flex-col items-center sm:-mt-20">
              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-full border-4 border-base-100 bg-green-100 shadow-lg sm:h-40 sm:w-40">
                {photoURL ? (
                  <img
                    src={photoURL}
                    alt={`${displayName}'s profile`}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <UserRound size={64} className="text-green-700" />
                )}
              </div>

              <h2 className="mt-5 text-center text-2xl font-bold text-base-content sm:text-3xl">
                {displayName}
              </h2>

              <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-50 px-4 py-1.5 text-sm font-semibold capitalize text-green-800">
                <ShieldCheck size={16} />
                {role || "Customer"}
              </div>

              <p className="mt-4 max-w-md text-center text-sm leading-6 text-base-content/60">
                Welcome to Tree Planet! Keep growing your connection with nature.
              </p>
            </div>

            {/* Information Section */}
            <div className="mt-8 border-t border-base-300 pt-6">
              <h3 className="mb-4 text-lg font-bold text-base-content">
                Account Information
              </h3>

              <div className="flex items-center gap-4 rounded-2xl bg-base-200 p-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-700">
                  <Mail size={21} />
                </div>

                <div className="min-w-0">
                  <p className="text-xs font-medium uppercase tracking-wider text-base-content/50">
                    Email Address
                  </p>
                  <p className="mt-1 break-all text-sm font-semibold text-base-content sm:text-base">
                    {email}
                  </p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-6 flex items-center justify-center gap-2 text-sm text-base-content/50">
              <Leaf size={16} className="text-green-600" />
              <span>Growing greener, one plant at a time.</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;