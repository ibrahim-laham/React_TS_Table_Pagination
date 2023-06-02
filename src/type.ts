export type CountryData = {
  name: {common: string;};
  region: string;
  population: number;
  area: number;
  flags: {svg:string;};
  maps: {googleMaps: string;};
  languages: {[key:string]:string};
}

export type CreateData = {
  name: string;
  region: string;
  Population: number;
  languages: string[];
  Flag: string[];
}

export type Column = {
  id: keyof CreateData;
  label: string;
  minWidth: number; 
  align: "center" | "left" | "right" | "justify" | "inherit" | undefined;
  format: ((value:string|number) => string)|undefined;
  };

export type UserInputHandler = (event:React.ChangeEvent<HTMLInputElement>) => void ;