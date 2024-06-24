import VisitingCard from "@/components/visitingCards";
import { IBusinessCard } from "@/types/business";
import { Grid, Stack } from "@mui/material";

const Cards = () => {
  return (
    <div>
      <Stack mt={2} p={2}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <VisitingCard id={1} card={{} as IBusinessCard} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <VisitingCard id={2} card={{} as IBusinessCard} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <VisitingCard id={3} card={{} as IBusinessCard} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <VisitingCard id={4} card={{} as IBusinessCard} />
          </Grid>
        </Grid>
      </Stack>
    </div>
  );
};

export default Cards;
