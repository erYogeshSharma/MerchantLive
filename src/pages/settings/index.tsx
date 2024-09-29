import PageTitle from "../../components/shared/PageTitle";
import { Paper, Stack } from "@mui/material";
import SideBar from "./SideBar";
import { useSearchParams } from "react-router-dom";
import Profile from "./Profile";
import Billing from "./Billing";
import LinkIcon from "@mui/icons-material/Link";
import {
  ConnectWithoutContact,
  Money,
  Person,
  Support,
} from "@mui/icons-material";
import Feedback from "./Feedback";
import { useEffect } from "react";
import Referral from "./Referral";
import Domain from "./Domain";
const nav = [
  {
    title: "Profile",
    value: "profile",
    icon: Person,
  },
  {
    title: "Billing",
    value: "billing",
    icon: Money,
  },
  {
    title: "Feedback",
    value: "feedback",
    icon: Support,
  },
  {
    title: "Referral",
    value: "referral",
    icon: ConnectWithoutContact,
  },
  {
    title: "Domain",
    value: "domain",
    icon: LinkIcon,
  },
];
const Settings = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const tab = searchParams.get("tab") as string;

  useEffect(() => {
    if (!tab) {
      searchParams.set("tab", "profile");
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <PageTitle title="Settings" />
      <Stack
        width="100%"
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "center", md: "flex-start" }}
        spacing={2}
      >
        <Stack width={{ xs: "100%", md: "auto" }}>
          <SideBar nav={nav} />
        </Stack>
        <Stack width={{ xs: "100%", md: "100%" }}>
          <Paper>
            <Stack p={2} sx={{ minHeight: "calc(100vh - 200px)" }}>
              <PageTitle
                title={nav.find((t) => t.value === tab)?.title as string}
              ></PageTitle>
              {
                {
                  profile: <Profile />,
                  billing: <Billing />,
                  feedback: <Feedback />,
                  referral: <Referral />,
                  domain: <Domain />,
                }[tab]
              }
            </Stack>
          </Paper>
        </Stack>
      </Stack>
    </div>
  );
};

export default Settings;
