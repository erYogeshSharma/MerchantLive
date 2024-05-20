import { Circle } from "@mui/icons-material";
import { Button, Grid, Paper, Stack, Typography } from "@mui/material";

const pro_plan = {
  name: "Pro",
  regularPrice: 1000,
  offerPrice: 200,
  features: [
    "Custom Theme Business Cards",
    "Enquiry Forms",
    "SEO Optimization",
    "Analytics for Business Cards",
  ],
  Description:
    "Unlock all premium features at an unbeatable price of just ₹2400/year. Originally priced at ₹12,000/year, you're now saving 80%! Enjoy the same great service for only ₹200/month, billed annually. Don't miss this opportunity to elevate your professional presence.",
};
const Billing = () => {
  return (
    <Grid>
      <Paper variant="outlined">
        <Stack p={2} spacing={2}>
          <Stack direction="row" justifyContent="flex-end">
            <Typography
              fontWeight={600}
              sx={{
                background: (theme) => theme.palette.primary.main,
                color: "white",
                borderRadius: 1,
                px: 2,
                py: 0.5,
              }}
            >
              {pro_plan.name}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="baseline">
            {/* <Typography
              sx={{ textDecoration: "line-through" }}
              variant="h6"
              fontWeight={700}
              color="primary"
            >
              ${pro_plan.regularPrice * 12}
            </Typography> */}
            <Typography variant="h2" fontWeight={700} color="primary">
              ₹{pro_plan.offerPrice * 12}
            </Typography>
            <Typography color="primary" variant="h4" fontWeight={600}>
              /Year
            </Typography>{" "}
          </Stack>
          <Typography variant="subtitle2" color="text.secondary">
            {pro_plan.Description}
          </Typography>
          <Stack mt={1} spacing={1}>
            <Typography variant="body1" fontWeight={600}>
              Features
            </Typography>
            <Stack spacing={0.5}>
              {pro_plan.features.map((feature) => (
                <Stack
                  direction="row"
                  key={feature}
                  alignItems="center"
                  spacing={1}
                >
                  <Circle sx={{ fontSize: 10 }} color="primary" />
                  <Typography variant="body2" color="text.secondary">
                    {feature}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Stack>
          <Stack>
            <Button variant="contained" size="large">
              Subscribe
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default Billing;
