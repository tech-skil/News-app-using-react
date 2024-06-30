import React, { Component } from 'react';
import spinner from "../assets/loader.gif"

export default class Loading extends Component {
  render() {
    return (
      <div className='flex items-center justify-center mt-20'>
        <img src={spinner} alt="..." className='' />
      </div>
    )
  }
}
