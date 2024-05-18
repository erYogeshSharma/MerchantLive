import { Box, Paper, Tab, Tabs } from "@mui/material";
import React from "react";
import PageTitle from "../../components/shared/PageTitle";
import {
  AccountBoxOutlined,
  PaymentOutlined,
  StorefrontOutlined,
} from "@mui/icons-material";

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const Settings = () => {
  const [value, setValue] = React.useState(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (_: any, newValue: number) => {
    setValue(newValue);
  };
  return (
    <Box>
      <PageTitle title="Settings" />
      <Paper
        sx={{
          flexGrow: 1,
          display: "flex",
          height: "calc(100vh - 190px)",
        }}
      >
        <Box
          sx={{
            borderColor: "divider",
            borderRight: 2,
            borderRightColor: "divider",
          }}
        >
          <Tabs
            orientation="vertical"
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              icon={<AccountBoxOutlined />}
              iconPosition="start"
              label="Profile"
              {...a11yProps(0)}
            />
            <Tab
              icon={<StorefrontOutlined />}
              iconPosition="start"
              label="Cards"
              {...a11yProps(2)}
            />
            <Tab
              icon={<PaymentOutlined />}
              iconPosition="start"
              label="Billing"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
      </Paper>
    </Box>
  );
};

export default Settings;
