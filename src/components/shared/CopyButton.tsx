import { CopyAll } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { toast } from "react-toastify";

const CopyButton = ({ text }: { text: string | number }) => {
  function handleClick() {
    navigator.clipboard.writeText(text.toString());
    toast.success("Copied to clipboard");
  }
  return (
    <Tooltip title="Copy">
      <IconButton size="small" onClick={handleClick}>
        <CopyAll fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default CopyButton;
