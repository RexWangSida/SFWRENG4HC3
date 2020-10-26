import React from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button,Table, Container, Row, Col, Form, ListGroup} from 'react-bootstrap';

const categoryCSS = {
  width: "28%",
  height: "100%",
  backgroundColor: "#111",
  position:"fixed",
  zIndex:"1",
  top:"0",
  left:"0",
  overflowX:"hidden",
  paddingTop:"20px"
};
const itemCSS = {
  marginLeft:categoryCSS.width,
  padding: "0px 10px",
};

class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      categories:[],
      items: [],
      nextCat: 0,
      nextItem: 0,
      categoryDisplay : "", //the category name currently being selected
      categorySelected : -1, //the category index currently being selected
      catInput: "", //category input in the box
      itemsDisplay:[], //the items currently being displayed

      itemInN: "", //add item input name in the box
      itemInP: "",  //add item input priority in the box
      itemInDate: "", //add item input date in the box
      itemInDesc: "", //add item input description in the box

      itemInN1: "", //modify item input name in the box
      itemInP1: "",  //modify item input priority in the box
      itemInDate1: "", //modify item input date in the box
      itemInDesc1: "", //modify item input description in the box

      itemSelected: -1,//the item id currently being selected
      itemDisplay : "", //the item name is currently displayed beside modify/delete
    }
  }

  addCat(){


    this.setState({
      nextCat : this.state.nextCat+1,
      categories: [...this.state.categories,{index: this.state.nextCat, name:this.state.catInput}],
      categoryDisplay : this.state.catInput,
      categorySelected: this.state.nextCat,
      itemsDisplay:[],
    })


  }

  changeCat(catIndex){
    var sorted = this.state.items.filter(({id, name, priority, date,desc,cid}) => cid === catIndex);
    this.sortItem(sorted);
    this.setState({
      categoryDisplay : this.state.categories.filter(({index, name}) => index === catIndex)[0].name,
      categorySelected : catIndex,
      itemsDisplay: sorted,
    });



  }

  deleteCat(){ //only allow detele category when category is selected
    if(this.state.categorySelected >= 0){
      this.setState({
        categories: this.state.categories.filter( ({index,name}) => index !== this.state.categorySelected),
        categoryDisplay : "",
        categorySelected : -1,
        items: this.state.items.filter(({id, name, priority, date,desc,cid}) => cid !== this.state.categorySelected),
        itemsDisplay: [],
      })
    }
  }

  addItem(){
    if(this.state.categorySelected >= 0){ //only allow add item when category is selected
      var sorted = [...this.state.itemsDisplay, {id: this.state.nextItem, name: this.state.itemInN, priority: this.state.itemInP, date: this.state.itemInDate, desc:this.state.itemInDesc, cid: this.state.categorySelected}];
      if(this.state.itemInP == "") { alert("You must enter a priority")}
      else{
      this.sortItem(sorted);
      }
      this.setState({
          nextItem: this.state.nextItem + 1,
          items: [...this.state.items, {id: this.state.nextItem, name: this.state.itemInN, priority: this.state.itemInP, date: this.state.itemInDate, desc:this.state.itemInDesc, cid: this.state.categorySelected}],
          itemsDisplay: sorted,
      })
    }
  }

  selectItem(itemID){
    this.setState({
      itemDisplay: this.state.items.filter(({id, name, priority, date,desc,cid}) => id === itemID)[0].name,
      itemSelected: itemID,
    })
  }

  modifyItem(){
    if(this.state.itemSelected >= 0){ //only allow modify item when an item is selected
      var updatedItem = {id: this.state.itemSelected, name: this.state.itemInN1, priority: this.state.itemInP1, date:this.state.itemInDate1, desc: this.state.itemInDesc1, cid: this.state.categorySelected};// create a new item with updates
      //
      //update in items
      //
      var index = this.state.items.findIndex(({id, name, priority, date,desc,cid}) => id === this.state.itemSelected);
      var updatedItems = this.state.items;
      updatedItems[index] = updatedItem;
      //
      //update in itemsDisplay
      //
      var index1 = this.state.itemsDisplay.findIndex(({id, name, priority, date,desc,cid}) => id === this.state.itemSelected);
      var updatedItems1 = this.state.itemsDisplay;
      updatedItems1[index1] = updatedItem;
      if(this.state.itemInP == "") { alert("You must enter a priority")}
      else{
        this.sortItem(updatedItems1);
      }
      this.setState({
          items: updatedItems,
          itemsDisplay: updatedItems1,
          itemDisplay: updatedItem.name,
      })
    }
  }

  deleteItem(){
    if(this.state.itemSelected >= 0){ //only allow delete item when an item is selected
      var sorted = this.state.itemsDisplay.filter(({id, name, priority, date,desc,cid}) => id !== this.state.itemSelected);
      this.sortItem(sorted);
      this.setState({
        items: this.state.items.filter(({id, name, priority, date,desc,cid}) => id !== this.state.itemSelected),
        itemsDisplay: this.state.itemsDisplay.filter(({id, name, priority, date,desc,cid}) => id !== this.state.itemSelected),
        itemSelected : -1,
        itemDisplay: "",
      })
    }
  }
  sortItem(items){
    items.sort(
      (a,b) => {
        return parseInt(a.priority, 10) - parseInt(b.priority, 10);
      }
    )
  }


  render(){
      return (
        <div className="App">
          <div style={categoryCSS}>
            <Row className="justify-content-md-center">
                <Form>
                  <Form.Group controlId="formBasicEmail" style={{marginTop:"40px"}}>
                    <Form.Label style={{color:"white"}}>Add a New Category</Form.Label>
                    <Form.Control onChange={(event) => this.setState({ catInput: event.target.value })} type="category" placeholder="Enter Category Here" />
                    <Form.Text className="text-muted" style={{color:"white"}}>Once you submit the category, it will be automatically selected.</Form.Text>
                  </Form.Group>
                  <Button onClick={this.addCat.bind(this) } variant="light">Submit</Button>
                </Form>

                <br />
                <hr />
            </Row>
            <Row className="justify-content-md-center">
                <h3 style={{color:"white"}}>Click to select a category:</h3>
            </Row>
            <Row className="justify-content-md-center">
              <ListGroup>
                {this.state.categories.map(
                    ({name,index, items}) =>
                    <ListGroup.Item key={index}>
                      <Button onClick={this.changeCat.bind(this, index)} variant="secondary" size="sm">
                        {name}
                      </Button>
                    </ListGroup.Item>
                )}
              </ListGroup>
            </Row>
          </div>





















          <div style={itemCSS}>
            <Container style={{margin:"20px"}}>
              <Row>
                <Col xs={9} float="left" style={{display:"flex"}}>
                  <h3 style={{color:"black"}}><b>Current Category: {this.state.categoryDisplay}</b></h3>
                </Col>
                <Col float="right" >
                  <Button variant="danger" onClick={this.deleteCat.bind(this)}>Delete Category</Button>
                </Col>
              </Row>
              <Row>
                <hr style={{color:"black", width:"100%"}} />
                <h4 style={{color:"black"}}>Add an Item:</h4>
              </Row>
              <Row className="justify-content-md-center">
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Enter Item Priority:</Form.Label>
                        <Form.Control onChange={(event) => this.setState({ itemInP: event.target.value })} placeholder="Priority*" />
                        <Form.Text className="text-muted">You must enter an integer priority, leave 0 if you don't need priority.</Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Enter Item Name:</Form.Label>
                        <Form.Control onChange={(event) => this.setState({ itemInN: event.target.value })} placeholder="Item Name" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Enter Date:</Form.Label>
                        <Form.Control onChange={(event) => this.setState({ itemInDate: event.target.value })} placeholder="(20XX-XX-XX)" />
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
                      <Form.Group>
                        <Form.Label>Enter Item Description:</Form.Label>
                        <Form.Control onChange={(event) => this.setState({ itemInDesc: event.target.value })} placeholder="Description" />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Button variant="dark" onClick={this.addItem.bind(this)} style={{marginTop:"20px"}}>Add</Button>
                    </Col>
                  </Row>
                </Form>
                <hr style={{color:"black", width:"100%"}} />
              </Row>
              <Row>
                <Table striped bordered hover style={{marginRight:"20px"}}>
                  <thead>
                    <tr>
                      <th>Priority</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Description</th>
                      <th>Select</th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.itemsDisplay.map(
                      ({id, name, priority, date, desc}) =>
                        <tr key={id}>
                          <td>{priority}</td>
                          <td>{name}</td>
                          <td>{date}</td>
                          <td>{desc}</td>
                          <td><Button onClick={this.selectItem.bind(this, id)} variant="dark">Select</Button></td>
                        </tr>
                    )}
                  </tbody>
                </Table>
              </Row>
              <Row>
                <hr style={{color:"black", width:"100%"}} />
                <h4 style={{color:"black"}}>Modify/Delete Item: {this.state.itemDisplay}</h4>
              </Row>
              <Row className="justify-content-md-center">
                <Form>
                  <Row>
                    <Col>
                      <Form.Group>
                        <Form.Label>Modify Item Priority:</Form.Label>
                        <Form.Control placeholder="Priority*" onChange={(event) => this.setState({ itemInP1: event.target.value })}/>
                        <Form.Text className="text-muted">You must enter an integer priority, leave 0 if you don't need priority.</Form.Text>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Modify Item Name:</Form.Label>
                        <Form.Control placeholder="Item Name" onChange={(event) => this.setState({ itemInN1: event.target.value })}/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group>
                        <Form.Label>Modify Date:</Form.Label>
                        <Form.Control placeholder="(20XX-XX-XX)" onChange={(event) => this.setState({ itemInDate1: event.target.value })}/>
                      </Form.Group>
                    </Col>
                    <Col xs={3}>
                      <Form.Group>
                        <Form.Label>Modify Item Description:</Form.Label>
                        <Form.Control placeholder="Description" onChange={(event) => this.setState({ itemInDesc1: event.target.value })}/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Button variant="dark" onClick={this.modifyItem.bind(this)}>Save</Button>
                      <br />
                      <Button variant="danger" onClick={this.deleteItem.bind(this)}style={{marginTop:"20px"}}>Delete</Button>
                    </Col>
                  </Row>
                </Form>
              </Row>
            </Container>
          </div>
        </div>
      );
    }
  }
export default App;
