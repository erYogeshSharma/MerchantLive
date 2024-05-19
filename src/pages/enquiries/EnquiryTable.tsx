import { BusinessEnquiry } from "../../types/business";
import {
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EmailOutlined, Phone } from "@mui/icons-material";
import RandomAvatar from "../../components/shared/RandomAvatar";
import moment from "moment";
import CopyButton from "../../components/shared/CopyButton";

type Props = {
  enquiries: BusinessEnquiry[];
};

const EnquiryTable = ({ enquiries }: Props) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              <strong>Visitor</strong>
            </TableCell>
            <TableCell>
              <strong>Enquiry</strong>
            </TableCell>
            <TableCell>
              <strong>Posted on</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {enquiries.map((enquiry, i) => (
            <TableRow key={i}>
              <TableCell>
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
                      <CopyButton text={enquiry.contact} />
                    </Stack>
                  </Stack>
                </Stack>
              </TableCell>
              <TableCell width="50%">
                <Typography variant="body2" color="text.secondary">
                  {enquiry.message}
                </Typography>
              </TableCell>
              <TableCell>
                <Typography variant="caption">
                  {moment(enquiry.createdAt).format("DD MMM YYYY \n hh:MM A")}{" "}
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default EnquiryTable;
