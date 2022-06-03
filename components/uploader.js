import React, { Component } from 'react';
import axios from 'axios';

class Uploader extends Component {
  state = {
  }
  
  handleUploadFile = (event) => {
   //not in use
  }
    
  render() {
    return(
      <div>
        <img width='320' src={this.state.imageUrl} />
        <div>
        </div>  
      </div>
    )
  }
}

export default Uploader
