import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Product } from "../types/Product";

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea
        sx={{
          pt: 2,
          px: 1,
        }}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <CardMedia
          component="img"
          height="150"
          image={product.image}
          alt={product.title}
          sx={{ objectFit: "contain" }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {product.title}
          </Typography>
          <Typography variant="body1" color="primary" fontWeight="bold">
            ${product.price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
