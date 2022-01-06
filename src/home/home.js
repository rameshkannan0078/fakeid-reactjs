import { Component } from "react";
import Typewriter from "typewriter-effect";

import phone3d from './images/phone3d.png';

import "./home.css";
import {Container,Nav, Navbar,Carousel} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap/dist/js/bootstrap.min.js";
import "bootstrap/js/src/collapse.js";
import rio from "./images/rio.jpeg";
import rio2 from "./images/rio2.jpeg";
import rio3 from "./images/rio3.jpeg";
import fire from "../config/fire";


class home extends Component{
     

  constructor(props){
    super(props);
    this.state={
      homelink:""
    }
  
  }

  updateInput = e => {
    this.setState({
      [e.target.name] : e.target.value,
     
    })
  }
    handle = () =>{
        this.props.history.push('/login');
    }

    GotoLogin=()=>{
        this.props.history.push("/login");
    }

    checkLink = (e)=>{
      e.preventDefault();
      var pass=this.state.homelink;
      const db = fire.firestore();
      db.collection("fakelink").get().then(snap => {
    snap.forEach(doc => {
      var data=doc.data().link;
      if(pass===data){
        alert("Match Found");
      }
    });
});    

    }



    render(){
        return(
            <div  className="homemainpage">
             <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed="top" className="Navbar">
  <Container>
  <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto">
    <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#socialmedia" class="hover-line">Social Medias</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#aboutus">About Us</Nav.Link>
      <Nav.Link href="#contactus">Contact Us</Nav.Link>
    </Nav>
  </Navbar.Collapse>
  </Container>
</Navbar>
<div className="home-search-top">
<div className="home-search-top-inside">
  <form onSubmit={this.checkLink}>
  <input type="text" name="homelink" placeholder="Enter the Link" onChange={this.updateInput} value={this.state.homelink}>
  </input><br></br>
  <button>Submit</button>
  </form>
</div>
</div>
            <div className="homepage" id="home"><div className="imgbox"></div>
            <div class="row1">
            <div class="column">
            <div className="typewriter" >
            <Typewriter 
             options={{
                strings: ['Lets get the search,<br> Before it is Too Late.'],
            
                autoStart: true,
                loop: true,
              }}
  />
             </div>
             <p>We are here to secure your online Accounts <br></br>
       from various Cyber Threads takes in occuures<br></br>
       day to day life </p><br></br>
       <button className="click-to-start" onClick={this.GotoLogin}>Click To Start</button>
  </div>
 
</div>
            </div>
               

             
            <div className="medias-img-box" id="socialmedia">
            <img src={phone3d} alt="Medias"/>
            </div>



            <div className="social-box" id="features">
           <div className="social-box-mobimg">
            <div className="social-box-text">
                <p><b>"Prevention Is Better Than Cure."</b></p><br></br>
                <p>We can provide 24hrs customer Support
                Our Main goal is to protect you from,
                multiple cyber attacks.You already,
                aware there are lots of cyberAttacks
                done by 'FAKE_IDS'.<br></br>

                1.)we can find the fake ids.<br></br>
                2.)we will help you to take proper Actions.<br></br>
                3.)we will update within 48hrs.<br></br>
                </p>
             </div>
            </div>
            </div>


        <div className="curosel-box">
        <div className="about-box" id='aboutus'>
         
        <Carousel>
        <Carousel.Item interval={1500}>
          <img className="d-block" src={rio} alt="One" />
          <Carousel.Caption>
            <h3>Label for first slide</h3>
            <p>Sample Text for Image One</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block"
src={rio2}
            alt="Two"
          />
          <Carousel.Caption>
            <h3>Label for second slide</h3>
            <p>Sample Text for Image Two</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={500}>
          <img className="d-block"
src={rio3}
            alt="Two"
          />
          <Carousel.Caption>
            <h3>Label for Third Slide</h3>
            <p>Sample Text for Image Three</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      </div>


        </div>

        <div className="contactus-box" id="contactus">

        </div>

      
        </div>
        );
    }

}
export default home;