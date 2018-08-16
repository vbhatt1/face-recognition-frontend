import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const particlesParam = {
    particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
    }
}

const initialState = {
  textfield:"",
  imageurl:"",
  box:{},
  route: 'signin',
  signedin: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
    }
}
class App extends Component {
  constructor() {
    super()
    this.state = initialState;
  }

  onTextChange = (event) => {
    this.setState({textfield: event.target.value})
}

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const imageDim = document.getElementById("face");
    const height = Number(imageDim.height);
    const width = Number(imageDim.width);
    return {
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onSubmit = () => {
    this.setState({imageurl: this.state.textfield})
    fetch('https://whispering-wildwood-81639.herokuapp.com/imageurl',{
        method: 'post',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        textfield: this.state.textfield
        })
      })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://whispering-wildwood-81639.herokuapp.com/image',{
        method: 'put',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
        id: this.state.user.id
        })
      })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user,{entries: count}))
        })
        .catch(console.log)
    }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })
    .catch(err => console.log(err));
  }

  onStatusChange = (route) => {
    if (route === "signout") {
      this.setState(initialState)
    } else if (route === "home") {
      this.setState({signedin: true})
    }
    this.setState({route: route}) 
  }

  onLoadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }});
  }

  render() {
    const {signedin,box,imageurl,route} = this.state;
    return (
      <div className="App">
        <Particles className="particles"
              params={particlesParam}
            />
        <Navigation isSignedIn={signedin} statuschange={this.onStatusChange}/>
        {
          route === "home" 
          ? <div>
              <Logo />
              <Rank name={this.state.user.name} entries={this.state.user.entries}/>
              <ImageLinkForm textchange={this.onTextChange} buttondetect={this.onSubmit}/>
              <FaceRecognition box={box} imagelink={imageurl}/>
            </div>
          : (
              route === "signin"
              ? <Signin statuschange={this.onStatusChange} loadUser={this.onLoadUser}/>
              : <Register statuschange={this.onStatusChange} loadUser={this.onLoadUser}/>
            )
        }
        
      </div>
    );
  }
}

export default App;
