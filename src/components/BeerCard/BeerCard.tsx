import * as React from 'react';
import './BeerCard.scss';

export interface IBeerCard {
  name: string;
  tagline: string;
  description: string;
  imageUrl: string;
  abv: number;
}

export class BeerCard extends React.Component<IBeerCard, {}> {

    render() {
      return (
        <div className='beer-card'>
          <div className='card-info'>
            <h1>{this.props.name}</h1>
            <p>{this.props.abv}% abv | {this.props.tagline}</p>
            <p className='card-description'>{this.props.description}</p>
          </div>
          <img className='result-image' src={this.props.imageUrl} alt='beer image'></img>
        </div>
      );

   }
}