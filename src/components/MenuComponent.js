import React from 'react';
import {Media} from 'reactstrap';
import {Card ,CardImg,CardImgOverlay,CardText,CardBody,CardTitle,Breadcrumb,BreadcrumbItem} from 'reactstrap';
import DishDetail from './DishDetail';
import {Link} from "react-router-dom";

function RenderMenuItem ({dish,onClick}){

    return(

            <Link to={`/menu/${dish.id}`}>
                <Card> {/* here refers that  each of this element in it going to act list item */}
                    
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    
                    <CardImgOverlay>
                        <CardTitle>{dish.name}</CardTitle>
                    </CardImgOverlay>
                </Card>
            </Link>
            
        
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
                        <RenderMenuItem dish={dish}></RenderMenuItem>
                </div>
            );
        });
        return( 
            <div className="container">
                <div className="row">
                    <div className="row">
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                        
                    </div>
                    <div className="row col-12 mt-2">
                            <h3>Menu</h3>
                            <hr />
                        </div>
                    {menu}
                </div>
            </div>
        );


    }
        
 

export default Menu;