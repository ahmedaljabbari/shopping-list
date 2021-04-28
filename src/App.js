import { React, Component } from "react";
import NavBar from "./components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Table, Button, Modal, Fade, ModalHeader, ModalBody, ModalFooter } from "reactstrap";


import "./App.css";

class App extends Component {
  state = {
    myList: [],
    modal:false,
    productName: "",
    productAntal: "",
    fadeIn: true
  };

  toggle = () => {
    this.setState({
      ...this.state,
      modal: !this.state.modal
    })
  }

  setInputName = (e) => {
    this.setState({
      ...this.state,
      productName:e.target.value
    })
  };

  setInputAntal = (e) => {
    this.setState({
      ...this.state,
      productAntal:e.target.value
    })
  };

  handleAdd = () => {
    axios({
      method: 'post',
      url: '/product',
      data: {
        name: this.state.productName,
        antal: parseInt(this.state.productAntal)
      }
    }).then(res => {
      axios.get('/products').then(res => {
        this.setState({
          ...this.state,
          myList: res.data
        })
      })
    });
    this.toggle();
  }

  handleRemove = (id) => {
    axios.delete(`/product/${id}`).then((res) => {  
      axios.get('/products').then(res => {
        this.setState({
          ...this.state,
          myList: res.data
        })
      })
    })  
    
  }
  componentDidMount() {
    axios.get('/products').then(res => {
      console.log(res.data)
      this.setState({
        myList: res.data
      })
    })
  }

  render() {
    return (
      <div className="App">
        <NavBar />
        <Table dark id="mainTable">
          <thead>
            <tr>
              <th>#</th>
              <th>Product</th>
              <th>Quantity</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {this.state.myList.map((item, index) => {
                return(
                  <Fade in={this.state.fadeIn} tag="tr" key={index}>
                    <th scope="row">{index + 1}</th>
                    <td><b>{item.name}</b></td>
                    <td>{item.antal}</td>
                    <td onClick={this.handleRemove.bind(this, item._id)}><i className="fa fa-remove" style={{fontSize:"35px",color:"red"}}></i></td>
                  </Fade>
                )
              })
            }
          </tbody>
        </Table>

        <button id="btn_ADD" onClick={this.toggle}>
          <i className="fa fa-plus" style={{ fontSize: "40px" }}></i>
        </button>


        <Modal isOpen={this.state.modal} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add Product</ModalHeader>
          <ModalBody>
            <input type="text" placeholder="Name" onChange={this.setInputName} required></input>
            <br />
            <br />
            <input
              required
              type="text"
              placeholder="Quantity"
              onChange={this.setInputAntal}
            ></input>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.handleAdd}>Add</Button>{" "}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default App;
