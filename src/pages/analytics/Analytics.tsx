import {
  Box,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import PageTitle from "../../components/shared/PageTitle";
import { LineChart, lineElementClasses } from "@mui/x-charts/LineChart";
import NoCard from "../../components/templates/NoCard";
import { getBusinessVisits } from "@/store/analytics/analytics.api";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { OpenInFull } from "@mui/icons-material";
import { getAllBusinessEnquiries } from "@/store/business/business-api";

const Analytics = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const { business } = useAppSelector((state) => state.app);
  const { enquires } = useAppSelector((state) => state.business);
  const startDate = moment().subtract(1, "month").toISOString();
  const endDate = new Date().toISOString();

  const { visits, graphData, uniqueVisits } = useAppSelector(
    (state) => state.analytics
  );

  function getVisitAnalytics(from: string, to: string) {
    dispatch(
      getBusinessVisits({
        business: business._id,
        startDate: from,
        endDate: to,
      })
    );
  }
  //get the visits if cards are available
  useEffect(() => {
    getVisitAnalytics(startDate, endDate);
    dispatch(getAllBusinessEnquiries());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //create a function which takes the start and end date and sets the searchParams and dispatches the getBusinessVisits action
  function handleDateFilter({
    start = startDate,
    end = endDate,
  }: {
    start?: string;
    end?: string;
  }) {
    getVisitAnalytics(start, end);
  }

  //create  a function which takes the visitsData and outputs the data in the format required by the LineChart component
  const isDayGraph = moment(endDate).diff(moment(startDate), "days") === 0;

  const statsCards = [
    {
      title: "Total Visitors",
      value: visits.length,
    },
    {
      title: "Unique Visitors",
      value: uniqueVisits,
    },
    {
      title: "Enquiries",
      value: enquires.length,
      link: "/enquiries",
    },
  ];

  const filters = [
    {
      title: "Today",
      startDate: moment().set("hour", 0).toISOString(),
      endDate: moment().toISOString(),
    },
    {
      title: "This Week",
      startDate: moment().startOf("week").toISOString(),
      endDate: moment().toISOString(),
    },
    {
      title: "This Month",
      startDate: moment().startOf("month").toISOString(),
      endDate: moment().toISOString(),
    },
    {
      title: "Last 2 Months",
      startDate: moment().subtract(2, "month").toISOString(),
      endDate: moment().toISOString(),
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleFilter(e: any) {
    const value = e.target.value;
    const filter = filters.find(
      (f) => f.title === value
    ) as (typeof filters)[0];

    getVisitAnalytics(filter.startDate, filter.endDate);
  }

  function getGraphLabel(value: number) {
    if (isDayGraph) {
      return moment().hour(value).format("hh:mm A");
    } else {
      return moment().dayOfYear(value).format("DD MMM YY");
    }
  }

  return (
    <Box>
      {business._id ? (
        <>
          <PageTitle title="Analytics" desc="Analytics for your business page">
            <FormControl sx={{ m: 1, minWidth: 190 }} size="small">
              <InputLabel>Duration</InputLabel>
              <Select size="small" label="Duration" onChange={handleFilter}>
                {filters.map((filter, index) => (
                  <MenuItem key={index} value={filter.title}>
                    {filter.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </PageTitle>
          <Stack mb={2}>
            <Grid container spacing={2}>
              {statsCards.map((card, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Paper variant="outlined">
                    <Stack p={2}>
                      <Stack>
                        <Stack
                          direction="row"
                          alignItems="flex-start"
                          justifyContent="space-between"
                        >
                          <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="primary"
                          >
                            {card.value}
                          </Typography>
                          {card.link && (
                            <Tooltip title="Open Enquiries">
                              <IconButton
                                onClick={() => navigate("/enquiries")}
                              >
                                <OpenInFull />
                              </IconButton>
                            </Tooltip>
                          )}
                        </Stack>
                        <Typography variant="h5" fontWeight={600}>
                          {card.title}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Stack>
          <Stack>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Paper variant="outlined">
                  <Stack p={2} spacing={1}>
                    <Stack
                      direction={{ xs: "column", md: "row" }}
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Typography variant="h5" fontWeight={600}>
                        Page Visitors
                      </Typography>

                      {/* DATE FILTERS */}
                      <Stack direction="row" spacing={1}>
                        <DatePicker
                          label="From Date"
                          value={moment(startDate)}
                          maxDate={moment(endDate)}
                          slotProps={{ textField: { size: "small" } }}
                          onChange={(newValue) =>
                            handleDateFilter({
                              start: moment(newValue).toISOString(),
                            })
                          }
                        />

                        <DatePicker
                          slotProps={{ textField: { size: "small" } }}
                          label="To Date"
                          maxDate={moment()}
                          value={moment(endDate)}
                          onChange={(newValue) =>
                            handleDateFilter({
                              end: moment(newValue).toISOString(),
                            })
                          }
                        />
                      </Stack>
                    </Stack>
                    {graphData.length > 0 && (
                      <LineChart
                        sx={{
                          [`& .${lineElementClasses.root}`]: {
                            strokeWidth: 0,
                          },
                        }}
                        xAxis={[
                          {
                            dataKey: "x",
                            valueFormatter: (value) => getGraphLabel(value),
                            min: isDayGraph
                              ? moment(startDate).hour()
                              : moment(startDate).dayOfYear(),
                            max: isDayGraph
                              ? moment(endDate).hour()
                              : moment(endDate).dayOfYear(),
                          },
                        ]}
                        series={[
                          {
                            dataKey: "y",
                            area: true,

                            valueFormatter: (value) =>
                              `${value} ${
                                (value as number) > 1 ? "Visitors" : "Visitor"
                              }`,
                            color: theme.palette.primary.main,
                          },
                        ]}
                        dataset={graphData}
                        height={300}
                      />
                    )}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
            <Grid container spacing={2}></Grid>
          </Stack>
        </>
      ) : (
        <NoCard />
      )}
    </Box>
  );
};

export default Analytics;
