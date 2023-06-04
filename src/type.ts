export type CountryData = {
  name: {common: string; official:string};
  region: string;
  subregion: string;
  population: number;
  area: number;
  flags: {svg:string; alt:string;};
  maps: {googleMaps: string;};
  languages: {[key:string]:string};
  capital: string[];
  latlng: number[];
}

export type CreateData = {
  name: string;
  region: string;
  Population: number;
  languages: string[];
  Flag: string[];
  flagDescription:string;
}

export interface Column {
  id: 'name' | 'region' | 'Population' | 'languages' | 'Flag'| "flagDescription";
  label: string;
  minWidth?: number;
  align?: 'center';
  format?: (value: number) => string;
}

export type UserInputHandler = (event:React.ChangeEvent<HTMLInputElement>) => void ;