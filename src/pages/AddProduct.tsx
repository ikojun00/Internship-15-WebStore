import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  FormHelperText,
  SelectChangeEvent,
} from "@mui/material";
import { fetchCategories } from "../services/api";
import { FormData } from "../types/FormData";

export const AddProduct = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [categories, setCategories] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    const loadData = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    loadData();
  }, []);

  const validateForm = useCallback(() => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = "Title is required";
    if (!formData.price.trim()) newErrors.price = "Price is required";
    if (isNaN(Number(formData.price)))
      newErrors.price = "Price must be a number";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category.trim()) newErrors.category = "Category is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      if (!validateForm()) return;

      const newProduct = {
        id: Date.now(),
        ...formData,
        price: Number(formData.price),
      };

      const existingProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      localStorage.setItem(
        "products",
        JSON.stringify([...existingProducts, newProduct])
      );

      navigate("/");
    },
    [formData, validateForm, navigate]
  );

  const handleInputChange = useCallback(
    (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    []
  );

  const handleSelectChange = useCallback(
    (field: keyof FormData) => (e: SelectChangeEvent) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    []
  );

  return (
    <Box maxWidth={600} mx="auto">
      <Paper sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Add New Product
        </Typography>

        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            <TextField
              label="Title"
              value={formData.title}
              onChange={handleInputChange("title")}
              error={!!errors.title}
              helperText={errors.title}
              fullWidth
            />

            <TextField
              label="Price"
              value={formData.price}
              onChange={handleInputChange("price")}
              error={!!errors.price}
              helperText={errors.price}
              fullWidth
            />

            <TextField
              label="Description"
              value={formData.description}
              onChange={handleInputChange("description")}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              fullWidth
            />

            <FormControl fullWidth error={!!errors.category}>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={handleSelectChange("category")}
              >
                {categories.map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
              {errors.category && (
                <FormHelperText>{errors.category}</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Image URL"
              value={formData.image}
              onChange={handleInputChange("image")}
              fullWidth
            />

            <Button type="submit" variant="contained" size="large">
              Add Product
            </Button>
          </Stack>
        </form>
      </Paper>
    </Box>
  );
};
