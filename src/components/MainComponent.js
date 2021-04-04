import React,{Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import {DISHES} from '../shared/dishes';
import {COMMENTS} from '../shared/comments';
import {PROMOTIONS} from '../shared/promotions';
import {LEADERS} from '../shared/leaders';
import DishDetail from './DishDetail';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect} from 'react-router-dom';
import { timeoutsShape } from 'reactstrap';


class Main extends Component {

  constructor(props){
    super(props);

    this.state = {
      dishes:DISHES,
      comments:COMMENTS,
      promotions:PROMOTIONS,
      leaders:LEADERS
    }
  }

 

  render() {

    const Homepage=() => {
        return(
            <Home dish={this.state.dishes.filter((dish)=> dish.featured)[0]}
                promotion={this.state.promotions.filter((promo)=> promo.featured)[0]}
                leader={this.state.leaders.filter((lead)=> lead.featured)[0]}
            />
        );
    }

    const DishWithId = ({match}) =>{
            console.log(this.state.comments.filter((comment)=>comment.dishId == parseInt(match.params.dishId,10))) 
          return(
            <DishDetail dish={this.state.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.state.comments.filter((comment)=>comment.dishId == parseInt(match.params.dishId,10))}
            />
        );
    }


    return (
      <div>
        <Header/>
        <Switch>
            <Route path="/home" component={Homepage}></Route>
            <Route exact path="/menu" component={()=> <Menu dishes={this.state.dishes}/>}></Route>
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route exact path="/contactus" component={Contact}></Route>
            <Redirect to="/home"></Redirect>
        </Switch>
        <Footer/>
      </div>
    );
  }
  
}

export default Main;
