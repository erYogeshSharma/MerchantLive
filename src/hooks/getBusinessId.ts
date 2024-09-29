import { useEffect } from "react";
import { getAllBusiness } from "@/store/business/business-api";
import { setBusinessId, toggleOnboardModal } from "@/store/app/app-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const useLoadBusiness = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.app);
  const { cards, loadingCards } = useAppSelector((state) => state.business);

  useEffect(() => {
    dispatch(getAllBusiness());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!loadingCards && cards.length) {
      if (cards.length === 1) {
        dispatch(setBusinessId(cards[0]));
      } else {
        const toggleShown = localStorage.getItem("onboard_shown");
        if (!toggleShown) {
          console.log("from the hook");
          dispatch(toggleOnboardModal(true));
        } else {
          dispatch(toggleOnboardModal(false));
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  return business;
  //   console.log(tokens.accessToken, tokens.refreshToken);
};

export default useLoadBusiness;
