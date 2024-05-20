import { Button, Paper, Stack } from "@mui/material";
import { useSearchParams } from "react-router-dom";

type Props = {
  nav: {
    title: string;
    value: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    icon: any;
  }[];
};
const SideBar = ({ nav }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(tab: string) {
    searchParams.set("tab", tab);
    setSearchParams(searchParams);
  }

  return (
    <Paper>
      <Stack
        direction={{ xs: "row", md: "column" }}
        p={2}
        width="100%"
        spacing={1}
      >
        {nav.map((item) => (
          <Button
            variant={
              searchParams.get("tab") === item.value ? "contained" : "outlined"
            }
            startIcon={<item.icon />}
            key={item.title}
            onClick={() => handleClick(item.value)}
          >
            {item.title}
          </Button>
        ))}
      </Stack>
    </Paper>
  );
};

export default SideBar;
