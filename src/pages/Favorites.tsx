import { CreateData } from "../type";


type Prop = {
  favoritesList:CreateData[];
}

export default function Favorites ({favoritesList}:Prop) {
  console.log(favoritesList)
  return <div>
    Favorites
  </div>
}