import React from "react";
import { Dimensions } from "./Front";
import { Stack } from "@mui/material";
import CardText from "../CardText";

import { IBusinessCard } from "@/types/business";
import { getWidth } from "../util";
const CardThreeBack = (
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
        background: "#1C2F56",
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
          color="#DEC364"
          weight={700}
          dimensions={props.dimensions}
        >
          {props.card.name}
        </CardText>
        <CardText size={10} color="#DEC364" dimensions={props.dimensions}>
          {props.card.title}
        </CardText>
      </Stack>
    </Stack>
  );
};

export default CardThreeBack;
