import { useState, useEffect, useMemo, useCallback } from "react";
import {
  Box,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Product } from "../types/Product";
import { fetchCategories, fetchProducts } from "../services/api";
import { ProductCard } from "../components/ProductCard";

export const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const productsData = await fetchProducts();
        const categoriesData = await fetchCategories();

        const localProducts = JSON.parse(
          localStorage.getItem("products") || "[]"
        );
        setProducts([...localProducts, ...productsData]);
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleCategoryChange = useCallback((e: SelectChangeEvent<string>) => {
    setSelectedCategory(e.target.value);
  }, []);

  const filteredProducts = useMemo(() => {
    return products
      .filter(
        (product) =>
          product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
          (!selectedCategory || product.category === selectedCategory)
      )
      .slice(0, 20);
  }, [products, searchQuery, selectedCategory]);

  if (loading)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Box>
      <Box
        sx={{
          mb: 4,
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
        }}
      >
        <TextField
          label="Search products"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearchChange}
          sx={{ flexGrow: 1 }}
        />
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedCategory}
            label="Category"
            onChange={handleCategoryChange}
          >
            <MenuItem value="">all categories</MenuItem>
            {categories.map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {filteredProducts.map((product) => (
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
