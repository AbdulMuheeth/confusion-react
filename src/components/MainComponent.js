import React,{Component} from 'react';
import Menu from './MenuComponent';
import Home from './HomeComponent';
import DishDetail from './DishDetail';
import Contact from './ContactComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch,Route,Redirect,withRouter} from 'react-router-dom';
import About from './AboutComponent';
import {connect} from 'react-redux';
import {addComment} from '../redux/ActionCreators';

const mapStateToProps = state =>{
  return {
    dishes : state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders:state.leaders

  }
}

//useSelector alternative I think
const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId,rating,author,comment) => dispatch(addComment (dishId,rating,author,comment))
  //dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change
})

class Main extends Component {

  constructor(props){
    super(props);

    
  }

 

  render() {

    const Homepage=() => {
        return(
            <Home dish={this.props.dishes.filter((dish)=> dish.featured)[0]}
                promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
                leader={this.props.leaders.filter((lead)=> lead.featured)[0]}
            />
        );
    }

    const DishWithId = ({match}) =>{
            console.log(this.props.comments.filter((comment)=>comment.dishId == parseInt(match.params.dishId,10))) 
          return(
            <DishDetail dish={this.props.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                comments={this.props.comments.filter((comment)=>comment.dishId == parseInt(match.params.dishId,10))}
                addComment={this.props.addComment}
            />
        );
    }


    return (
      <div>
        <Header/>
        <Switch>
            <Route path="/home" component={Homepage}></Route>
            <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/>}></Route>
            <Route path="/menu/:dishId" component={DishWithId}/>
            <Route path="/aboutus" component={() => <About leaders={this.props.leaders}/>}/>
            <Route exact path="/contactus" component={Contact}></Route>
            <Redirect to="/home"></Redirect>
        </Switch>
        <Footer/>
      </div>
    );
  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
