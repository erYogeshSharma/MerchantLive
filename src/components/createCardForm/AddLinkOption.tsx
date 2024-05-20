import ImageUploadButton from "../shared/ImageUploadButton";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { addLinkOption } from "../../store/business-form/business-form-api";
import { LoadingButton } from "@mui/lab";
import ModalWrapper from "../wrappers/ModalContainer";
import React from "react";
import { Stack, TextField } from "@mui/material";

export default function AddLinkOptionModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const dispatch = useAppDispatch();
  const { addingLinkOption } = useAppSelector((state) => state.businessForm);
  const [form, setForm] = React.useState({
    title: "",
    icon: "",
  });

  const handleClose = () => {
    setOpen(false);
    setForm({ title: "", icon: "" });
  };
  function handleSave() {
    dispatch(addLinkOption(form));
  }

  React.useEffect(() => {
    if (!addingLinkOption) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addingLinkOption]);
  return (
    <ModalWrapper
      open={open}
      footer={
        <Stack px={2} py={1}>
          <LoadingButton
            disabled={!form.title || !form.icon}
            loading={addingLinkOption}
            onClick={handleSave}
            variant="contained"
          >
            Save
          </LoadingButton>
        </Stack>
      }
      handleClose={() => setOpen(false)}
      label="Add Link option"
    >
      <Stack p={2} spacing={2}>
        <Stack>
          <ImageUploadButton
            image={form.icon || "https://loremflickr.com/100/100"}
            label="Select Icon"
            name={form.title}
            onChange={(link) => setForm((form) => ({ ...form, icon: link }))}
          />
        </Stack>
        <TextField
          label="Title"
          variant="outlined"
          size="small"
          placeholder="Eg: Facebook"
          value={form.title}
          onChange={(e) =>
            setForm((form) => ({ ...form, title: e.target.value }))
          }
        />
      </Stack>
    </ModalWrapper>
  );
}
