import React,{Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import {DISHES} from '../shared/dishes';
import DishDetail from './DishDetail';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';


class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes:DISHES,
    }
  }

 

  render() {

    const Homepage=() => {
        return(
            <Home/>
        );
    }

    return (
      <div>
        <Header/>
        <Switch>
            <Route path="/home" component={Homepage}></Route>
            <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes}/>}></Route>
            <Redirect to="/home"></Redirect>
        </Switch>
        <Footer/>
      </div>
    );
  }
  
}

export default Main;
