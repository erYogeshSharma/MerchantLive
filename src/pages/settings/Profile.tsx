import { Alert, Divider, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import ImageUploadButton from "../../components/shared/ImageUploadButton";
import { LoadingButton } from "@mui/lab";
import PasswordInput from "../../components/form/PasswordInput";
import { change_password } from "../../api";
import axios from "axios";
import { toast } from "react-toastify";
import { updateProfile } from "../../store/auth/auth-api";

const Profile = () => {
  const dispatch = useAppDispatch();
  const { user, updatingProfile } = useAppSelector((state) => state.auth);

  const [passFormError, setPassFormError] = useState<string | null>(null);
  const [updatingPassword, setUpdatingPassword] = useState(false);

  const [form, setForm] = useState({
    name: user?.name,
    profilePicUrl: user?.profilePicUrl,
  });

  function handleImageUploaded(imageURL: string) {
    setForm({ ...form, profilePicUrl: imageURL });
  }

  /* -------------------------------------------------------------------------- */
  /*                               UPDATE PROFILE                               */
  /* -------------------------------------------------------------------------- */
  async function handleProfileUpdate() {
    dispatch(updateProfile(form));
  }

  /* -------------------------------------------------------------------------- */
  /*                               UPDATE PASSWORD                              */
  /* -------------------------------------------------------------------------- */ async function handlePasswordUpdate(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const oldPassword = data.get("currentPassword") as string;
    const newPassword = data.get("newPassword") as string;
    const confirmNewPassword = data.get("confirmNewPassword") as string;

    setPassFormError("");
    if (newPassword?.length < 8) {
      setPassFormError("Password must be at-least 8 characters");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPassFormError("Passwords do not match");
      return;
    }

    try {
      setUpdatingPassword(true);
      const { data } = await change_password({ oldPassword, newPassword });
      if (data.message) {
        toast.success("Password Updated Successfully");
        event.currentTarget.reset();
        setUpdatingPassword(false);
      }
    } catch (error) {
      if (axios.isAxiosError(error))
        setPassFormError(error?.response?.data?.message);
      setUpdatingPassword(false);
    }
  }
  return (
    <Stack spacing={2}>
      <Stack>
        <ImageUploadButton
          name={user.name}
          label="Profile Picture"
          image={form.profilePicUrl}
          onChange={handleImageUploaded}
        />
      </Stack>
      <TextField
        size="small"
        label="Email"
        variant="outlined"
        disabled
        value={user.email}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <TextField
        size="small"
        label="Name"
        variant="outlined"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <Stack alignItems="flex-end">
        <LoadingButton
          loading={updatingProfile}
          onClick={handleProfileUpdate}
          variant="contained"
        >
          Update Profile
        </LoadingButton>
      </Stack>
      <Divider />
      <form onSubmit={handlePasswordUpdate}>
        <Stack spacing={2}>
          <Typography fontWeight={600} variant="body1">
            Change Password
          </Typography>

          <Stack spacing={2}>
            <PasswordInput
              name="currentPassword"
              label="Current Password"
              size="small"
              required
            />
            <PasswordInput
              name="newPassword"
              label="New Password"
              size="small"
              required
            />
            <PasswordInput
              name="confirmNewPassword"
              label="Confirm New Password"
              size="small"
              required
            />
            {passFormError && <Alert severity="error"> {passFormError} </Alert>}
          </Stack>
          <Stack alignItems="flex-end">
            <LoadingButton
              type="submit"
              variant="contained"
              loading={updatingPassword}
            >
              Update Password
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default Profile;
