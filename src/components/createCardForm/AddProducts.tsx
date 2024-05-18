import { AddOutlined, Delete, Edit } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
  Paper,
  Popover,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { IProduct } from "../../types/business";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { updateForm } from "../../store/business-form/business-form-slice";
import { LoadingButton } from "@mui/lab";
import ImageUploadButton from "../shared/ImageUploadButton";
import DrawerContainer from "../wrappers/DrawerContainer";

const ProductCard = ({
  product,
  index,
  handleEdit,
}: {
  product: IProduct;
  index: number;
  handleEdit: (product: IProduct) => void;
}) => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.businessForm);
  function handleProductDelete() {
    dispatch(
      updateForm({ products: form.products.filter((_, i) => i !== index) })
    );
  }
  function updateImage(icon: string) {
    dispatch(
      updateForm({
        products: form.products.map((l, i) =>
          i === index ? { ...l, image: icon } : l
        ),
      })
    );
  }

  return (
    <Paper variant="outlined">
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
        p={2}
      >
        <ImageUploadButton
          styles={{
            height: 50,
            width: 50,
            borderRadius: 4,
          }}
          image={product.image}
          name={product.title}
          onChange={(icon) => updateImage(icon)}
        />

        <Stack flex={1}>
          <Typography variant="body1"> {product.title} </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            {" "}
            {product.description || "This is a sample description"}{" "}
          </Typography>
        </Stack>
        <Stack direction="row" alignItems="center">
          <DeleteButton handleDelete={handleProductDelete} />
          <IconButton onClick={() => handleEdit(product)}>
            <Edit />
          </IconButton>
        </Stack>
      </Stack>
    </Paper>
  );
};

const DeleteButton = ({
  loading,
  handleDelete,
}: {
  loading?: boolean;
  handleDelete: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div>
      <IconButton
        size="small"
        color="error"
        aria-describedby={id}
        onClick={handleClick}
      >
        <Delete />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <Stack width={300} px={2} py={1}>
          <Typography sx={{ p: 2 }}>Are you sure</Typography>
          <Stack direction="row" justifyContent="flex-end" spacing={2}>
            <Button onClick={handleClose} variant="outlined" size="small">
              Cancel
            </Button>
            <LoadingButton
              onClick={handleDelete}
              loading={loading}
              variant="contained"
              size="small"
            >
              Yes
            </LoadingButton>
          </Stack>
        </Stack>
      </Popover>
    </div>
  );
};

const AddProducts = () => {
  const dispatch = useAppDispatch();
  const { form } = useAppSelector((state) => state.businessForm);

  const [newProductForm, setNewProductForm] = useState({
    _id: "",
    title: "",
    image: "",
    description: "",
  });

  function handleAdd() {
    if (newProductForm._id) {
      dispatch(
        updateForm({
          products: form.products.map((l) =>
            l._id === newProductForm._id ? newProductForm : l
          ),
        })
      );
      handleClose();
      return;
    }
    dispatch(updateForm({ products: [...form.products, newProductForm] }));
    setNewProductForm({ _id: "", title: "", image: "", description: "" });
    handleClose();
  }

  function handleEdit(product: IProduct) {
    setNewProductForm(product);
    setOpen(true);
  }

  function handleOpen() {
    setNewProductForm({ _id: "", title: "", image: "", description: "" });
    setOpen(true);
  }

  function handleClose() {
    setNewProductForm({ _id: "", title: "", image: "", description: "" });
    setOpen(false);
  }

  const [open, setOpen] = useState(false);

  return (
    <Stack spacing={2} divider={<Divider />}>
      <Stack spacing={2}>
        {form.products.map((p, i) => (
          <ProductCard product={p} index={i} handleEdit={handleEdit} />
        ))}
        <Button onClick={handleOpen} variant="contained">
          Add Product/Service
        </Button>
      </Stack>
      <DrawerContainer
        footer={
          <Stack p={2}>
            <LoadingButton
              loading={false}
              onClick={handleAdd}
              variant="contained"
            >
              Save
            </LoadingButton>
          </Stack>
        }
        open={open}
        handleClose={handleClose}
        label={newProductForm._id ? "Edit Product" : "Add Product"}
      >
        <Stack spacing={2} flex={1} alignItems="center" p={2}>
          <ImageUploadButton
            image={newProductForm.image}
            name={newProductForm.title}
            onChange={(image) => setNewProductForm((op) => ({ ...op, image }))}
          />
          <TextField
            fullWidth
            label="Title"
            size="small"
            value={newProductForm.title}
            onChange={(e) =>
              setNewProductForm((pf) => ({ ...pf, title: e.target.value }))
            }
          />
          <TextField
            fullWidth
            multiline
            minRows={3}
            maxRows={5}
            label="Description"
            size="small"
            value={newProductForm.description}
            onChange={(e) =>
              setNewProductForm((pf) => ({
                ...pf,
                description: e.target.value,
              }))
            }
          />
        </Stack>
      </DrawerContainer>
    </Stack>
  );
};

export default AddProducts;
