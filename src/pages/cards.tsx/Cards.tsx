import * as React from "react";
import { Grid, LinearProgress, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllBusiness } from "../../store/business/business-api";
import BusinessCard from "../../components/cards/BusinessCard";
import PageTitle from "../../components/shared/PageTitle";
import NoCard from "../../components/templates/NoCard";

export default function DataTable() {
  const dispatch = useAppDispatch();
  const { cards, loadingCards } = useAppSelector((state) => state.business);

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
      {!cards && loadingCards && <LinearProgress />}

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
    </div>
  );
}
