interface IMeasurement {
  value: number;
  unit: string;
}

export interface IPunkApiPayload {
  id: number;
  name: string;
  tagline: string;
  first_brewed: string;
  description: string;
  image_url: string;
  abv: number;
  ibu: number;
  target_fg: number;
  target_og: number;
  ebc: number;
  srm: number;
  ph: number;
  attenuation_level: number;
  volume: IMeasurement;
  boil_volume: IMeasurement;
  method: {
    mash_temp: {
      temp: IMeasurement;
      duration: number;
    }[];
    fermentation: {
      temp: IMeasurement;
    };
    twist: string;
  };
  ingredients: {
    malt: {
      name: string;
      amount: IMeasurement;
    }[];
    hops: {
      name: string;
      amount: IMeasurement;
      add: string;
      attribute: string;
    }[];
    yeast: string;
  };
  food_pairings: string[];
  brewers_tips: string;
  contributed_by: string;
};