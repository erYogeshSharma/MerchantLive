import { LocationCity, Mail, Phone } from "@mui/icons-material";
export type Dimensions = {
  height: number;
  width: number;
};
import { Stack } from "@mui/material";
import CardText from "../CardText";
import { getWidth } from "../util";
import { QRCodeSVG } from "qrcode.react";
import ContactButton from "../shared/ContactButton";
import { IBusinessCard } from "@/types/business";
import { id_app_url } from "@/constants/config";

import LeftTopAsset from "./FrontLeftShape.svg";
import RightBottomAsset from "./frontRightShape.svg";
import { useAppSelector } from "@/store/hooks";

const CardFourFront = ({
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
  const { user } = useAppSelector((state) => state.auth);

  return (
    <Stack
      sx={{
        background: "#fff",
        borderRadius: 2.5,
        position: "relative",
        zIndex: 10,
      }}
      height="100%"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
    >
      <img
        src={LeftTopAsset}
        style={{
          height: getWidth(120, dimensions),
          position: "absolute",
          zIndex: -10,
          right: 0,
          top: 0,
          borderTopRightRadius: 10,
        }}
      />
      <img
        src={RightBottomAsset}
        style={{
          height: getWidth(120, dimensions),
          position: "absolute",
          zIndex: -10,
          left: 0,
          bottom: 0,
          borderBottomLeftRadius: 10,
        }}
      />
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
            <CardText
              size={16}
              weight={600}
              color="#162A42"
              dimensions={dimensions}
            >
              {user.name}
            </CardText>
          </Stack>
          {/* <CardText color="#162A42" size={8} dimensions={dimensions}>
            {card.title}
          </CardText> */}
        </Stack>
        <Stack>
          {contactButtons.map((button, i) => (
            <ContactButton
              dimensions={dimensions}
              iconSX={{
                color: "#fff",
                background: "#F7C027",
                borderRadius: 5,
                p: 0.1,
                fontSize: 13,
              }}
              textColor="#162A42"
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
        justifyContent="center"
        width={getWidth(163, dimensions)}
        py={4}
        sx={{
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,

          //   backgroundImage: `url(${cardTwoFrontShape})`,
          backgroundSize: "cover", // Adjust as needed (e.g., 'contain', 'auto')
          backgroundRepeat: "no-repeat", // Adjust as needed
          height: "100%",
          width: getWidth(163, dimensions),
        }}
      >
        <Stack alignItems="center" textAlign="center">
          <img src={card.logo} style={{ height: getWidth(40, dimensions) }} />
          <CardText
            size={14}
            dimensions={dimensions}
            weight={600}
            color="#162A42"
          >
            {card.name}
          </CardText>
          <CardText size={10} dimensions={dimensions} color="#1C2F56">
            {card.title}
          </CardText>
        </Stack>
        <Stack mt={3}>
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

export default CardFourFront;
