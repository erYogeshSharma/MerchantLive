import { Box, Button } from "@mui/material";
import placeholder from "../../assets/design.svg";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { getAllBusiness } from "../../store/business/business-api";
import PageTitle from "../../components/shared/PageTitle";
import StaticPageWrapper from "../../components/wrappers/StaticPageWrapper";

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
        <PageTitle title="Analytics"></PageTitle>
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
