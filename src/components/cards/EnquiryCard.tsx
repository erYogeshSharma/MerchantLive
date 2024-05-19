import { BusinessEnquiry } from "../../types/business";
import { Collapse, Divider, Paper, Stack, Typography } from "@mui/material";

import moment from "moment";
import { EmailOutlined, Phone } from "@mui/icons-material";

import RandomAvatar from "../shared/RandomAvatar";

const EnquiryCard = ({ enquiry }: { enquiry: BusinessEnquiry }) => {
  //   const length = 100;
  //   const [text, setText] = useState(enquiry.message.substring(0, length));

  //   const toggleText = () => {
  //     if (text.length === length) {
  //       setText(enquiry.message);
  //     } else {
  //       setText(enquiry.message.substring(0, length));
  //     }
  //   };

  return (
    <Paper>
      <Stack>
        <Stack direction="row" alignItems="center" p={1} spacing={1}>
          <RandomAvatar name={enquiry.name} size={70} />

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
            </Stack>
          </Stack>
        </Stack>

        <Divider />

        <Stack px={2} py={1}>
          <Typography variant="caption" fontWeight={600}>
            Message
          </Typography>
          <Stack my={1}>
            <Collapse in orientation="vertical">
              <Stack
                direction="row"
                alignItems="center"
                // height={
                //   enquiry.message.length > length && text.length === length
                //     ? 100
                //     : "auto"
                // }
              >
                <Typography variant="body2" color="text.secondary">
                  {enquiry.message}
                  {/* <span>
                    {enquiry.message.length > length && (
                      <Link
                        onClick={toggleText}
                        underline="none"
                        component="button"
                      >
                        {text.length === length ? "Read More" : "Read Less"}
                      </Link>
                    )}
                  </span> */}
                </Typography>
              </Stack>
            </Collapse>
          </Stack>
          <Stack alignItems="flex-end">
            <Typography variant="caption" color="primary">
              Received on :{" "}
              {moment(enquiry.createdAt).format("DD MMM YYYY , hh:MM A")}{" "}
            </Typography>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
};

export default EnquiryCard;
