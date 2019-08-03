import * as React from 'react';
import './Main.scss';

import { BeerCard, IBeerCard } from '../BeerCard/BeerCard';
import { IPunkApiPayload } from '../../types/PunkApiTypes';
import { getBeerRandom, getBeerSearchResults, filterPayload, filterPayloadSingle } from '../../utils/punkApiUtils';

interface IMainState {
  searchValue: string;
  searchQuery?: string;
  randomBeer?: IBeerCard;
  beerResults?: IBeerCard[];
}

export class Main extends React.Component<{}, IMainState> {
  state: IMainState = { searchValue: '' };

  // This function updates the state with the search results of the user query
  searchBeers = (query: string): void => {
    const beerSearchPromise = getBeerSearchResults(query);
    const beerRandomPromise = getBeerRandom();

    beerSearchPromise
      .then((payload: IPunkApiPayload[]) => {
        const beerResults = filterPayload(payload);

        // if the query returned a list of results update the state
        this.setState({ beerResults: beerResults });
        
        // if the query returned no matched beers, return a random beer
        if (!beerResults.length) {
          return beerRandomPromise;
        }
      })
      .then((payload: IPunkApiPayload[] | undefined) => {

        // update the state with a random beer
        if (payload) {
          const randomBeerResult = filterPayloadSingle(payload);
          this.setState({ randomBeer: randomBeerResult });
        }
      })
  };

  queryChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  searchSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    this.setState({ searchQuery: this.state.searchValue });
    this.searchBeers(this.state.searchValue);
  };

  render() {
    return (
      <div className='app-col'>
        <div className='app-container'>
          <h1 className='app-title'>Parched.</h1>
          <div className='description'>
            <p>Enter a dish or ingredient below to find Brew Dog beer pairings!</p>
            <p>Data provided by PunkAPI</p>
          </div>
          <div>
            <form onSubmit={this.searchSubmitHandler}>
              <label>
                <input
                  type='text'
                  value={this.state.searchValue}
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
                  <h2 className='results-header'>Search Results for "{this.state.searchQuery}"</h2>
                  {this.state.beerResults.map((beerObj, ndx) => {
                    return (
                      <BeerCard
                        key={ndx}
                        name={beerObj.name}
                        tagline={beerObj.tagline}
                        description={beerObj.description}
                        imageUrl={beerObj.imageUrl}
                        abv={beerObj.abv}
                        foodPairing={beerObj.foodPairing}
                      />
                    );
                  })
                  }
                </div>
              )
              : this.state.beerResults && this.state.randomBeer ? 
              (
                <div className='search-results'>
                  <h2 className='results-header'>No Results Found for "{this.state.searchQuery}"- Displaying Random Beer</h2>
                  <BeerCard
                    name={this.state.randomBeer.name}
                    tagline={this.state.randomBeer.tagline}
                    description={this.state.randomBeer.description}
                    imageUrl={this.state.randomBeer.imageUrl}
                    abv={this.state.randomBeer.abv}
                    foodPairing={this.state.randomBeer.foodPairing}
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