import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";

import { CreateData } from "../type";

type Prop = {
  favoritesList: CreateData[];
};

export default function Favorites({ favoritesList }: Prop) {
  console.log(favoritesList);
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-around",
        flexWrap: "wrap",
        columnGap: "2vw",
        marginTop: "10vh",
      }}
    >
      {favoritesList.map((favorite) => {
        return (
          <Card sx={{ width: 345, height: 420, marginBottom: "2vh", position: "relative" }}>
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
            <CardActions sx={{position: "absolute", bottom: "1vw", left: "1vw"}}>
              <Button size="small" color="primary">
                Share
              </Button>
            </CardActions>
          </Card>
        );
      })}
    </div>
  );
}
