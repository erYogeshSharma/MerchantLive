import { Stack, useMediaQuery } from "@mui/material";

type Props = {
  src: string;
};
const PhoneMockup = (props: Props) => {
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  return (
    <Stack
      width={isSmallScreen ? "100%" : 400}
      p={1}
      sx={{
        background: (theme) => theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: (theme) => theme.shadows[2],
      }}
    >
      <iframe
        src={props.src}
        style={{
          width: "100%",
          height: "calc(100vh - 220px )",
          border: "none",
          borderRadius: 8,
        }}
      ></iframe>
    </Stack>
  );
};

export default PhoneMockup;
