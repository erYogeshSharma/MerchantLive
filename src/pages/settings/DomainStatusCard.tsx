import { delete_domain, get_domain_status } from "@/api";
import ConfirmAction from "@/components/popups/ConfirmAction";
import { CheckCircle, Error, Warning } from "@mui/icons-material";
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
    if (!domainStatus.data) getDomainStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const [recordType, setRecordType] = useState<"A" | "CNAME">("A");
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

  const getSubdomain = (name: string, apexName: string) => {
    if (name === apexName) return null;
    return name.slice(0, name.length - apexName.length - 1);
  };

  const subdomain = getSubdomain(
    domainStatus.data?.domainJson?.name,
    domainStatus.data?.domainJson?.apexName
  );
  console.log({ subdomain: subdomain });

  const txtVerification =
    (status === "Pending Verification" &&
      domainStatus.data.domainJson.verification.find(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (x: any) => x.type === "TXT"
      )) ||
    null;
  return (
    <Paper variant={"outlined"}>
      <ConfirmAction
        loading={isDeleting}
        open={openDelete}
        handleClose={() => setOpenDelete(false)}
        onConfirm={handleRemoveDomain}
        title="Remove Domain"
        message="Are you sure you want to remove this domain"
      />

      <Stack p={2}>
        {/* CARD HEADER START */}
        <Stack
          mb={2}
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Stack direction="row" alignItems="center">
            {domainStatus.data.status === "Pending Verification" ? (
              <Warning color="warning" />
            ) : domainStatus.data.status === "Valid Configuration" ? (
              <CheckCircle color="success" />
            ) : (
              <Error color="error" />
            )}
            <Typography variant="h6">{domainStatus.data.status}</Typography>
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

        {/* CARD HEADER END */}
        {/* CONFIG TYPE */}
        {domainStatus.data.status === "Valid Configuration" ? (
          <Stack>
            <Typography>
              Your domain <b>{domainStatus.data.domainJson.name}</b> has been
              successfully configured. You can now access your website using the
              domain name.
            </Typography>
          </Stack>
        ) : (
          <Stack>
            {txtVerification ? (
              <>
                <Typography className="text-sm dark:text-white">
                  Please set the following TXT record on{" "}
                  <b>{domainStatus.data.domainJson.apexName}</b> to prove
                  ownership of <b>{domainStatus.data.domainJson.name}</b>:
                </Typography>
                <div className="my-5 flex items-start justify-start space-x-10 rounded-md bg-stone-50 p-2 dark:bg-stone-800 dark:text-white">
                  <div>
                    <Typography className="text-sm font-bold">Type</Typography>
                    <Typography className="mt-2 font-mono text-sm">
                      {txtVerification.type}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm font-bold">Name</Typography>
                    <Typography className="mt-2 font-mono text-sm">
                      {txtVerification.domain.slice(
                        0,
                        txtVerification.domain.length -
                          domainStatus.data.domainJson.apexName.length -
                          1
                      )}
                    </Typography>
                  </div>
                  <div>
                    <Typography className="text-sm font-bold">Value</Typography>
                    <Typography className="mt-2 font-mono text-sm">
                      <span className="text-ellipsis">
                        {txtVerification.value}
                      </span>
                    </Typography>
                  </div>
                </div>
                <Typography className="text-sm dark:text-stone-400">
                  Warning: if you are using this domain for another site,
                  setting this TXT record will transfer domain ownership away
                  from that site and break it. Please exercise caution when
                  setting this record.
                </Typography>
              </>
            ) : status === "Unknown Error" ? (
              <Typography className="mb-5 text-sm dark:text-white">
                {domainStatus.data.domainJson.error.message}
              </Typography>
            ) : (
              <>
                <Stack direction="row" spacing={2}>
                  <Button
                    onClick={() => setRecordType("A")}
                    variant={recordType === "A" ? "contained" : "outlined"}
                  >
                    A Record{!subdomain && " (recommended)"}
                  </Button>
                  <Button
                    onClick={() => setRecordType("CNAME")}
                    variant={recordType === "CNAME" ? "contained" : "outlined"}
                  >
                    CNAME Record{subdomain && " (recommended)"}
                  </Button>
                </Stack>
                <div>
                  <Typography mt={1}>
                    To configure your{" "}
                    {recordType === "A" ? "apex domain" : "subdomain"} (
                    <b>
                      {recordType === "A"
                        ? domainStatus.data.domainJson.apexName
                        : domainStatus.data.domainJson.name}
                    </b>
                    ), set the following {recordType} record on your DNS
                    provider to continue:
                  </Typography>
                  <Paper>
                    <Stack
                      p={1}
                      my={2}
                      direction="row"
                      alignItems="center"
                      divider={<Divider orientation="vertical" flexItem />}
                      spacing={2}
                    >
                      <div>
                        <Typography className="text-sm font-bold">
                          Type
                        </Typography>
                        <Typography className="mt-2 font-mono text-sm">
                          {recordType}
                        </Typography>
                      </div>
                      <div>
                        <Typography className="text-sm font-bold">
                          Name
                        </Typography>
                        <Typography className="mt-2 font-mono text-sm">
                          {recordType === "A" ? "@" : subdomain ?? "www"}
                        </Typography>
                      </div>
                      <div>
                        <Typography className="text-sm font-bold">
                          Value
                        </Typography>
                        <Typography className="mt-2 font-mono text-sm">
                          {recordType === "A"
                            ? `76.76.21.21`
                            : `cname.id.bharatbiz.com`}
                        </Typography>
                      </div>
                      <div>
                        <Typography className="text-sm font-bold">
                          TTL
                        </Typography>
                        <Typography className="mt-2 font-mono text-sm">
                          86400
                        </Typography>
                      </div>
                    </Stack>
                  </Paper>

                  <Typography variant="body1">
                    Note: for TTL, if <b>86400</b> is not available, set the
                    highest value possible. Also, domain propagation can take up
                    to an hour.
                  </Typography>
                </div>
              </>
            )}
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default DomainStatusCard;
