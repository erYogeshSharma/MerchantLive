import { add_domain } from "@/api";
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import DomainStatusCard from "./DomainStatusCard";
import { validDomainRegex } from "@/components/visitingCards/util";

const Domain = () => {
  /* -------------------------------------------------------------------------- */
  /*                                 ADD DOMAIN                                 */
  /* -------------------------------------------------------------------------- */
  const [domain, setDomain] = useState<string>("");
  const [domainAddStatus, setDomainAddStatus] = useState<{
    saving: boolean;
    data: { status: string } | null;
  }>({ saving: false, data: null });

  async function addDomain(event: React.FormEvent<HTMLFormElement>) {
    try {
      event.preventDefault();
      setDomainAddStatus({ saving: true, data: null });
      const { data } = await add_domain(domain as string);
      setDomainAddStatus({ saving: false, data });
      toast.success("Domain added successfully");
    } catch (error) {
      setDomainAddStatus({ saving: false, data: null });
      toast.error("Failed to add domain");
    }
  }
  /* -------------------------------------------------------------------------- */
  /*                      SHOW FORM BASED ON DOMAIN STATUS                      */
  /* -------------------------------------------------------------------------- */
  const [domainAlreadyAdded, setDomainAlreadyAdded] = useState(false);
  function toggleDomainAlreadyAdded(isAdded: boolean) {
    setDomainAlreadyAdded(isAdded);
  }
  return (
    <Stack spacing={2}>
      {!domainAlreadyAdded && (
        <Stack spacing={2}>
          <Typography>Add custom domain to you business page</Typography>
          <form onSubmit={addDomain}>
            <Stack spacing={2} direction="row" alignItems="flex-start">
              <Stack flexGrow={1}>
                <TextField
                  disabled={domainAddStatus.saving}
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  fullWidth
                  placeholder="www.mywebsite.com"
                  size="small"
                />
                {domain?.length > 0 && (
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {validDomainRegex.test(domain as string) ? (
                      <Typography variant="caption" color="success">
                        ✅ Valid domain
                      </Typography>
                    ) : (
                      <Typography variant="caption" color="error">
                        ❌ Invalid domain
                      </Typography>
                    )}
                  </Stack>
                )}
              </Stack>
              <LoadingButton
                type="submit"
                loading={domainAddStatus.saving}
                variant="contained"
              >
                Add
              </LoadingButton>
            </Stack>
          </form>
        </Stack>
      )}
      <DomainStatusCard
        toggleDomainAlreadyAdded={toggleDomainAlreadyAdded}
        key={domainAddStatus.saving ? "saving" : "not-saving"}
      />
    </Stack>
  );
};

export default Domain;
