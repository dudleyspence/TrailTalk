import React from "react";
import { useAuth } from "../../context/AuthContext";
import { EditAvatarModel } from "./EditAvatarModel";

export default function EditProfile() {
  const { userLoggedIn } = useAuth();
  console.log(userLoggedIn);

  return (
    <div className="flex flex-col justify-center items-center mt-20">
      <div className="flex flex-row justify-center items-center gap-5">
        <img
          className="aspect-square rounded-lg object-cover object-center w-[100px] h-[100px]"
          src={userLoggedIn.avatar_url}
          alt="profile image"
        />
        <EditAvatarModel />
      </div>
    </div>
  );
}
