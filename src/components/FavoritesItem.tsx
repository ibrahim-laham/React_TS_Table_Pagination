import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { CreateData } from "../type";

type Prop = {
  favorite: CreateData;
  deleteFavoriteHandler: (favorite: CreateData) => void;
};

export default function FavoritesItem({
  favorite,
  deleteFavoriteHandler,
}: Prop) {
  return (
    <Card
      sx={{
        width: 345,
        height: 420,
        marginBottom: "2vh",
        position: "relative",
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={favorite?.Flag[0]}
          alt={favorite?.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {favorite?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {favorite?.flagDescription}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions sx={{ position: "absolute", bottom: "1vw", left: "1vw" }}>
        <Button
          size="small"
          color="primary"
          onClick={() => deleteFavoriteHandler(favorite)}
        >
          remove
        </Button>
      </CardActions>
    </Card>
  );
}
