import React, { Component } from 'react';
import axios from 'axios';

class Uploader extends Component {
  //'../public/Images/prasad.jpg' //
  state = {
    imageUrl: 'https://placeimg.com/320/320/animals' 
  }
  
  handleUploadFile = (event) => {
    const data = new FormData()
    data.append('file', event.target.files[0])
    data.append('name', 'some value user types')
    data.append('description', 'some value user types')
    axios.post('/files', data).then((response) => {
      debugger;
      var file_name = response.data.fileUrl
      if(file_name === undefined){
        file_name = 'files/' + response.data.originalname
      }
      this.setState({
        imageUrl: file_name
      })
    })
  }
    
  render() {
    debugger;
    return(
      <div>
        {/* <img src="files/prasad.jpg" /> */}
        <img width='320' src={this.state.imageUrl} />
        <div>
          <input type="file" onChange={this.handleUploadFile} />
        </div>  
      </div>
    )
  }
}

export default Uploader