import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { OpenInNew } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

import { resetForm } from "../../store/business-form/business-form-slice";
import { useAppDispatch } from "../../store/hooks";
import ButtonMenu from "../shared/ButtonMenu";
import { IBusinessCard } from "@/types/business";

const BusinessCard = ({ business }: { business: IBusinessCard }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  function handleEdit() {
    dispatch(resetForm());
    navigate(`/card/edit`);
  }

  function handleMenu(option: string) {
    switch (option) {
      case "edit":
        handleEdit();
        break;
      case "settings":
        break;

      default:
        break;
    }
  }

  return (
    <Grid item xs={12} md={6} lg={4}>
      <Paper sx={{ position: "relative" }}>
        <Stack sx={{ position: "absolute", right: 5, top: 5 }}>
          <ButtonMenu
            items={[
              { title: "Edit", value: "edit" },
              { title: "Settings", value: "settings" },
            ]}
            onOptionClick={handleMenu}
          />
        </Stack>
        <Stack>
          <Stack p={2} alignItems="center">
            <Avatar src={business.logo} sx={{ height: 80, width: 80 }} />
            <Stack direction="row" alignItems="center">
              <Typography variant="body1" fontWeight={600}>
                {business.name}
              </Typography>
              <Tooltip title="Open in new tab">
                <IconButton
                  size="small"
                  target="_blank"
                  href={`https://id.zapminds.com/${business.linkId}`}
                >
                  <OpenInNew fontSize="small" />
                </IconButton>
              </Tooltip>
            </Stack>
            <Typography variant="caption" color="text.secondary">
              {business.title}
            </Typography>
          </Stack>
        </Stack>
        <Divider />
        <Stack py={1} direction="row" justifyContent="space-between">
          <Stack width="50%" alignItems="center">
            <Typography fontWeight={600} variant="h5">
              50
            </Typography>
            <Typography color="text.secondary" variant="subtitle2">
              Visits
            </Typography>
          </Stack>
          <Stack width="50%" alignItems="center">
            <Typography fontWeight={600} variant="h5">
              50
            </Typography>
            <Typography color="text.secondary" variant="subtitle2">
              Visits
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </Grid>
  );
};

export default BusinessCard;
