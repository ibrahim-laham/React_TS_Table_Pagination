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

import { CountryData } from "../../type";

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

type Prop = {
  detailIsLoading: boolean;
  detailResult: CountryData[];
  setDetailIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDetailResult: React.Dispatch<React.SetStateAction<CountryData[]>>;
};

export default function CountryDetail({
  detailIsLoading,
  detailResult,
  setDetailIsLoading,
  setDetailResult,
}: Prop) {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const detail = useParams();
  const url = `https://restcountries.com/v3.1/name/${detail.id}`;

  async function getDetail() {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setDetailIsLoading(false);
      setDetailResult(data);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    getDetail();
  }, );

  if (detailIsLoading) {
    return <CircularProgress color="success" />;
  } else {
    return (
      <Card sx={{ maxWidth: 345 }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {detailResult[0]?.name.common.slice(0, 1)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title={detailResult[0]?.name.official}
          subheader={detailResult[0]?.capital}
        />
        <CardMedia
          component="img"
          height="194"
          image={detailResult[0]?.flags.svg}
          alt="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            the country belongs to{" "}
            <span style={{ color: "lightskyblue" }}>
              {detailResult[0]?.region}
            </span>{" "}
            region and{" "}
            <span style={{ color: "lightskyblue" }}>
              {detailResult[0]?.subregion}
            </span>{" "}
            sub-region. Located at the{" "}
            <span style={{ color: "lightskyblue" }}>
              {detailResult[0]?.latlng[0]}
            </span>{" "}
            &#176;N and{" "}
            <span style={{ color: "lightskyblue" }}>
              {detailResult[0]?.latlng[1]}
            </span>{" "}
            &#176;W, this country has population of{" "}
            <span style={{ color: "lightskyblue" }}>
              {detailResult[0]?.population}
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
            <a
              href={detailResult[0]?.maps.googleMaps}
              style={{ color: "white" }}
              target="_blank"
              rel="noreferrer"
            >
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
            <Typography paragraph>{detailResult[0]?.name.common}:</Typography>
            <Typography paragraph>{detailResult[0]?.flags.alt}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    );
  }
}
