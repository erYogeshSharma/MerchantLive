import { AddOutlined, Delete } from "@mui/icons-material";
import {
  Button,
  Divider,
  IconButton,
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

const ProductCard = ({
  product,
  index,
}: {
  product: IProduct;
  index: number;
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function handleChange(e: any) {
    dispatch(
      updateForm({
        products: form.products.map((l, i) =>
          i === index ? { ...l, title: e.target.value } : l
        ),
      })
    );
  }
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      spacing={2}
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

      <TextField
        fullWidth
        onChange={handleChange}
        label="Title"
        size="small"
        value={product.title}
      />

      <DeleteButton handleDelete={handleProductDelete} />
    </Stack>
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
    title: "",
    image: "",
  });

  function handleAdd() {
    dispatch(updateForm({ products: [...form.products, newProductForm] }));
    setNewProductForm({ title: "", image: "" });
  }

  return (
    <Stack spacing={2} divider={<Divider />}>
      {form.products.map((p, i) => (
        <ProductCard product={p} index={i} />
      ))}
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        spacing={2}
      >
        <ImageUploadButton
          styles={{
            height: 50,
            width: 50,
            borderRadius: 4,
          }}
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

        <IconButton
          onClick={handleAdd}
          disabled={!newProductForm.image || !newProductForm.title}
          size="small"
          color="success"
        >
          <AddOutlined />
        </IconButton>
      </Stack>
    </Stack>
  );
};

export default AddProducts;
