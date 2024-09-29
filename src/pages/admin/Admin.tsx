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
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import EditUser from "./Modals/EditUser";
import { User } from "@/types/admin";

const Admin = () => {
  const dispatch = useAppDispatch();

  const [userToEdit, setUserToEdit] = useState("");
  const [openUserModal, setOpenUserModal] = useState(false);
  const { users, isLoadingUsers } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  function handleUserEditOpen(user: User) {
    setUserToEdit(user._id);
    setOpenUserModal(true);
  }
  return (
    <Box>
      <EditUser
        open={openUserModal}
        handleClose={() => setOpenUserModal(false)}
        userToEdit={userToEdit}
      />
      <Typography variant="h6" fontWeight={600}>
        Admin
      </Typography>
      {isLoadingUsers && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    {user.profilePicUrl ? (
                      <Avatar src={user.profilePicUrl} />
                    ) : (
                      <RandomAvatar name={user.name} />
                    )}
                    <Stack>
                      <Typography fontWeight={600}>{user.name}</Typography>
                      <Typography variant="caption">{user.email}</Typography>
                    </Stack>
                  </Stack>
                </TableCell>

                <TableCell>
                  {moment(user.createdAt).format("DD MMMM YYYY")}
                </TableCell>
                <TableCell>{user.business}</TableCell>
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
