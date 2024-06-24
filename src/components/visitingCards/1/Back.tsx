import React from "react";
import { Dimensions } from "./Front";
import { Stack } from "@mui/material";
import BackImage from "./cardOneBack.svg";
import CardText from "../CardText";
import { IBusinessCard } from "@/types/business";
import { getWidth } from "../util";
const CardOneBack = (
  props: React.PropsWithChildren<{
    dimensions: Dimensions;
    card: IBusinessCard;
  }>
) => {
  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{
        background: "#141717",
        height: "100%",
        position: "relative",
        borderRadius: 2.5,
      }}
    >
      <Stack textAlign="center">
        <Stack alignItems="center">
          <img
            src={props.card.logo}
            style={{ height: getWidth(40, props.dimensions) }}
          />
        </Stack>
        <CardText
          size={16}
          color="#fff"
          weight={700}
          dimensions={props.dimensions}
        >
          {props.card.name}
        </CardText>
        <CardText size={10} color="#fff" dimensions={props.dimensions}>
          {props.card.title}
        </CardText>
      </Stack>
      <Stack
        sx={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          left: 0,
          right: 0,
        }}
      >
        <img
          src={BackImage}
          style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
        />
      </Stack>
    </Stack>
  );
};

export default CardOneBack;
