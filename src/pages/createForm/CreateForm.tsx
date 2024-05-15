import { useParams } from "react-router-dom";
import CreateCardForm from "../../components/createCardForm";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { LinearProgress } from "@mui/material";
import { getBusinessById } from "../../store/business/business-api";
import { updateForm } from "../../store/business-form/business-form-slice";

const CreateForm = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { businessDetails, loadingDetails } = useAppSelector((state) => state.business);

  const id = params.id;

  useEffect(() => {
    if (id) {
      dispatch(getBusinessById(id));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (params.id === businessDetails._id) {
      dispatch(updateForm(businessDetails));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [businessDetails]);
  return (
    <div>
      {loadingDetails && <LinearProgress />}
      <CreateCardForm />
    </div>
  );
};

export default CreateForm;
