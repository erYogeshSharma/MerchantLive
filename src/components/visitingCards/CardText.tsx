import { Typography } from "@mui/material";
import { getFontSize } from "./util";

const CardText = ({
  size = 8,
  children = "Please provide the text",
  dimensions,
  weight = 500,
  color = "#000",
}: {
  size: number;
  weight?: number;
  children: string;
  color?: string;
  dimensions: { width: number; height: number };
}) => {
  return (
    <div>
      <Typography
        style={{
          fontSize: getFontSize(size, dimensions),
          color: color,
          fontWeight: weight,
        }}
      >
        {children}
      </Typography>
    </div>
  );
};

export default CardText;
