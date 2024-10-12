import { get_referrals } from "@/api";
import RandomAvatar from "@/components/shared/RandomAvatar";
import { app_url, id_app_url } from "@/constants/config";
import { useAppSelector } from "@/store/hooks";
import { User } from "@/types/admin";
import { ArrowForward, InsertLink, LinkOutlined, LockOpen, RedeemRounded } from "@mui/icons-material";
import {
  Box,
  Button,
  InputAdornment,
  OutlinedInput,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Link,
  Chip,
  Avatar,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

import { toast } from "react-toastify";

const Steps = [
  {
    title: "Join Now",
    icon: LockOpen,
  },
  {
    title: "Share Your Link",
    icon: InsertLink,
  },
  {
    title: "Earn the Rewards",
    icon: RedeemRounded,
  },
];
const Referral = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [referrals, setReferrals] = useState<User[]>([]);

  const link = app_url + "register?referral-code=" + user.referralCode;

  function copyLink() {
    navigator.clipboard.writeText(link);
    toast.success("Link Copied");
  }

  async function getReferrals() {
    try {
      const { data } = await get_referrals();
      setReferrals(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getReferrals();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const IconWrapper = ({ Icon }: { Icon: any }) => {
    return (
      <Stack
        alignItems="center"
        justifyContent="center"
        height={60}
        width={60}
        sx={{
          borderRadius: "50%",
          backgroundImage: (theme) => `linear-gradient( ${theme.palette.primary[300]}, ${theme.palette.primary[500]})`,
        }}
      >
        <Icon sx={{ color: "#fff" }} />
      </Stack>
    );
  };

  return (
    <Box>
      <Stack spacing={2}>
        <Stack alignItems="center" textAlign="center">
          <Typography variant="h4" color="text.primary">
            Earn up to <b>₹200</b> on every referral.
          </Typography>
          <Typography textAlign="center" color="text.secondary" variant="body2" sx={{ whiteSpace: "pre-wrap" }}>
            For every qualified referee who subscribes to BharatBiz, {"\n"} we'll give both of you a <b>₹200</b> credit.
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center" justifyContent="center" spacing={4} divider={<ArrowForward />}>
          {Steps.map((step, index) => (
            <Stack key={index} alignItems="center" spacing={1}>
              <IconWrapper Icon={step.icon} />
              <Typography variant="caption">{step.title}</Typography>
            </Stack>
          ))}
        </Stack>

        <Stack alignItems="center">
          <Typography variant="caption">Copy the link below and share it with your referee</Typography>
          <Stack direction="row" spacing={2}>
            <OutlinedInput
              value={link}
              startAdornment={
                <InputAdornment position="start">
                  <LinkOutlined />
                </InputAdornment>
              }
              size="small"
            />
            <Button onClick={copyLink} size="small" variant="contained">
              Copy Link
            </Button>
          </Stack>
        </Stack>
        <Stack>
          <Typography>Your Referrals</Typography>
          <Stack>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>User</TableCell>
                    <TableCell>Business</TableCell>
                    <TableCell>Joined Date</TableCell>
                    <TableCell>Plan End Date </TableCell>
                    <TableCell>Plan</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {referrals.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Stack direction="row" alignItems="center" spacing={2}>
                          {user.profilePicUrl ? <Avatar src={user.profilePicUrl} /> : <RandomAvatar name={user.name} />}
                          <Stack>
                            <Typography fontWeight={600}>{user.name}</Typography>
                            <Typography variant="caption">{user.email}</Typography>
                          </Stack>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        {user.business?._id ? (
                          <Stack>
                            <Typography variant="subtitle2">
                              <b> Name:</b> {user.business?.name}
                            </Typography>

                            <Typography variant="subtitle2">
                              <b> Link :</b>
                              <Link target="_blank" href={`${id_app_url}/${user.business?.linkId}`}>
                                {" "}
                                {user.business?.linkId}{" "}
                              </Link>
                            </Typography>
                          </Stack>
                        ) : (
                          <Chip label="Not Created" variant="filled" color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle2">{moment(user.createdAt).format("DD MMMM YYYY")}</Typography>
                      </TableCell>

                      <TableCell>
                        <Typography variant="subtitle2">{moment(user.plan_end_date).format("DD MMMM YYYY")}</Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={user.is_paid_plan === "ACTIVE" ? "Paid" : "Trial"}
                          variant="filled"
                          color={user.is_paid_plan === "ACTIVE" ? "success" : "warning"}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>
        </Stack>
      </Stack>
    </Box>
  );
};

export default Referral;
