import { Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";

import "./tansition.css";
import { IBusinessCard } from "@/types/business.ts";
import Cards from "./cards.tsx";
import { useAppDispatch } from "@/store/hooks.ts";
import { openPreviewCard } from "@/store/app/app-slice.ts";

const VisitingCard = ({
  id = 1,
  card,
}: {
  card: IBusinessCard;
  id: number;
}) => {
  const dispatch = useAppDispatch();
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

  function handleOpenCard() {
    dispatch(
      openPreviewCard({
        open: true,
        card: card,
        cardId: id,
      })
    );
  }
  return (
    <Stack
      sx={{
        aspectRatio: 1.75,
        borderRadius: 2.5,
        background: (theme) => theme.palette.background.default,
      }}
      ref={myRef}
      className="card-container"
    >
      <Stack
        onClick={handleOpenCard}
        height="100%"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
        className={`card ${isFlipped ? "is-flipped" : ""}`}
      >
        <div className="card-front">
          <Card.Front card={card} dimensions={dimensions} />
        </div>
        <div className="card-back">
          <Card.Back card={card} dimensions={dimensions} />
        </div>
      </Stack>
    </Stack>
  );
};

export default VisitingCard;
