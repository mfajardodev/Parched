import axios, { AxiosResponse } from 'axios';

import { IPunkApiPayload } from '../types/PunkApiTypes';
import { IBeerCard } from '../components/BeerCard/BeerCard';

export async function getBeerRandom(): Promise<IPunkApiPayload[]> {
  const payload : AxiosResponse = await axios.get('https://api.punkapi.com/v2/beers/random');
  return payload.data;
};

export async function getBeerSearchResults(search_terms : string): Promise<IPunkApiPayload[]> {
  const payload : AxiosResponse = await axios.get('https://api.punkapi.com/v2/beers?food=' + search_terms);
  return payload.data;
}

export function filterPayloadSingle(payload: IPunkApiPayload[]): IBeerCard {
  const beerObj = payload[0];
  
  return {
    name: beerObj.name,
    tagline: beerObj.tagline,
    description: beerObj.description,
    imageUrl: beerObj.image_url,
    abv: beerObj.abv
  };
}

export function filterPayload(payload: IPunkApiPayload[]): IBeerCard[] {
  const results = [];
  
  payload.forEach(result => {
    results.push({
      name: result.name,
      tagline: result.tagline,
      description: result.description,
      imageUrl: result.image_url,
      abv: result.abv
    });
  });
  
  return results;
}

