import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import "./tansition.css";
import { IBusinessCard } from "@/types/business.ts";
import Cards from "./cards.tsx";
const cardData = {
  name: "John Doe",
  title: "Designer",
  phone: "+91 9876543210",
  email: "er.yogesh505#gmail.com",
  address: "22 St. Street, Bangalore, 560068",
  logo: "https://www.flaticon.com/svg/vstatic/svg/3135/3135715.svg?token=exp=1635763664~hmac=",
  background: "#fff",
  tagLine: "Designing the future",
  link: "https://id.zapminds.com/123456",
};
const VisitingCard = ({ id = 1 }: { card?: IBusinessCard; id: number }) => {
  const myRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const element = myRef.current;

    if (element) {
      const resizeObserver = new ResizeObserver((entries) => {
        const { width, height } = entries[0].contentRect;
        setDimensions({ width, height });
      });
      resizeObserver.observe(element);

      // Cleanup function to disconnect the observer when the component unmounts
      return () => resizeObserver.disconnect();
    }
  }, [myRef]); // Dependency on myRef to ensure observer is attached/detached

  const [isFlipped, setIsFlipped] = useState(false);

  const Card = Cards(id);

  return (
    <Stack
      sx={{ aspectRatio: 1.75, borderRadius: 2.5 }}
      ref={myRef}
      className="card-container"
    >
      <Stack
        height="100%"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        className={`card ${isFlipped ? "is-flipped" : ""}`}
      >
        <div className="card-front">
          <Card.Front card={cardData} dimensions={dimensions} />
        </div>
        <div className="card-back">
          <Card.Back card={cardData} dimensions={dimensions} />
        </div>
      </Stack>
    </Stack>
  );
};

export default VisitingCard;
