import * as React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import CircularProgress from "@mui/material/CircularProgress";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";

import { CountryData } from "../type";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function CountryDetail() {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const detail = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [result, setResult] = useState<CountryData[]>([]);
  async function getData(url: string) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setIsLoading(false);
      setResult(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getData(`https://restcountries.com/v3.1/name/${detail.id}`);
  }, [detail.id]);

  if (isLoading) {
    return <CircularProgress color="success" />;
  } else {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {result[0]?.name.common.slice(0, 1)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={result[0]?.name.official}
          subheader={result[0]?.capital}
        />
        <CardMedia
          component="img"
          height="194"
          image={result[0]?.flags.svg}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            the country belongs to{" "}
            <span style={{ color: "lightskyblue" }}>{result[0]?.region}</span>{" "}
            region and{" "}
            <span style={{ color: "lightskyblue" }}>
              {result[0]?.subregion}
            </span>{" "}
            sub-region. Located at the{" "}
            <span style={{ color: "lightskyblue" }}>
              {result[0]?.latlng[0]}
            </span>{" "}
            &#176;N and{" "}
            <span style={{ color: "lightskyblue" }}>
              {result[0]?.latlng[1]}
            </span>{" "}
            &#176;W, this country has population of{" "}
            <span style={{ color: "lightskyblue" }}>
              {result[0]?.population}
            </span>{" "}
            and it has gained it's independence, according to the CIA Worlf
            Factbook.
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <Link to="/">
            <IconButton>
              <ArrowBackIosIcon />
            </IconButton>
          </Link>
          <IconButton
            aria-label="location"
            sx={{
              marginBottom: "0.8vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <a href={result[0]?.maps.googleMaps} style={{ color: "white" }} target="_blank" rel="noreferrer">
              <LocationOnIcon />
            </a>
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that
              don&apos;t open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}
