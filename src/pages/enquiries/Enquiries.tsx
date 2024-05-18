import {
  FormControl,
  Grid,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  getAllBusiness,
  getAllBusinessEnquiries,
} from "../../store/business/business-api";

import image from "../../assets/design.svg";
import EnquiryCard from "../../components/cards/EnquiryCard";
import PageTitle from "../../components/shared/PageTitle";
import StaticPageWrapper from "../../components/wrappers/StaticPageWrapper";

const Enquiries = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const businessId = params.bId;

  const handleChange = (event: SelectChangeEvent) => {
    navigate(`/enquiries/${event.target.value}`);
  };

  const { enquires, loadingEnquiries, cards } = useAppSelector(
    (state) => state.business
  );

  useEffect(() => {
    if (!businessId) {
      if (cards.length) {
        navigate(`/enquiries/${cards[0]._id}`);
      } else {
        dispatch(getAllBusiness());
      }
    } else {
      if (!cards.length) {
        dispatch(getAllBusiness());
      }
      dispatch(getAllBusinessEnquiries(businessId));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessId, cards]);

  return (
    <Grid>
      <PageTitle title="Enquiries">
        {cards.length > 0 && businessId && (
          <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel id="demo-select-small-label">Business</InputLabel>
            <Select value={businessId} label="Business" onChange={handleChange}>
              {cards.map((c, i) => (
                <MenuItem key={i} value={c._id}>
                  {c.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </PageTitle>
      {loadingEnquiries && <LinearProgress />}
      <Stack>
        {enquires.length > 0 ? (
          <Grid container alignItems="flex-start" spacing={2}>
            {enquires.map((enquiry) => (
              <Grid key={enquiry._id} item xs={12} sm={12} md={6} lg={4}>
                <EnquiryCard enquiry={enquiry} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <StaticPageWrapper
            image={image}
            description="There are no new enquiries at the moment. Check back later or promote your business to attract potential clients."
            title="No Enquiries Yet"
          ></StaticPageWrapper>
        )}
      </Stack>
    </Grid>
  );
};

export default Enquiries;
