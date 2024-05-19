import { Box } from "@mui/material";
import { useEffect } from "react";
// import ThemeSelector from "../../components/shared/ThemeSelector";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import PageTitle from "../../components/shared/PageTitle";
import { useParams } from "react-router-dom";
import { getBusinessById } from "../../store/business/business-api";
// import { update_settings } from "../../api";
import PhoneMockup from "../../components/shared/PhoneMockup";

const Settings = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { businessDetails } = useAppSelector((state) => state.business);
  const businessId = params.bId;
  // const [t, setT] = React.useState("light");
  useEffect(() => {
    if (
      !businessDetails ||
      (businessDetails && businessDetails._id !== businessId)
    ) {
      dispatch(getBusinessById(businessId as string));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // async function changeTheme(theme: string) {
  //   try {
  //     const { data } = await update_settings({ theme: theme, _id: businessId });
  //     setT(theme);
  //   } catch (error) {}
  // }
  return (
    <Box>
      <PageTitle title="Settings" />
      {/* <Paper>
        <Grid container spacing={2} p={2}>
          <Grid item>
          
          </Grid>
          <Grid item>
            <Stack sx={{ height: "calc(100vh - 220px)", overflowY: "auto" }}>
              <ThemeSelector onClick={changeTheme} value={"light"} />
            </Stack>
          </Grid>
        </Grid>
      </Paper> */}
      <PhoneMockup src="https://id.zapminds.com/saul-goodman" />
    </Box>
  );
};

export default Settings;
