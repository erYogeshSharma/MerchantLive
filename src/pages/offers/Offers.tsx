import { delete_offer } from "@/api";
import CreateOfferModal from "@/components/popups/CreateOfferModal";
import DeleteConfirmModal from "@/components/shared/DeleteConfrmButton";
import PageTitle from "@/components/shared/PageTitle";
import NoCard from "@/components/templates/NoCard";
import useLoadBusiness from "@/hooks/getBusinessId";
import {
  getAllBusinessOffers,
  updateBusinessOffer,
} from "@/store/business/business-api";
import { deleteOffer, openOfferModal } from "@/store/business/business-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { Offer } from "@/types/business";
import { Edit } from "@mui/icons-material";
import {
  Button,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Offers = () => {
  const dispatch = useAppDispatch();

  const business = useLoadBusiness();
  const { loadingOffers, offers } = useAppSelector((state) => state.business);

  function handleCreateOpen() {
    dispatch(openOfferModal({}));
  }

  useEffect(() => {
    if (business._id) {
      dispatch(getAllBusinessOffers());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleEdit(offer: Offer) {
    dispatch(openOfferModal({ offer }));
  }

  const [deleting, setDeleting] = useState("");
  async function handleDelete(offerId: string) {
    try {
      setDeleting(offerId);
      await delete_offer(offerId);
      dispatch(deleteOffer(offerId));
      toast.success("Offer deleted successfully");
      setDeleting("");
    } catch (error) {
      toast.error("Error deleting offer");
      setDeleting("");
    }
    // await dispatch(deleteBusinessOffer(offerId));
  }

  async function toggleBusinessStatus(offer: Offer) {
    dispatch(
      updateBusinessOffer({ _id: offer._id, isActive: !offer.isActive })
    );
  }

  return (
    <div>
      <CreateOfferModal />

      <PageTitle
        title="Offers"
        desc="Offers lets you show your customers a offer as soon they visit your business card."
      >
        {business._id && (
          <Button variant="contained" onClick={handleCreateOpen}>
            Create a offer
          </Button>
        )}
      </PageTitle>

      {loadingOffers && !offers.length ? (
        <LinearProgress />
      ) : (
        <>
          {business._id ? (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }}>
                <TableHead>
                  <TableRow>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Starts On</TableCell>
                    <TableCell>Ends On</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {offers.map((offer) => (
                    <TableRow key={offer._id}>
                      <TableCell>{offer.title}</TableCell>
                      <TableCell>{offer.description}</TableCell>
                      <TableCell>
                        {moment(offer.startsOn).format("DD MMM YY")}
                      </TableCell>
                      <TableCell>
                        {moment(offer.endsOn).format("DD MMM YY")}
                      </TableCell>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Tooltip
                            title={
                              offer.isActive
                                ? "Click to disable this offer."
                                : "Click to enable this offer."
                            }
                          >
                            <Switch
                              checked={offer.isActive}
                              onChange={() => toggleBusinessStatus(offer)}
                            />
                          </Tooltip>

                          <Tooltip title="Edit Offer">
                            <IconButton onClick={() => handleEdit(offer)}>
                              <Edit />
                            </IconButton>
                          </Tooltip>
                          <DeleteConfirmModal
                            loading={deleting === offer._id}
                            handleDelete={() =>
                              handleDelete(offer?._id as string)
                            }
                          />
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : (
            <NoCard />
          )}
        </>
      )}
    </div>
  );
};

export default Offers;
