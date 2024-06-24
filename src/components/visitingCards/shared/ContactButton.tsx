import { Stack, SxProps } from "@mui/material";
import { getFontSize } from "../util";
import CardText from "../CardText";

const ContactButton = (props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Icon: any;
  label: string | number;
  iconSX?: SxProps;
  textColor?: string;
  dimensions: { width: number; height: number };
}) => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <props.Icon
        sx={{ fontSize: getFontSize(10, props.dimensions), ...props.iconSX }}
      />
      <CardText color={props.textColor} size={9} dimensions={props.dimensions}>
        {props.label?.toString()}
      </CardText>
    </Stack>
  );
};

export default ContactButton;
