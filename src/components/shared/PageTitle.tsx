import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const PageTitle = ({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) => {
  return (
    <Stack
      mt={{ xs: 2, md: 0 }}
      mb={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Typography variant="h5" fontWeight={600}>
        {title}
      </Typography>
      {children}
    </Stack>
  );
};

export default PageTitle;
