import * as React from "react";
import {
  Avatar,
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
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getAllBusiness } from "../../store/business/business-api";
import { EditOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { resetForm } from "../../store/business-form/business-form-slice";
import Height from "./C";

export default function DataTable() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { cards, loadingCards } = useAppSelector((state) => state.business);

  React.useEffect(() => {
    dispatch(getAllBusiness());
  }, []);

  function handleEdit(id: string) {
    dispatch(resetForm());
    navigate(`/cards/edit/${id}`);
  }
  function navigateToCreate() {
    dispatch(resetForm());
    navigate("/cards/create");
  }
  return (
    <div
      style={{
        height: 400,
        width: "100%",
      }}
    >
      <Stack
        mb={2}
        direction="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h5">Cards</Typography>
        <Button variant="contained" onClick={navigateToCreate}>
          {" "}
          Create
        </Button>
      </Stack>
      {loadingCards && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>

              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Active</TableCell>
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cards.map((card) => (
              <TableRow
                key={card._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Avatar src={card.logo} />
                    <Stack>
                      <Typography
                        variant="body1"
                        color="text.primary"
                        fontWeight={600}
                      >
                        {card.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {card.linkId}
                      </Typography>
                    </Stack>
                  </Stack>
                </TableCell>
                <TableCell align="left">{card.title}</TableCell>
                <TableCell align="left">
                  <Switch checked={card.isActive} />
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" spacing={1}>
                    <IconButton onClick={() => handleEdit(card._id)}>
                      <EditOutlined />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Height />
    </div>
  );
}
