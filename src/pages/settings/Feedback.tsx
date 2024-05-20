import { LoadingButton } from "@mui/lab";
import { Alert, Grow, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { send_feedback } from "../../api";
import { toast } from "react-toastify";
import axios from "axios";

const Feedback = () => {
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState<string | null>("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSending(true);
    try {
      await send_feedback({
        message: message as string,
      });
      setMessage("");
      setShowSuccessMessage(true);
      setSending(false);
    } catch (error) {
      setSending(false);
      if (axios.isAxiosError(error)) {
        toast.error(error?.response?.data?.message);
      }
    }
  }
  return (
    <Stack spacing={1}>
      <Typography variant="caption">
        We're here to help! Send us your enquiries, get support, or recommend
        new features.
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="Message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            fullWidth
            variant="outlined"
            placeholder="Type your message here..."
            multiline
            minRows={4}
            maxRows={8}
            name="message"
            required
          />
          {showSuccessMessage && (
            <Grow in>
              <Alert severity="success">
                Thank you! Your message has been sent successfully. We
                appreciate your feedback and will get back to you shortly.
              </Alert>
            </Grow>
          )}
          <Stack alignItems="flex-end">
            <LoadingButton loading={sending} type="submit" variant="contained">
              Send Message
            </LoadingButton>
          </Stack>
        </Stack>
      </form>
    </Stack>
  );
};

export default Feedback;
