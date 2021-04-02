import React from 'react';
import {Media} from 'reactstrap';
import {Card ,CardImg,CardImgOverlay,CardText,CardBody,CardTitle} from 'reactstrap';
import DishDetail from './DishDetail';


function RenderMenuItem ({dish,onClick}){

    return(
            <Card onClick={() => onClick(dish.id)}> {/* here refers that  each of this element in it going to act list item */}
                
                <CardImg width="100%" src={dish.image} alt={dish.name}/>
                
                <CardImgOverlay>
                    <CardTitle>{dish.name}</CardTitle>
                </CardImgOverlay>
            </Card>
        
    );
    

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

    const Menu = (props) => {  //this is another way of implementing the functional component
        
        const menu = props.dishes.map((dish) =>{
            return(        
                <div key={dish.id} className="col-12 col-md-5 m-1">
                        <RenderMenuItem dish={dish} onClick={props.onClick}></RenderMenuItem>
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
            </div>
        );


    }
        
 

export default Menu;