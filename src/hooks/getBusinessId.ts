import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { getAllBusiness } from "@/store/business/business-api";
import { setBusinessId } from "@/store/app/app-slice";

const useLoadBusiness = () => {
  const dispatch = useAppDispatch();
  const { business } = useAppSelector((state) => state.app);
  const { cards } = useAppSelector((state) => state.business);

  useEffect(() => {
    if (!business?._id) {
      dispatch(getAllBusiness());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (cards.length) {
      dispatch(setBusinessId(cards[0]));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cards]);

  return business;
  //   console.log(tokens.accessToken, tokens.refreshToken);
};

export default useLoadBusiness;
