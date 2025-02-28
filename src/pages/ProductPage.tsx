import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Typography,
  Paper,
  CircularProgress,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Product } from "../types/Product";
import { fetchProduct, fetchProductsByCategory } from "../services/api";
import { ProductCard } from "../components/ProductCard";

export const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProduct = useCallback(async () => {
    try {
      if (!productId) return;

      const localProducts = JSON.parse(
        localStorage.getItem("products") || "[]"
      );
      const localProduct = localProducts.find(
        (p: Product) => p.id === Number(productId)
      );

      if (localProduct) {
        setProduct(localProduct);
      } else {
        const fetchedProduct = await fetchProduct(Number(productId));
        setProduct(fetchedProduct);
      }
    } catch (error) {
      console.error("Error loading product:", error);
      navigate("/404");
    } finally {
      setLoading(false);
    }
  }, [productId, navigate]);

  useEffect(() => {
    loadProduct();
  }, [loadProduct]);

  useEffect(() => {
    if (!product) return;
    const getRelatedProducts = async () => {
      try {
        const products = await fetchProductsByCategory(product.category);

        const filtered = products
          .filter((p) => p.id !== product.id)
          .slice(0, 4);

        setRelatedProducts(filtered);
      } catch (error) {
        console.error("Error loading related products:", error);
        setRelatedProducts([]);
      }
    };

    getRelatedProducts();
  }, [product]);

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

  if (!product) return null;

  return (
    <Box>
      <Paper
        sx={{
          p: 3,
          mt: 3,
          mb: 6,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          gap: { xs: 4, md: 8 },
        }}
      >
        <Box
          component="img"
          src={product.image}
          alt={product.title}
          sx={{
            width: { xs: "100%", md: "50%" },
            height: 400,
            objectFit: "contain",
          }}
        />
        <Box>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            Category: {product.category}
          </Typography>
          <Divider sx={{ my: 2 }} />
          <Typography variant="body1">{product.description}</Typography>
        </Box>
      </Paper>

      {relatedProducts.length > 0 && (
        <Box>
          <Typography variant="h5" gutterBottom>
            You might also like
          </Typography>
          <Grid container spacing={3}>
            {relatedProducts.map((product) => (
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
};
