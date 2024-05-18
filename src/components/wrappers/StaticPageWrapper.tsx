import { Container, Stack, Typography } from "@mui/material";

type Props = {
  image: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};
const StaticPageWrapper = ({ image, title, description, children }: Props) => {
  return (
    <Container maxWidth="md">
      <Stack
        sx={{ height: "calc(100vh - 200px)" }}
        alignItems="center"
        justifyContent="center"
      >
        <Stack alignItems="center">
          <img src={image} style={{ maxWidth: "500px" }} />
          <Stack spacing={2} alignItems="center" textAlign="center">
            <Stack spacing={1}>
              <Typography color="primary" fontWeight={600} variant="h5">
                {title}
              </Typography>
              <Typography variant="body2">{description}</Typography>
            </Stack>
            {children}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
export default StaticPageWrapper;
