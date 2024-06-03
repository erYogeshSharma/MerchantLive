import StaticPageWrapper from "../wrappers/StaticPageWrapper";
import { Button } from "@mui/material";
import placeholder from "../../assets/design.svg";
import { useAppDispatch } from "../../store/hooks";
import { toggleOnboardModal } from "../../store/app/app-slice";

const NoCard = () => {
  const dispatch = useAppDispatch();
  function handleCreateOpen() {
    dispatch(toggleOnboardModal(true));
  }
  return (
    <StaticPageWrapper
      image={placeholder}
      title="Welcome! Let's Get Started"
      description="It looks like you haven't created any pages yet. Click the button
        below to create your first page and start building your content.
        If you need any help, check out our tutorial or contact support."
    >
      <Button variant="contained" onClick={handleCreateOpen}>
        Create one
      </Button>
    </StaticPageWrapper>
  );
};

export default NoCard;
