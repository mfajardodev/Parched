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
        <div data-component='beer-card'>
          <h1>{this.props.name}</h1>
          <p>{this.props.abv}</p>
          <img src={this.props.imageUrl}></img>
          <p>{this.props.tagline}</p>
          <p>{this.props.description}</p>

        </div>
      );

   }
}