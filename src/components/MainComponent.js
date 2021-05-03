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
import {postComment,fetchDishes,fetchComments,fetchPromos,fetchLeaders,postFeedback} from '../redux/ActionCreators';
import {actions} from 'react-redux-form';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

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
  postComment: (dishId,rating,author,comment) => dispatch(postComment (dishId,rating,author,comment)),
  //dispatch is a function of the Redux store. You call store. dispatch to dispatch an action. This is the only way to trigger a state change
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm: () => {dispatch(actions.reset('feedback'))},
  fetchComments : () => dispatch(fetchComments()),
  fetchPromos : () => dispatch(fetchPromos()),
  fetchLeaders : () => dispatch(fetchLeaders()),
  postFeedback: (firstname,lastname,telnum,email,agree,contactType,message) => dispatch(postFeedback (firstname,lastname,telnum,email,agree,contactType,message)),

})

class Main extends Component {

  constructor(props){
    super(props);

    
  }

 componentDidMount(){
   //this is invoked right after the component is mounted into the screen
   this.props.fetchLeaders();
   this.props.fetchDishes();
   this.props.fetchComments();
   this.props.fetchPromos();
   
 }

  render() {

    const Homepage=() => {
        return(
            <Home dish={this.props.dishes.dishes.filter((dish)=> dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.promotions.filter((promo)=> promo.featured)[0]}
                promosLoading={this.props.promotions.isLoading}
                promosErrMess={this.props.promotions.errMess}
                leader={this.props.leaders.leaders.filter((lead)=> lead.featured)[0]}
                leadersLoading={this.props.leaders.isLoading}
                leadersErrMess={this.props.leaders.errMess}
            />
        );
    }

    const DishWithId = ({match}) =>{
            console.log(this.props.comments.comments.filter((comment)=>comment.dishId == parseInt(match.params.dishId,10))) 
          return(
            <DishDetail dish={this.props.dishes.dishes.filter((dish)=> dish.id === parseInt(match.params.dishId,10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.comments.filter((comment)=>comment.dishId === parseInt(match.params.dishId,10))}
                commentsErrMess={this.props.comments.errMess}
                postComment={this.props.postComment}

            />
        );
    }


    return (
      <div>
        <Header/>
        <TransitionGroup>
          <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
            <Switch>
              <Route path="/home" component={Homepage}></Route>
              <Route exact path="/menu" component={()=> <Menu dishes={this.props.dishes}/>}></Route>
              <Route path="/menu/:dishId" component={DishWithId}/>
              <Route path="/aboutus" component={() => <About leaders={this.props.leaders.leaders}/>}/>
              <Route exact path="/contactus" component={() => <Contact resetFeedbackForm={this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}></Route>
              <Redirect to="/home"></Redirect>
            </Switch>
          </CSSTransition>
        </TransitionGroup>

        <Footer/>
      </div>
    );
  }
  
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
