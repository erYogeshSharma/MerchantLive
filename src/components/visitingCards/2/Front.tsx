import { LocationCity, Mail, Phone } from "@mui/icons-material";
export type Dimensions = {
  height: number;
  width: number;
};
import { Stack } from "@mui/material";
import CardText from "../CardText";
import { getWidth } from "../util";
import { QRCodeSVG } from "qrcode.react";
import cardTwoFrontShape from "./cardTwoFrontShape.svg";
import ContactButton from "../shared/ContactButton";
import { IBusinessCard } from "@/types/business";
import { id_app_url } from "@/constants/config";
import { useAppSelector } from "@/store/hooks";

const CardOneFront = ({
  dimensions,
  card,
}: {
  dimensions: Dimensions;
  card: IBusinessCard;
}) => {
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
  return (
    <Stack
      sx={{ background: "#fff", borderRadius: 2.5 }}
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
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <CardText size={16} weight={600} dimensions={dimensions}>
              {user.name}
            </CardText>
          </Stack>
          {/* <CardText size={8} dimensions={dimensions}>
            {card.title}
          </CardText> */}
        </Stack>
        <Stack>
          {contactButtons.map((button, i) => (
            <ContactButton
              dimensions={dimensions}
              iconSX={{
                color: "#fff",
                background: "#2BBE9B",
                borderRadius: 5,
                p: 0.1,
              }}
              Icon={button.icon}
              label={button?.label}
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
          backgroundImage: `url(${cardTwoFrontShape})`,
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
        <Stack alignItems="flex-end" pr={4} width="100%">
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
