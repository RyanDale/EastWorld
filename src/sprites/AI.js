import Phaser from 'phaser'
import Player from './Player'
import Waypoint from '../classes/Waypoint'

export default class AI extends Player {

  constructor (game, asset, frame=null) {
    let position = Waypoint.randomWalkable().position;
    super(game, position.x, position.y, asset, frame);
    this.anchor.setTo(0.5);
  }

}

