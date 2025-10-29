import React, { useState } from "react";
import { handleError, handleSuccess } from "../../utils/toastHandler";
import { changePassword } from "../../api/authService";
import { Card } from "./Card";
import InputField from "./InputField";
import Button from "./Button";

const ChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setErrors] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (field: string) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { oldPassword, newPassword } = formData;

      if (newPassword !== formData.confirmPassword) {
        throw new Error("Passwords do not match");
      }

      const res = await changePassword(oldPassword, newPassword);

      if (res.success) {
        handleSuccess(res.message);
        setErrors({ oldPassword: "", newPassword: "", confirmPassword: "" });
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" });
      }
    } catch (err) {
      console.log(err, "error");

      if (err instanceof Error && "issues" in err) {
        const zodError = err as any;
        const fieldErrors: any = {};
        zodError.issues.forEach((issue: any) => {
          if (issue.path?.[0]) fieldErrors[issue.path[0]] = issue.message;
        });
        setErrors(fieldErrors);
      } else {
        handleError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card title="Security" padding="lg">
      <div className="space-y-4">
        <form onSubmit={handleSubmit}>
          <div className="py-2">
            <InputField
              label="Current Password"
              placeholder="Current password"
              type="password"
              name="oldPassword"
              value={formData?.oldPassword}
              onChange={handleChange("oldPassword")}
              error={error.oldPassword}
            />
          </div>
          <div className="py-2">
            <InputField
              label="New Password"
              placeholder="New password"
              type="password"
              name="newPassword"
              value={formData?.newPassword}
              onChange={handleChange("newPassword")}
              error={error.newPassword}
            />
          </div>
          <div className="py-2">
            <InputField
              label="Confirm Password"
              placeholder="confirmPassword password"
              type="password"
              name="confirmPassword"
              value={formData?.confirmPassword}
              onChange={handleChange("confirmPassword")}
              error={error.confirmPassword}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" isLoading={loading}>
              Update Password
            </Button>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default ChangePassword;
