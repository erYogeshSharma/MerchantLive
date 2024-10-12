import { LocationCity, Mail, Phone } from "@mui/icons-material";
export type Dimensions = {
  height: number;
  width: number;
};
import { Stack } from "@mui/material";
import CardText from "../CardText";
import { getWidth } from "../util";
import { QRCodeSVG } from "qrcode.react";
import cardOneFrontShape from "./cardOneFrontShape.svg";
import { IBusinessCard } from "@/types/business";
import { id_app_url } from "@/constants/config";
import ContactButton from "../shared/ContactButton";
import { useAppSelector } from "@/store/hooks";

const CardOneFront = ({ dimensions, card }: { dimensions: Dimensions; card: IBusinessCard }) => {
  //CONTACT BUTTONS
  const contactButtons = [
    {
      icon: Phone,
      label: card.phone as number,
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
  const { user } = useAppSelector((state) => state.auth);

  //CONTACT COMPONENT
  // eslint-disable-next-line @typescript-eslint/no-explicit-any

  return (
    <Stack sx={{ background: "#fff", borderRadius: 2.5 }} height="100%" direction="row" alignItems="center" justifyContent="space-between">
      <Stack flexGrow={1} p={2} direction="column" alignItems="flex-start" justifyContent="space-between" height="100%">
        <Stack>
          <CardText size={14} dimensions={dimensions}>
            {user.name}
          </CardText>
          {/* <CardText size={8} dimensions={dimensions}>
            {user}
          </CardText> */}
        </Stack>
        <Stack>
          {contactButtons.map((button, i) => (
            <ContactButton
              dimensions={dimensions}
              iconSX={{
                color: "#000",
                background: "#fff",
                borderRadius: 5,
              }}
              textColor="#000"
              Icon={button.icon}
              label={button.label}
              key={i}
            />
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
          <img src={card.logo} style={{ height: getWidth(40, dimensions) }} />
          <CardText size={12} dimensions={dimensions} weight={600} color="#fff">
            {card.name}
          </CardText>
          <CardText size={5} dimensions={dimensions} color="#fff">
            {card.title}
          </CardText>
        </Stack>
        <Stack>
          <QRCodeSVG
            bgColor="#fff"
            includeMargin
            height={getWidth(42, dimensions)}
            width={getWidth(42, dimensions)}
            value={`${id_app_url}/${card.linkId}`}
          />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default CardOneFront;
