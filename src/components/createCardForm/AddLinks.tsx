import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getLinkOptions } from "../../store/business-form/business-form-api";
import {
  Avatar,
  Divider,
  Grid,
  IconButton,
  Link,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import AddLinkOptionModal from "./AddLinkOption";
import { updateForm } from "../../store/business-form/business-form-slice";
import { Delete } from "@mui/icons-material";

const AddLinks = () => {
  const dispatch = useAppDispatch();

  const { linkOptions, linksLoading, form } = useAppSelector(
    (state) => state.businessForm
  );

  const [openAddLink, setOpenAddLink] = React.useState(false);

  function handleLinkClick(id: string) {
    if (form.links.map((l) => l.type).includes(id)) {
      dispatch(
        updateForm({ links: form.links.filter((link) => link.type !== id) })
      );
    } else {
      dispatch(
        updateForm({
          links: [
            ...form.links,
            {
              type: id,
              link: "",
            },
          ],
        })
      );
    }
  }
  useEffect(() => {
    dispatch(getLinkOptions());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid>
      <AddLinkOptionModal open={openAddLink} setOpen={setOpenAddLink} />
      <Stack spacing={2}>
        <Stack>
          {linksLoading ? (
            <Stack direction="row" alignItems="center" spacing={1}>
              <Skeleton variant="circular" sx={{ height: 50, width: 50 }} />
              <Skeleton variant="circular" sx={{ height: 50, width: 50 }} />
              <Skeleton variant="circular" sx={{ height: 50, width: 50 }} />
            </Stack>
          ) : (
            <Stack
              direction="row"
              alignItems="center"
              useFlexGap
              flexWrap="wrap"
              spacing={2}
            >
              {linkOptions.map((link) => (
                <Stack
                  onClick={() => handleLinkClick(link._id)}
                  p={1}
                  sx={{
                    borderRadius: 1,
                    backgroundColor: (theme) =>
                      form.links.map((l) => l.type).includes(link._id)
                        ? theme.palette.primary[200]
                        : theme.palette.action.disabled,
                  }}
                  key={link._id}
                  direction="row"
                  alignItems="center"
                >
                  <Tooltip arrow title={link.title}>
                    <Avatar
                      src={link.icon}
                      sx={{
                        width: 50,
                        height: 50,
                      }}
                    />
                  </Tooltip>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
        <Typography variant="body2">
          Didn't find the link option you're looking for ?&nbsp;
          <Link component="button" onClick={() => setOpenAddLink(true)}>
            Add a option
          </Link>
        </Typography>
        <Divider />
        <Stack spacing={2}>
          <Typography>Links</Typography>
          {form.links.map((link) => (
            <Stack
              spacing={2}
              key={link.type}
              direction="row"
              alignItems="center"
            >
              <Avatar
                src={linkOptions.find((l) => l._id === link.type)?.icon}
              />
              <TextField
                fullWidth
                label={`${
                  linkOptions.find((l) => l._id === link.type)?.title
                }  Link`}
                variant="outlined"
                size="small"
                value={link.link}
                onChange={(e) =>
                  dispatch(
                    updateForm({
                      links: form.links.map((l) =>
                        l.type === link.type
                          ? { ...l, link: e.target.value }
                          : l
                      ),
                    })
                  )
                }
              />
              <IconButton
                size="small"
                color="error"
                onClick={() => handleLinkClick(link.type)}
              >
                <Delete />
              </IconButton>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Grid>
  );
};

export default AddLinks;
