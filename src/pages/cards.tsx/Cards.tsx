import * as React from "react";
import { Grid, LinearProgress, Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllBusiness } from "../../store/business/business-api";
import BusinessCard from "../../components/cards/BusinessCard";
import PageTitle from "../../components/shared/PageTitle";
import NoCard from "../../components/templates/NoCard";
import VisitingCard from "@/components/visitingCards";
import DownloadPreview from "@/components/visitingCards/DownloadPreview";
// import VisitingCard from "@/components/visitingCards";

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { cards, loadingCards } = useAppSelector((state) => state.business);
  const preview = useAppSelector((state) => state.app.previewCard);
  React.useEffect(() => {
    dispatch(getAllBusiness());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <PageTitle title="Business Card"></PageTitle>
      {loadingCards && <LinearProgress />}

      <Stack>
        {cards.length ? (
          <Grid container spacing={2}>
            {cards?.map((card) => (
              <BusinessCard business={card} key={card._id} />
            ))}
          </Grid>
        ) : (
          <NoCard />
        )}
      </Stack>
      <Stack mt={2}>
        <Stack mb={1}>
          <Typography fontWeight={600} variant="h5">
            Visiting Cards
          </Typography>
          <Typography variant="body2">
            Click on a business card to download
          </Typography>
        </Stack>
        {cards.length && (
          <Stack>
            {preview?.open && <DownloadPreview />}
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <VisitingCard id={1} card={cards[0]} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <VisitingCard id={2} card={cards[0]} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <VisitingCard id={3} card={cards[0]} />
              </Grid>
              <Grid item xs={12} sm={6} md={4}>
                <VisitingCard id={4} card={cards[0]} />
              </Grid>
            </Grid>
          </Stack>
        )}
      </Stack>
    </div>
  );
}
