import { LocationCity, Mail, Phone } from "@mui/icons-material";
export type Dimensions = {
  height: number;
  width: number;
};
import { Stack } from "@mui/material";
import CardText from "../CardText";
import { getFontSize, getWidth } from "../util";
import { QRCodeSVG } from "qrcode.react";
import cardOneFrontShape from "./cardOneFrontShape.svg";

export type CardData = {
  name: string;
  title: string;
  phone: string;
  email: string;
  address: string;
  logo: string;
  background: string;
  tagLine: string;
  link: string;
};

const CardOneFront = ({
  dimensions,
  card,
}: {
  dimensions: Dimensions;
  card: CardData;
}) => {
  //CONTACT BUTTONS
  const contactButtons = [
    {
      icon: Phone,
      label: card.phone,
    },
    {
      icon: Mail,
      label: card.email,
    },
    {
      icon: LocationCity,
      label: card.address,
    },
  ];

  //CONTACT COMPONENT
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Contact = (props: { Icon: any; label: string }) => {
    return (
      <Stack direction="row" alignItems="baseline" spacing={1}>
        <props.Icon sx={{ fontSize: getFontSize(10, dimensions) }} />
        <CardText size={10} dimensions={dimensions}>
          {props.label}
        </CardText>
      </Stack>
    );
  };
  return (
    <Stack
      sx={{ background: "#fff" }}
      height="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack
        flexGrow={1}
        p={2}
        direction="column"
        alignItems="flex-start"
        justifyContent="space-between"
        height="100%"
      >
        <Stack>
          <CardText size={14} dimensions={dimensions}>
            {card.name}
          </CardText>
          <CardText size={8} dimensions={dimensions}>
            {card.title}
          </CardText>
        </Stack>
        <Stack>
          {contactButtons.map((button, i) => (
            <Contact Icon={button.icon} label={button.label} key={i} />
          ))}
        </Stack>
      </Stack>
      <Stack
        direction="column"
        alignItems="center"
        justifyContent="space-between"
        width={getWidth(163, dimensions)}
        py={4}
        sx={{
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,

          backgroundImage: `url(${cardOneFrontShape})`,
          backgroundSize: "cover", // Adjust as needed (e.g., 'contain', 'auto')
          backgroundRepeat: "no-repeat", // Adjust as needed
          height: "100%",
          width: getWidth(163, dimensions),
        }}
      >
        <Stack alignItems="center">
          <CardText size={12} dimensions={dimensions} weight={600} color="#fff">
            {card.name}
          </CardText>
          <CardText size={5} dimensions={dimensions} color="#fff">
            {card.tagLine}
          </CardText>
        </Stack>
        <Stack>
          <QRCodeSVG
            bgColor="#fff"
            includeMargin
            height={getWidth(42, dimensions)}
            width={getWidth(42, dimensions)}
            value={card.link}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CardOneFront;
