import { Box, Button, Grid, Paper, Stack, Typography } from "@mui/material";
import placeholder from "../../assets/design.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getAllBusiness } from "../../store/business/business-api";
import PageTitle from "../../components/shared/PageTitle";
import StaticPageWrapper from "../../components/wrappers/StaticPageWrapper";
import { LineChart } from "@mui/x-charts/LineChart";
import { PieChart } from "@mui/x-charts/PieChart";
import { SparkLineChart } from "@mui/x-charts/SparkLineChart";
const Analytics = () => {
  const { cards } = useAppSelector((state) => state.business);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!cards.length) {
      dispatch(getAllBusiness());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(cards);
  return (
    <Box>
      {cards?.length > 0 ? (
        <>
          <PageTitle title="Analytics"></PageTitle>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper variant="outlined">
                  <Stack p={2} spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                      Page Visits
                    </Typography>
                    <LineChart
                      xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                      series={[
                        {
                          data: [2, 5.5, 2, 8.5, 1.5, 5],
                        },
                      ]}
                      height={300}
                    />
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined">
                  <Stack p={2} spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                      Traffic by source
                    </Typography>
                    <PieChart
                      series={[
                        {
                          data: [
                            { id: 0, value: 10, label: "series A" },
                            { id: 1, value: 15, label: "series B" },
                            { id: 2, value: 20, label: "series C" },
                          ],
                        },
                      ]}
                      width={400}
                      height={200}
                    />
                  </Stack>
                </Paper>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper variant="outlined">
                  <Stack p={2} spacing={1}>
                    <Typography variant="body1" fontWeight={600}>
                      Trends
                    </Typography>
                    <Box sx={{ flexGrow: 1 }}>
                      <SparkLineChart
                        plotType="bar"
                        data={[1, 4, 2, 5, 7, 2, 4, 6]}
                      />
                    </Box>
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Stack>
        </>
      ) : (
        <StaticPageWrapper
          image={placeholder}
          title="Welcome! Let's Get Started"
          description="It looks like you haven't created any pages yet. Click the button
        below to create your first page and start building your content.
        If you need any help, check out our tutorial or contact support."
        >
          <Button variant="contained" onClick={() => navigate("/cards/create")}>
            Create one
          </Button>
        </StaticPageWrapper>
      )}
    </Box>
  );
};

export default Analytics;
