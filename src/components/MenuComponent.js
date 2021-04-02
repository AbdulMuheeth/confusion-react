import React, {Component} from 'react';
import { findRenderedDOMComponentWithClass } from 'react-dom/test-utils';
import {Media} from 'reactstrap';
import {Card ,CardImg,CardImgOverlay,CardText,CardBody,CardTitle} from 'reactstrap';
import DishDetail from './DishDetail';

class Menu extends Component{
    constructor(props){
        super(props);
        
        this.state={
            selectedDish:null
        }
    }

    onDishSelect(dish){
        console.log(dish);

        this.setState({
            selectedDish:dish
        });
    }

    // renderDish(dish){
    //     if(dish != null){
    //         return(
    //             <Card>
    //                 <CardImg width="100%" src={dish.image} alt={dish.name}/>
    //                 <CardBody>
    //                     <CardTitle>{dish.name}</CardTitle>
    //                     <CardBody>{dish.description}</CardBody>
    //                 </CardBody>

    //             </Card>

    //         )
    //     }

    //     else{
    //         return(
    //             <div></div>
    //         );
    //     }

    // }

    render(){
        const menu = this.props.dishes.map((dish) =>{
            return(
                <div key={dish.id} className="col-12 col-md-5 m-1">
                    <Card onClick={() => this.onDishSelect(dish)}> {/* here refers that  each of this element in it going to act list item */}
                        
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        
                        <CardImgOverlay>
                            <CardTitle>{dish.name}</CardTitle>
                        </CardImgOverlay>
                    
                    </Card>
                </div>


            );
        });
        return(
            <div className="container">
                <div className="row">
                    {/* <Media list>
                        {menu} for the media 
                    </Media> */}
                    {menu}
                </div>
                <div>
                    {/* {this.renderDish(this.state.selectedDish)} */}
                    <DishDetail dish={this.state.selectedDish} />
                </div>
            </div>
        );
    }
}

export default Menu;