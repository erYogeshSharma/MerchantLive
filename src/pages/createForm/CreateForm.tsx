import CreateCardForm from "../../components/createCardForm";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LinearProgress } from "@mui/material";
import { getBusinessDetails } from "../../store/business/business-api";
import { updateForm } from "../../store/business-form/business-form-slice";
import PageTitle from "../../components/shared/PageTitle";

const CreateForm = () => {
  const dispatch = useAppDispatch();
  const { businessDetails, loadingDetails } = useAppSelector((state) => state.business);

  useEffect(() => {
    dispatch(getBusinessDetails());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (businessDetails) {
      dispatch(updateForm(businessDetails));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessDetails]);
  return (
    <div>
      <PageTitle title={"Create Business"} />
      {loadingDetails && <LinearProgress />}
      <CreateCardForm />
    </div>
  );
};

export default CreateForm;
