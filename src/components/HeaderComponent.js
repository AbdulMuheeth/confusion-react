import React, { Component } from 'react';
import {Jumbotron, Navbar,Nav,NavbarToggler,Collapse, NavItem, NavbarBrand} from 'reactstrap';
import {NavLink} from 'react-router-dom';

export default class Header extends Component {

    constructor(props){
        super();
        this.state ={
            isNavOpen : false
        }
        this.toggleNav = this.toggleNav.bind(this);
    }

    toggleNav(){
        this.setState({
            isNavOpen: !this.state.isNavOpen
        })
    }

    render() {
        return (
            <>
                <Navbar dark expand="md">
                    <div className="container row">
                        <NavbarToggler onClick={this.toggleNav}/> {/*Here no parenthesis/ no arrow function is given because of the .bind(this) in constructor*/}
                        <NavbarBrand className="ml-auto" href="/">
                            <img src="assets/images/logo.png" height="30" width="41" alt="Ristorante Con Fusion"/>
                        </NavbarBrand>
                        <Collapse isOpen={this.state.isNavOpen} className="collapse navbar-collapse">
                        <Nav className="ml-auto">
                                <NavItem  className="navbar-nav">
                                    <NavLink className="nav-link" to="/home"> <span className="fa fa-home fa-lg"></span> Home</NavLink>
                                    <NavLink className="nav-link" to="/aboutus"> <span className="fa fa-info fa-lg"></span> Aboutus</NavLink>
                                    <NavLink className="nav-link" to="/menu"> <span className="fa fa-list fa-lg"></span> Menu</NavLink>
                                    <NavLink className="nav-link" to="/contactus"> <span className="fa fa-address-card fa-lg"></span> Contact us</NavLink>
                                </NavItem>
                        </Nav>    
                        </Collapse>
                        


                    </div>
                </Navbar>

                <Jumbotron>
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                                <h1>Ristorante con Fusion</h1>
                                <p>We take inspiration from the World's best cuisines, and create a unique fusion experience. Our lipsmacking creations will tickle your culinary senses!</p>
                            </div>
                        </div>

                    </div>
                </Jumbotron>
            </>
        )
    }
}
