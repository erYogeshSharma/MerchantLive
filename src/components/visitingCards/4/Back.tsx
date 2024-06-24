import React from "react";
import { Dimensions } from "./Front";
import { Stack } from "@mui/material";
import CardText from "../CardText";
import backShape from "./backShape.svg";
import { IBusinessCard } from "@/types/business";
import { getWidth } from "../util";
const CardFourBack = (
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
        background: "#fff",
        height: "100%",
        position: "relative",
        borderRadius: 2.5,
      }}
    >
      <Stack direction="row">
        <Stack textAlign="center" sx={{ zIndex: 20 }}>
          <Stack alignItems="center">
            <img
              src={props.card.logo}
              style={{ height: getWidth(40, props.dimensions) }}
            />
          </Stack>
          <CardText
            size={16}
            color="#162A42"
            weight={700}
            dimensions={props.dimensions}
          >
            {props.card.name}
          </CardText>
          <CardText size={10} color="#162A42" dimensions={props.dimensions}>
            {props.card.title}
          </CardText>
        </Stack>
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
          src={backShape}
          style={{ borderBottomLeftRadius: 10, borderBottomRightRadius: 10 }}
        />
      </Stack>
    </Stack>
  );
};

export default CardFourBack;
