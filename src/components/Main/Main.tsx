import * as React from 'react';
import './Main.scss';

import { BeerCard, IBeerCard } from '../BeerCard/BeerCard';
import { IPunkApiPayload } from '../../types/PunkApiTypes';
import { getBeerRandom, getBeerSearchResults, filterPayload, filterPayloadSingle } from '../../utils/punkApiUtils';

interface IMainState {
  searchQuery: string;
  randomBeer?: IBeerCard;
  beerResults?: IBeerCard[];
}

export class Main extends React.Component<{}, IMainState> {
  state: IMainState = { searchQuery: '' };

  searchBeers = (query: string): void => {
    const beerSearchPromise = getBeerSearchResults(query);
    const beerRandomPromise = getBeerRandom();

    beerSearchPromise
      .then((payload: IPunkApiPayload[]) => {
        const beerResults = filterPayload(payload);
        
        this.setState({ beerResults: beerResults });
        
        if (!beerResults.length) {
          return beerRandomPromise;
        }
      })
      .then((payload: IPunkApiPayload[] | undefined) => {
        if (payload) {
          const randomBeerResult = filterPayloadSingle(payload);
          this.setState({ randomBeer: randomBeerResult });
        }
      })
  };

  queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchQuery: e.currentTarget.value });
  };

  searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.searchBeers(this.state.searchQuery);
  };

  render() {
    return (
      <div>
        <h1>Punk API Food Pairing</h1>
        <div>
          <form onSubmit={this.searchSubmitHandler}>
            <label>
              <input
                type='text'
                value={this.state.searchQuery}
                name='foodQueryField'
                placeholder='find a food pairing!'
                onChange={this.queryChangeHandler}
              />
            </label>
            <input type='submit' value='Search' />
          </form>

          { this.state.beerResults && this.state.beerResults.length ? 
            (
              this.state.beerResults.map((beerObj, ndx) => {
                return (
                  <BeerCard
                    key={ndx}
                    name={beerObj.name}
                    tagline={beerObj.tagline}
                    description={beerObj.description}
                    imageUrl={beerObj.imageUrl}
                    abv={beerObj.abv}
                  />
                );
              })
            )
            : this.state.beerResults ? 
            (
              <p>no results</p>
            )
            :
            (
              <p>Search!</p>
            )
          }

        </div>
      </div>
    );
  }
}