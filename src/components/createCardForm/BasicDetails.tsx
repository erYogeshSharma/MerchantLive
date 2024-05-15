import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateForm } from "../../store/business-form/business-form-slice";
import ImageUploadButton from "../shared/ImageUploadButton";
import { Industries } from "../../constants/industry";

const BasicDetails = () => {
  const dispatch = useAppDispatch();
  const { form, errors } = useAppSelector((state) => state.businessForm);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: any) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };

  const imageUploaded = (key: string, url: string) => {
    dispatch(updateForm({ [key]: url }));
  };
  return (
    <Stack spacing={2}>
      <Stack direction={{ xs: "row" }} alignItems="baseline" spacing={2}>
        <ImageUploadButton
          name="logo"
          image={form.logo}
          label="Select Logo"
          onChange={(url) => imageUploaded("logo", url)}
        />
        <ImageUploadButton
          name="coverImage"
          image={form.coverImage}
          label="Select Cover Image"
          onChange={(url) => imageUploaded("coverImage", url)}
        />
      </Stack>
      <TextField
        size="small"
        id="outlined-basic"
        label="Link ID"
        name="linkId"
        variant="outlined"
        onChange={handleChange}
        value={form.linkId}
        error={!!errors["linkId"]}
        helperText={errors.linkId}
      />
      <TextField
        size="small"
        id="outlined-basic"
        label="Name"
        name="name"
        variant="outlined"
        onChange={handleChange}
        value={form.name}
        error={!!errors["name"]}
        helperText={errors.name}
      />
      <TextField
        size="small"
        id="outlined-basic"
        label="Tagline"
        name="title"
        variant="outlined"
        onChange={handleChange}
        value={form.title}
        error={!!errors["title"]}
        helperText={errors.title}
      />
      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>Category</InputLabel>
        <Select
          value={form.category}
          label="Category"
          name="category"
          onChange={handleChange}
        >
          {Industries.map((i) => (
            <MenuItem value={i} key={i}>
              {i}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <TextField
        size="small"
        id="outlined-basic"
        label="Email"
        type="email"
        name="email"
        variant="outlined"
        onChange={handleChange}
        value={form.email}
        error={!!errors["email"]}
        helperText={errors.email}
      />
      <TextField
        id="standard-multiline-flexible"
        label="Description"
        value={form.description}
        name="description"
        onChange={handleChange}
        multiline
        minRows={4}
        maxRows={8}
        variant="outlined"
        error={!!errors["description"]}
        helperText={errors.description}
      />

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems="baseline"
        spacing={2}
      >
        <TextField
          size="small"
          fullWidth
          id="outlined-basic"
          label="Phone Number"
          name="phone"
          type="number"
          variant="outlined"
          onChange={handleChange}
          value={form.phone === 0 ? "" : form.phone}
          error={!!errors["phone"]}
          helperText={errors.phone}
        />
        <TextField
          size="small"
          fullWidth
          id="outlined-basic"
          label="Alternate Phone Number"
          name="alternatePhone"
          type="number"
          variant="outlined"
          onChange={handleChange}
          value={form.alternatePhone === 0 ? "" : form.alternatePhone}
          error={!!errors["alternatePhone"]}
          helperText={errors.alternatePhone}
        />
      </Stack>
    </Stack>
  );
};

export default BasicDetails;
