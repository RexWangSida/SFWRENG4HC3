import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Navbar, Row, Nav, Jumbotron, Container, ListGroupItem, ListGroup, Card, Col, Form, Table } from 'react-bootstrap';
import {HashRouter as Router, Route, Link, NavLink} from 'react-router-dom';
// Install the socket io client using:
//    npm install socket.io
//
// Then import socket io and create a socket:
//
import io from 'socket.io-client';
const socket = io('http://localhost:3001');
//
// See: https://socket.io/get-started/chat
//      https://www.npmjs.com/package/socket.io-client

//nav link style
const navLinkCSS = {
  color:"white",
  marginLeft:"20px",
  marginRight:"20px",
  fontSize: "24px",
  fontWeight: "500",
};


class Home extends React.Component {
  render ()
  {
    return (
      <Container style={{marginTop:"100px",}}>
        <Jumbotron>
          <h3>&#8226; This website collects social media posts resulting from a disaster and displays them on the <b>Live Feed page</b>.</h3>
          <h3>&#8226; There is a dashboard on the <b>Analytics page</b>, one which shows the analysis of those social media posts.</h3>
        </Jumbotron>
      </Container>
    );
  }
}

class LiveFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checkboxFire : true,
      checkboxFlood : true,
      checkboxPower : true,
      checkboxMedical : true,
      checkboxLow : true,
      checkboxMedium : true,
      checkboxHigh : true,
      checkboxCritical : true,
    }


}



  render ()
  {
    var postToRender = this.props.posts;
    if(!this.state.checkboxFire){
      postToRender = postToRender.filter( post => post.problem !== "Fire");
    }
    if(!this.state.checkboxFlood){
      postToRender = postToRender.filter( post => post.problem !== "Flood");
    }
    if(!this.state.checkboxPower){
      postToRender = postToRender.filter( post => post.problem !== "Power");
    }
    if(!this.state.checkboxMedical){
      postToRender = postToRender.filter( post => post.problem !== "Medical");
    }
    if(!this.state.checkboxLow){
      postToRender = postToRender.filter( post => post.priority !== "Low");
    }
    if(!this.state.checkboxMedium){
      postToRender = postToRender.filter( post => post.priority !== "Medium");
    }
    if(!this.state.checkboxHigh){
      postToRender = postToRender.filter( post => post.priority !== "High");
    }
    if(!this.state.checkboxCritical){
      postToRender = postToRender.filter( post => post.priority !== "Critical");
    }
    return (
      <div style={{marginTop:"20px",}}>
        <Row className="justify-content-center">
        <h3>Filter Posts by Category:  &nbsp; </h3>
        <Form style={{marginTop:"8px"}}>
          <Form.Row>
            <Col>
            <Form.Check
            type="checkbox"
            label="Fire"
            defaultChecked={this.state.checkboxFire}
            onChange={(event) => this.setState({ checkboxFire : !this.state.checkboxFire, })}
            />
            </Col>
            <Col>
              <Form.Check
              type="checkbox"
              label="Flood"
              defaultChecked={this.state.checkboxFlood}
              onChange={(event) => this.setState({ checkboxFlood : !this.state.checkboxFlood, })}
              />
            </Col>
            <Col>
              <Form.Check
              type="checkbox"
              label="Power"
              defaultChecked={this.state.checkboxPower}
              onChange={(event) => this.setState({ checkboxPower : !this.state.checkboxPower, })}
              />
            </Col>
            <Col>
              <Form.Check
              type="checkbox"
              label="Medical"
              defaultChecked={this.state.checkboxMedical}
              onChange={(event) => this.setState({ checkboxMedical : !this.state.checkboxMedical, })}
              />
            </Col>
          </Form.Row>
        </Form>
        </Row>
        <Row>
        <hr />
        </Row>
        <Row className="justify-content-center">
        <h3>Filter Posts by Priority:  &nbsp; </h3>
        <Form style={{marginTop:"8px"}}>
          <Form.Row>
            <Col>
              <Form.Check
              type="checkbox"
              label="Low"
              defaultChecked={this.state.checkboxLow}
              onChange={(event) => this.setState({ checkboxLow : !this.state.checkboxLow, })}
              />
            </Col>
            <Col>
              <Form.Check
              type="checkbox"
              label="Medium"
              defaultChecked={this.state.checkboxMedium}
              onChange={(event) => this.setState({ checkboxMedium : !this.state.checkboxMedium, })}
              />
            </Col>
            <Col>
              <Form.Check
              type="checkbox"
              label="High"
              defaultChecked={this.state.checkboxHigh}
              onChange={(event) => this.setState({ checkboxHigh : !this.state.checkboxHigh, })}
              />
            </Col>
            <Col>
              <Form.Check
              type="checkbox"
              label="Critical"
              defaultChecked={this.state.checkboxCritical}
              onChange={(event) => this.setState({ checkboxCritical : !this.state.checkboxCritical, })}
              />
            </Col>
          </Form.Row>
        </Form>
        </Row>
        <Row>
        <hr />
        </Row>
        {postToRender.map(
          ({name,image,content,problem,priority,id}) =>
            <Row key={id} className="justify-content-center">
              <Jumbotron style={{width:"800px"}}>
                <div key={id}>
                  <img src={image} alt="{name}" style={{objectFit:"contain"}}/> <br />

                  <br />
                    <b>Name: </b>{name} <br />
                    <b>Problem Category: </b>{problem} <br />
                    <b>Priority Level: </b>{priority} <br />
                    <b>Content: </b>{content} <br />
                </div>
              </Jumbotron>
            </Row>
          )}
      </div>
    );
  }
}

class Analytics extends React.Component {
  constructor(props) {
    super(props);

  }

  render ()
  {
    return (
      <div style={{marginTop:"40px",}}>
      <Row className="justify-content-center">
        <h3>Posts Summary</h3>
      </Row>
      <Row className="justify-content-center">
      <Container>
      <Table bordered hover style={{marginTop:"40"}}>
      <thead>
        <tr>
          <th></th>
          <th>Fire</th>
          <th>Flood</th>
          <th>Power</th>
          <th>Medical</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Low</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Low").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Low").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Low").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Low").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Low").length + this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Low").length + this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Low").length + this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Low").length}</td>
        </tr>
        <tr>
          <td>Medium</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Medium").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Medium").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Medium").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Medium").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Medium").length + this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Medium").length + this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Medium").length + this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Medium").length}</td>
        </tr>
        <tr>
          <td>High</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "High").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "High").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "High").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "High").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "High").length + this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "High").length + this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "High").length + this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "High").length}</td>
        </tr>
        <tr>
          <td>Critical</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Critical").length + this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Critical").length + this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Critical").length + this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Critical").length}</td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Low").length + this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Medium").length + this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "High").length + this.props.posts.filter( post => post.problem === "Fire").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Low").length + this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Medium").length + this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "High").length + this.props.posts.filter( post => post.problem === "Flood").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Low").length + this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Medium").length + this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "High").length + this.props.posts.filter( post => post.problem === "Power").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Low").length + this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Medium").length + this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "High").length + this.props.posts.filter( post => post.problem === "Medical").filter( post => post.priority === "Critical").length}</td>
          <td>{this.props.posts.length}</td>
        </tr>
      </tbody>
      </Table>
      </Container>
      </Row>
      </div>
    );
  }
}
class App extends React.Component {

  constructor(props) {
    super(props);

    // An array of social media posts messages, and we'll increment nextID
    // to maintain a unique ID for each post in our array
    this.state = {posts: [],nextID: 0};

    // We can setup the event handlers for the messages in the constructor...
    socket.on('connect', function(){

      console.log("Connect....");

      // When we receive a social media message, call setState and insert
      // it into the array of posts
      socket.on('post',

        function(data) {

          // Can uncomment this to see the raw data coming in...
          // console.log("post: " + JSON.stringify(data));

          // increment the next unique ID, and put post data into the list of
          // posts... use the '...' syntax to make this insertion easier:
          // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
          this.setState(
            {posts: [...this.state.posts,
                     {name: data.name,
                      image: data.image,
                      content: data.content,
                      problem: data.problem,
                      priority: data.priority,
                      id: this.state.nextID}]
            ,nextID: this.state.nextID + 1} );
        }.bind(this));
        // ^^ Like other event handlers, we bind the callback function to the
        // component so we can use setState

    }.bind(this));
    // ^^ ... And same with the callback function for when a connection is made

  }

  // Output all the posts into a table
  render() {
    return (
      <Router>

        <Navbar bg="dark" expand="lg" sticky="top" variant="dark">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto justify-content-end">
              <NavLink exact activeClassName="active" to="/" style={navLinkCSS}>Home</NavLink>
              <NavLink exact activeClassName="active" to="/liveFeed" style={navLinkCSS}>Live Feed</NavLink>
              <NavLink exact activeClassName="active" to="/analytics" style={navLinkCSS}>Analytics</NavLink>
            </Nav>
          </Navbar.Collapse>
        </Navbar>

        <Route exact path="/" component={Home} />
        <Route exact path="/liveFeed" exact render = {(props) => <LiveFeed{...props} posts = {this.state.posts}/>  }/>
        <Route exact path="/analytics" exact render = {(props) => <Analytics{...props} posts = {this.state.posts}/>  }/>
      </Router>
    );
  }
}

export default App;
