import { delete_domain, get_domain_status } from "@/api";
import ConfirmAction from "@/components/popups/ConfirmAction";
import { getCNameFromURL } from "@/components/visitingCards/util";
import { LoadingButton } from "@mui/lab";
import {
  Button,
  Divider,
  Paper,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const DomainStatusCard = ({
  toggleDomainAlreadyAdded,
}: {
  toggleDomainAlreadyAdded: (exists: boolean) => void;
}) => {
  useEffect(() => {
    getDomainStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function handleEditDomain() {}

  /* -------------------------------------------------------------------------- */
  /*                                DELETE DOMAIN                               */
  /* -------------------------------------------------------------------------- */
  const [openDelete, setOpenDelete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  async function handleRemoveDomain() {
    try {
      setIsDeleting(true);
      await delete_domain();
      toast.success("Domain Removed");
      setIsDeleting(false);
      setOpenDelete(false);
      getDomainStatus();
    } catch (error) {
      toast.error("Failed to remove domain");
    }
  }

  /* -------------------------------------------------------------------------- */
  /*                                DOMAIN STATUS                               */
  /* -------------------------------------------------------------------------- */

  const [domainStatus, setDomainStatus] = useState<{
    fetching: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any;
  }>({ fetching: false, data: null });
  const isDomainVerified = domainStatus.data?.status === "Valid Configuration";
  async function getDomainStatus() {
    try {
      setDomainStatus({ fetching: true, data: null });
      const { data } = await get_domain_status();

      setDomainStatus({ fetching: false, data });
      toggleDomainAlreadyAdded(true);
    } catch (error) {
      setDomainStatus({ fetching: false, data: null });
      toggleDomainAlreadyAdded(false);
    }
  }

  if (domainStatus.fetching)
    return (
      <Skeleton variant="rectangular" sx={{ height: 200, borderRadius: 4 }} />
    );

  if (!domainStatus.fetching && !domainStatus.data) {
    return <Typography>No Custom Domain Added!</Typography>;
  }
  return (
    <Paper variant={"outlined"}>
      <Stack>
        <ConfirmAction
          loading={isDeleting}
          open={openDelete}
          handleClose={() => setOpenDelete(false)}
          onConfirm={handleRemoveDomain}
          title="Remove Domain"
          message="Are you sure you want to remove this domain"
        />

        {/* CHARD HEADER */}
        <Stack
          direction="row"
          alignItems="flex-start"
          justifyContent="space-between
          "
          p={2}
        >
          <Stack>
            <Typography variant="h5">
              {" "}
              {domainStatus.data?.domainJson?.name}
            </Typography>
            <Typography
              variant="caption"
              color={
                domainStatus.data?.status === "Invalid Configuration"
                  ? "error"
                  : "success"
              }
            >
              {domainStatus.data?.status === "Invalid Configuration"
                ? "❌"
                : "✅"}
              {domainStatus.data?.status}
            </Typography>
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            <LoadingButton
              size="small"
              disabled={domainStatus.fetching}
              variant="outlined"
              loading={domainStatus.fetching}
              onClick={getDomainStatus}
            >
              Refresh
            </LoadingButton>
            <Button
              size="small"
              variant="outlined"
              disabled={domainStatus.fetching}
              onClick={handleEditDomain}
            >
              Edit{" "}
            </Button>
            <LoadingButton
              size="small"
              variant="outlined"
              onClick={() => setOpenDelete(true)}
              disabled={domainStatus.fetching}
              loading={isDeleting}
            >
              Remove
            </LoadingButton>
          </Stack>
        </Stack>
        <Divider />
        {!isDomainVerified && (
          <Stack p={2} spacing={1}>
            <Typography variant="caption">
              Set the following record on you DNS provider to continue.
            </Typography>
            <Paper variant="outlined">
              <Stack p={1} direction="row" alignItems="center" spacing={2}>
                <Stack>
                  <Typography color="text.secondary" variant="caption">
                    Type
                  </Typography>
                  <Typography variant="caption">
                    {getCNameFromURL(domainStatus.data?.domainJson?.name) ===
                    "@"
                      ? "A"
                      : "CNAME"}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography color="text.secondary" variant="caption">
                    Name
                  </Typography>
                  <Typography variant="caption">
                    {getCNameFromURL(domainStatus.data?.domainJson?.name)}
                  </Typography>
                </Stack>
                <Stack>
                  <Typography color="text.secondary" variant="caption">
                    Value
                  </Typography>
                  <Typography variant="caption">
                    {getCNameFromURL(domainStatus.data?.domainJson?.name) ===
                    "@"
                      ? "76.76.21.21"
                      : "id.bharatbiz.com"}
                  </Typography>
                </Stack>
              </Stack>
            </Paper>
            <Paper variant="outlined">
              <Stack p={0.5}>
                <Typography variant="caption">
                  Depending on your provider, it may take up to 24 hours for the
                  DNS records to apply.
                </Typography>
              </Stack>
            </Paper>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default DomainStatusCard;
