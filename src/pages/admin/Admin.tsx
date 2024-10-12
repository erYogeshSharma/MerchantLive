/* eslint-disable react-hooks/exhaustive-deps */
import RandomAvatar from "@/components/shared/RandomAvatar";
import { getAllUsers } from "@/store/admin/admin-api";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { EditOutlined } from "@mui/icons-material";
import {
  Avatar,
  Box,
  IconButton,
  LinearProgress,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Link,
  Typography,
  Chip,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import EditUser from "./Modals/EditUser";
import { User } from "@/types/admin";
import { id_app_url } from "@/constants/config";

const Admin = () => {
  const dispatch = useAppDispatch();

  const [userToEdit, setUserToEdit] = useState({} as User);
  const [openUserModal, setOpenUserModal] = useState(false);
  const { users, isLoadingUsers } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  function handleUserEditOpen(user: User) {
    setUserToEdit(user);
    setOpenUserModal(true);
  }
  return (
    <Box>
      <EditUser open={openUserModal} handleClose={() => setOpenUserModal(false)} userToEdit={userToEdit} />
      <Typography variant="h6" fontWeight={600}>
        Admin
      </Typography>
      {isLoadingUsers && <LinearProgress />}
      <TableContainer component={Paper} style={{ maxWidth: "100%", overflowX: "auto" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Joined Date</TableCell>
              <TableCell>Plan Start Date </TableCell>
              <TableCell>Plan End Date</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
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
                  <Typography variant="subtitle2">{moment(user.plan_start_date).format("DD MMMM YYYY")}</Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle2">{moment(user.plan_end_date).format("DD MMMM YYYY")}</Typography>
                </TableCell>

                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <IconButton onClick={() => handleUserEditOpen(user)}>
                      <EditOutlined />
                    </IconButton>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Admin;
