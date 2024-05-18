import StaticPageWrapper from "../../components/wrappers/StaticPageWrapper";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import notFound from "../../assets/not-found.svg";
const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <StaticPageWrapper
      image={notFound}
      title="Page Not Found"
      description="Sorry, the page you're looking for doesn't exist. Check the URL or return to the homepage. Need help? Contact our support team."
    >
      <Button variant="contained" onClick={() => navigate("/")}>
        Go Home
      </Button>
    </StaticPageWrapper>
  );
};

export default ErrorPage;
