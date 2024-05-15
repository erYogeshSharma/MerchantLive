import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { Grid, Stack, TextField } from "@mui/material";
import { updateForm } from "../../store/business-form/business-form-slice";

const AddAddress = () => {
  const dispatch = useAppDispatch();
  const { form, errors } = useAppSelector((state) => state.businessForm);
  const handleChange = (e: any) => {
    dispatch(updateForm({ [e.target.name]: e.target.value }));
  };
  return (
    <Stack>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            label="Address"
            name="address"
            variant="outlined"
            onChange={handleChange}
            value={form.address}
            error={!!errors["address"]}
            helperText={errors.address}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            label="City"
            name="city"
            variant="outlined"
            onChange={handleChange}
            value={form.city}
            error={!!errors["city"]}
            helperText={errors.city}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            label="State"
            name="state"
            variant="outlined"
            onChange={handleChange}
            value={form.state}
            error={!!errors["state"]}
            helperText={errors.state}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            label="Country"
            name="country"
            variant="outlined"
            onChange={handleChange}
            value={form.country}
            error={!!errors["country"]}
            helperText={errors.country}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            label="Zip Code"
            name="zipCode"
            type="number"
            variant="outlined"
            onChange={handleChange}
            value={form.zipCode}
            error={!!errors["zipCode"]}
            helperText={errors.zipCode}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            size="small"
            fullWidth
            id="outlined-basic"
            label="Google Map Link"
            name="googleMapLink"
            variant="outlined"
            onChange={handleChange}
            value={form.googleMapLink}
            error={!!errors["googleMapLink"]}
            helperText={errors.googleMapLink}
          />
        </Grid>
      </Grid>
    </Stack>
  );
};

export default AddAddress;
