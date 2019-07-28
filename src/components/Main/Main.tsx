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
          console.log(randomBeerResult);
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
      <div className='app-col'>
        <div className='app-container'>
          <h1 className='app-title'>Punk API Food Pairing</h1>
          <div className='description'>
            <p>Enter a dish or ingredient below to find Brew Dog beer pairings!</p>
            <p>Data provided by PunkAPI</p>
          </div>
          <div>
            <form onSubmit={this.searchSubmitHandler}>
              <label>
                <input
                  type='text'
                  value={this.state.searchQuery}
                  name='foodQueryField'
                  className='food-query-field'
                  placeholder='Enter a dish or ingredient here! (ex. "beef")'
                  onChange={this.queryChangeHandler}
                />
              </label>
            </form>

            { this.state.beerResults && this.state.beerResults.length ? 
              (
                <div className='search-results'>
                  <p>Search Results</p>
                  {this.state.beerResults.map((beerObj, ndx) => {
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
                  }
                </div>
              )
              : this.state.beerResults && this.state.randomBeer ? 
              (
                <div className='search-results'>
                  <p>no results</p>
                  <BeerCard
                    name={this.state.randomBeer.name}
                    tagline={this.state.randomBeer.tagline}
                    description={this.state.randomBeer.description}
                    imageUrl={this.state.randomBeer.imageUrl}
                    abv={this.state.randomBeer.abv}
                  />
                </div>
              )
              :
              ''
            }

          </div>
        </div>
      </div>
    );
  }
}