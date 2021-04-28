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
import {addComment,fetchDishes} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';

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
  addComment: (dishId,rating,author,comment) => dispatch(addComment (dishId,rating,author,comment)),
  //dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change
  fetchDishes : () => dispatch(fetchDishes()),
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))}
})

class Main extends Component {

  constructor(props){
    super(props);

    
  }

 componentDidMount(){
   //this is invoked right after the component is mounted into the screen

   this.props.fetchDishes();
 }

  render() {

    const Homepage=() => {
        return(
            <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo)=> promo.featured)[0]}
                leader={this.props.leaders.filter((lead)=> lead.featured)[0]}
            />
        );
    }

    const DishWithId = ({match}) =>{
            console.log(this.props.comments.filter((comment)=>comment.dishId == parseInt(match.params.dishId,10))) 
          return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
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
            <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm}/>}></Route>
            <Redirect to="/home"></Redirect>
        </Switch>
        <Footer/>
      </div>
    );
  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
