import StaticPageWrapper from "../wrappers/StaticPageWrapper";
import { Button, useTheme } from "@mui/material";

import { useAppDispatch } from "../../store/hooks";
import { toggleOnboardModal } from "../../store/app/app-slice";
import { not_found_image } from "@/assets/SVGs/not_found";
import svgToDataUrl from "@/utils/stringToImage";

const NoCard = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  function handleCreateOpen() {
    dispatch(toggleOnboardModal(true));
  }

  return (
    <StaticPageWrapper
      image={svgToDataUrl(not_found_image(theme.palette.primary.main))}
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
