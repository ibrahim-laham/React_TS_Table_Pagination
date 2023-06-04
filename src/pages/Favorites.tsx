import { CreateData } from "../type";
import FavoritesItem from "../components/FavoritesItem";

type Prop = {
  favoritesList: CreateData[];
  deleteFavoriteHandler: (favorite: CreateData) => void;
};

export default function Favorites({
  favoritesList,
  deleteFavoriteHandler,
}: Prop) {
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
          <FavoritesItem
            key={favorite.name}
            favorite={favorite}
            deleteFavoriteHandler={deleteFavoriteHandler}
          />
        );
      })}
    </div>
  );
}
