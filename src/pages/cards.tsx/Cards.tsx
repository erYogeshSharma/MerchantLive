import * as React from "react";
import { Button, Grid, LinearProgress, Stack } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllBusiness } from "../../store/business/business-api";
import { useNavigate } from "react-router-dom";
import { resetForm } from "../../store/business-form/business-form-slice";
import BusinessCard from "../../components/cards/BusinessCard";
import PageTitle from "../../components/shared/PageTitle";

export default function DataTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cards, loadingCards } = useAppSelector((state) => state.business);

  React.useEffect(() => {
    dispatch(getAllBusiness());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function navigateToCreate() {
    dispatch(resetForm());
    navigate("/cards/create");
  }
  return (
    <div
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <PageTitle title="Business Cards">
        <Button variant="contained" onClick={navigateToCreate}>
          Create
        </Button>
      </PageTitle>
      {loadingCards && <LinearProgress />}

      <Stack>
        <Grid container spacing={2}>
          {cards?.map((card) => (
            <BusinessCard business={card} />
          ))}
        </Grid>
      </Stack>
    </div>
  );
}
