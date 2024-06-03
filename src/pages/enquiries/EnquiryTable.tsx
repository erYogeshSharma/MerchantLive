import {
  Chip,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import {
  Done,
  EmailOutlined,
  Pending,
  Phone,
  WhatsApp,
} from "@mui/icons-material";
import RandomAvatar from "../../components/shared/RandomAvatar";
import moment from "moment";
import CopyButton from "../../components/shared/CopyButton";
import { BusinessEnquiry } from "@/types/business";
import { useState } from "react";
import { update_enquiry_status } from "@/api";
import { toast } from "react-toastify";
import { updateEnquiryStatus } from "@/store/business/business-slice";
import { useAppDispatch } from "@/store/hooks";

type Props = {
  enquiries: BusinessEnquiry[];
};

const EnquiryTable = ({ enquiries }: Props) => {
  const dispatch = useAppDispatch();
  const [updating, setUpdating] = useState("");
  async function updateStatus(enquiry: BusinessEnquiry) {
    try {
      setUpdating(enquiry._id);
      await update_enquiry_status(enquiry._id, !enquiry.isSolved);
      dispatch(updateEnquiryStatus(enquiry._id));
      setUpdating("");
      toast.success("Status updated successfully");
    } catch (error) {
      toast.error("Error updating status");
      setUpdating("");
    }
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }}>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Visitor</strong>
            </TableCell>
            <TableCell align="left">
              <strong>Enquiry</strong>
            </TableCell>
            <TableCell align="left">
              <strong>Posted on</strong>
            </TableCell>
            <TableCell align="right">
              <strong>Status</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enquiries.map((enquiry, i) => (
            <TableRow
              key={i}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Stack direction="row" alignItems="center" p={1} spacing={1}>
                  <RandomAvatar name={enquiry.name} size={50} />
                  <Stack>
                    <Typography variant="body1" fontWeight={600}>
                      {enquiry.name}
                    </Typography>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <EmailOutlined
                        sx={{
                          fontSize: 17,
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {enquiry.email}
                      </Typography>
                      <CopyButton text={enquiry.email} />
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                      <Phone
                        sx={{
                          fontSize: 17,
                          color: (theme) => theme.palette.text.secondary,
                        }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        {enquiry.contact}
                      </Typography>
                      <Tooltip title="Message on whatsapp">
                        <IconButton
                          target="_blank"
                          href={`https://wa.me/${enquiry.contact}`}
                        >
                          <WhatsApp sx={{ color: "#25D366" }} />
                        </IconButton>
                      </Tooltip>
                      <CopyButton text={enquiry.contact} />
                    </Stack>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" color="text.secondary">
                  {enquiry.message}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="caption" sx={{ whiteSpace: "pre-line" }}>
                  {moment(enquiry.createdAt).format("DD MMM YYYY  \n hh:MM A")}{" "}
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Tooltip
                  title={
                    enquiry.isSolved
                      ? "Click to mark unsolved"
                      : "Click to mark solved"
                  }
                >
                  <Chip
                    disabled={updating === enquiry._id}
                    onClick={() => updateStatus(enquiry)}
                    color={enquiry.isSolved ? "success" : "warning"}
                    label={enquiry.isSolved ? "Solved" : "Pending"}
                    icon={enquiry.isSolved ? <Done /> : <Pending />}
                  />
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EnquiryTable;
