import {
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Container,
} from "@mui/material";
import Img from "../../../public/0620-28.webp";
import { formatCurrency } from "@/utils/formatCurrency";
import { useEffect, useState } from "react";
import { ProductData } from "@/models/product.modal";
import { fecthPordutcs } from "@/services/serverService";
import { imageUrl } from "@/utils/commin";

const Orders = () => {
  const [product, setProducts] = useState<ProductData[]>([]);

  useEffect(() => {
    fecthPordutcs()
      .then((response) => setProducts(response.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container sx={{ py: 8 }} maxWidth="md">
      {/* End hero unit */}
      <Grid container spacing={2}>
        {product &&
          product.map((product) => (
            <Grid item key={product.product_id} xs={12} sm={6} md={3}>
              <Card className="h-full flex flex-col">
                <CardMedia
                  className="p-2"
                  component="img"
                  image={imageUrl(product.image)}
                  alt="random"
                />
                <CardContent
                  className="!p-[10px] bg-slate-100"
                  sx={{ flexGrow: 1 }}
                >
                  <Typography className="!text-md truncate">
                    {product.name}
                  </Typography>
                  <Typography>{formatCurrency(product.price)}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default Orders;
