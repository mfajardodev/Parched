import * as React from 'react';
import './BeerCard.scss';

export interface IBeerCard {
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  abv: number;
  foodPairing: string;
}

export class BeerCard extends React.Component<IBeerCard, {}> {

    render() {
      return (
        <div className='beer-card'>
          <div className='card-info'>
            <h1 className='beer-name'>{this.props.name}</h1>
            <p className='beer-stats'>{this.props.abv}% abv | {this.props.tagline}</p>
            <p className='card-description'>{this.props.description}</p>
            <p className='food-pairs'>Pairs well with: {this.props.foodPairing}</p>
            <button className='popup-btn'>See Image</button>
          </div>
          <img className='result-image' src={this.props.imageUrl} alt='beer image'></img>
        </div>
      );

   }
}