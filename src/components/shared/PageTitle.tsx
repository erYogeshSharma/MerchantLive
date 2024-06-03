import { Stack, Typography } from "@mui/material";
import { ReactNode } from "react";

const PageTitle = ({
  title,
  children,
  desc,
}: {
  title: string;
  children?: ReactNode;
  desc?: string;
}) => {
  return (
    <Stack
      mt={{ xs: 2, md: 0 }}
      mb={2}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack>
        <Typography variant="h5" fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="caption">{desc}</Typography>
      </Stack>
      {children}
    </Stack>
  );
};

export default PageTitle;
