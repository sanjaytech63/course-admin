import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { BiMailSend } from "react-icons/bi";
import { updateAvatar, updateProfile } from "../../api/authService";
import { FiSave } from "react-icons/fi";
import { updatePfofileSchema } from "../../validations/userValidation";
import { handleError, handleSuccess } from "../../utils/toastHandler";
import Loader from "./Loader";
import { Card } from "./Card";
import InputField from "./InputField";
import Button from "./Button";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [formData, setFormData] = useState({ fullName: "", email: "" });
  const [errors, setErrors] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [avatarLoading, setAvatarLoading] = useState(false);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { email, fullName } = updatePfofileSchema.parse(formData);
      const response = await updateProfile(fullName, email);
      setUser(response?.data);

      handleSuccess(response?.message);
      setErrors({ email: "", fullName: "" });
    } catch (err) {
      if (err instanceof Error && "issues" in err) {
        const zodError = err as any;
        const fieldErrors: any = {};
        if (Array.isArray(zodError.issues)) {
          zodError.issues.forEach((issue: any) => {
            if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
          });
        }
        setErrors(fieldErrors);
      } else {
        handleError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleAvatarUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setAvatarLoading(true);
      const data = await updateAvatar(formData);
      setUser(data.data);
      handleSuccess(data.message);
    } catch (err) {
      handleError(err);
    } finally {
      setAvatarLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleAvatarUpload(e.target.files[0]);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({ fullName: user.fullName, email: user.email });
    }
  }, [user]);

  return (
    <Card title="Profile Settings" padding="lg">
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.avatar}
          alt={user?.fullName}
          loading="lazy"
          onClick={handleImageClick}
          className="w-20 h-20 rounded-full cursor-pointer object-fit border-2 border-indigo-500 shadow-sm"
        />

        {avatarLoading && (
          <div className="py-2">
            <Loader className="text-gray-600" label="Updating Avatar..." />
          </div>
        )}

        <input
          name="avatar"
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />

        <h2 className="mt-3 font-semibold text-gray-800 capitalize">
          {user?.fullName}
        </h2>
        <p className="text-sm text-gray-500">{user?.email}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <InputField
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.fullName}
            name="fullName"
            onChange={handleChange("fullName")}
            error={errors.fullName}
            icon={<BiMailSend />}
          />

          <InputField
            type="email"
            label="Email address"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange("email")}
            error={errors.email}
            icon={<BiMailSend />}
          />

          <div className="flex justify-end">
            <Button isLoading={loading} type="submit">
              <FiSave size={16} />
              <span>Save Profile</span>
            </Button>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Profile;
