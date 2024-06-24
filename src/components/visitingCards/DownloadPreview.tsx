import { closePreviewCard } from "@/store/app/app-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { CloseOutlined, Download } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  Divider,
  Fade,
  Grid,
  IconButton,
  Modal,
  Stack,
  Typography,
} from "@mui/material";
import Cards from "./cards";
import { useEffect, useRef, useState } from "react";
import * as htmlToImage from "html-to-image";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "400px", md: "70%" },
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,

  p: 2,
};

const DownloadPreview = () => {
  const dispatch = useAppDispatch();

  const { card, cardId, open } = useAppSelector(
    (state) => state.app.previewCard
  );
  function handleClose() {
    dispatch(closePreviewCard());
  }

  const { Front, Back } = Cards(cardId);
  const c = [Front, Back];

  const myRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = myRef.current;

    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      });
      resizeObserver.observe(element);

      // Cleanup function to disconnect the observer when the component unmounts
      return () => resizeObserver.disconnect();
    }
  }, [myRef]);

  function handleDownload() {
    htmlToImage
      .toJpeg(document.getElementById("card-preview") as HTMLElement, {
        quality: 2,
      })
      .then(function (dataUrl) {
        const link = document.createElement("a");
        link.download = card.name;
        link.href = dataUrl;
        link.click();
      });
  }

  // Dependency on myRef to ensure observer is attached
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <Typography variant="body1" fontWeight={600}>
              Download Business Card
            </Typography>
            <IconButton onClick={handleClose}>
              <CloseOutlined />
            </IconButton>
          </Stack>
          <Stack my={1}>
            <Divider />
          </Stack>

          <Grid
            container
            spacing={1}
            className="card-preview"
            id="card-preview"
          >
            {c.map((C) => (
              <Grid item xs={12} md={6}>
                <Stack
                  sx={{
                    aspectRatio: 1.75,
                    borderRadius: 2.5,
                    background: (theme) => theme.palette.background.default,
                  }}
                  ref={myRef}
                  className="card-container"
                >
                  <div className="card-front">
                    <C card={card} dimensions={dimensions} />
                  </div>
                </Stack>
              </Grid>
            ))}
          </Grid>

          <Stack alignItems="center" mt={2}>
            <Button
              onClick={handleDownload}
              variant="contained"
              startIcon={<Download />}
            >
              <Typography>Download Card</Typography>
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default DownloadPreview;
