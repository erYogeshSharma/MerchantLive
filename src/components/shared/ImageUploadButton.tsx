import React, { useEffect, useState } from "react";
import {
  Avatar,
  CSSObject,
  CircularProgress,
  Stack,
  Tooltip,
  Typography,
  styled,
} from "@mui/material";
import useFileUpload from "../../hooks/useFileUpload";
import { AddPhotoAlternate, ElevatorSharp, Image } from "@mui/icons-material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ImageUploadButton = ({
  image,
  name,
  onChange,
  prefix = "icon",
  label = "Select Image",
  styles = { height: 100, width: 100 },
}: {
  image: string;
  name: string;
  prefix?: string;
  label?: string;
  styles?: CSSObject;
  onChange: (file: string) => void;
}) => {
  const { uploadFile, uploadProgress, uploading } = useFileUpload(
    onChange,
    prefix
  );
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    if (file) {
      uploadFile(file);
    } else {
      setFile(null as unknown as File);
    }
    // Do NOT put uploadFile function as dependency here
    // eslint-disable-next-line
  }, [file]);

  function handleFileInput(event: React.ChangeEvent<HTMLInputElement>) {
    setFile(event.target.files[0]);
    event.target.files = null;
  }

  const [showEditIcon, setShowEditIcon] = useState(!image);

  useEffect(() => {
    if (!image) {
      setShowEditIcon(true);
    } else {
      setShowEditIcon(false);
    }
  }, [image]);
  return (
    <Stack
      alignItems="center"
      onMouseEnter={() => setShowEditIcon(true)}
      onMouseLeave={() => setShowEditIcon(false)}
      sx={{ position: "relative", ...styles }}
      component="label"
    >
      {showEditIcon && (
        <Tooltip title={label} arrow>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{
              position: "absolute",
              top: "50%",
              zIndex: 1,
              left: "50%",
              transform: "translate(-50%, -50%)",
              backgroundColor: (theme) => theme.palette.background.default,
              opacity: 0.8,
              borderRadius:
                styles.height === styles.width
                  ? "50%"
                  : styles?.borderRadius || 1,
              transition: "0.3s",
              textAlign: "center",
              ...styles,
            }}
          >
            <AddPhotoAlternate
              sx={{
                color: (theme) => theme.palette.action.active,
                fontSize:
                  (styles?.height as number) <= 100
                    ? 40
                    : (styles?.height as number) - 50,
              }}
            />

            {(styles.height as number) > 90 && (
              <Typography variant="caption"> {label} </Typography>
            )}
          </Stack>
        </Tooltip>
      )}
      <VisuallyHiddenInput
        name={name}
        type="file"
        accept="image/jpeg, image/png"
        onChange={handleFileInput}
      />
      <Stack
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
        }}
      >
        {uploading && (
          <CircularProgress
            variant="determinate"
            value={uploadProgress}
            size={styles.height as number}
          />
        )}
      </Stack>
      {image && <Avatar src={image} sx={styles} />}
    </Stack>
  );
};

export default ImageUploadButton;
