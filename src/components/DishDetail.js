import React, { Component } from 'react';
import {Card, CardImg , CardBody , CardTitle} from 'reactstrap';
import dateFormat from 'dateformat';


    // allComments(dish){
    //     dish.comments.map((comment)=> {
    //         return(
    //             console.log(comment.comment)
    //         );

    //     }
    //     )
    // }

    function RenderDish({dish}){

        if(dish != null){
            return(
                <div className="row offset-md-1">
                    <div className="col-12 col-md-5 ">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardBody>{dish.description}</CardBody>
                        </CardBody>

                    </Card>
                    </div>

                    <div className="container col-12 col-md-6">
                        
                                <h4>Comments</h4>
                                {dish.comments.map((comment)=> {
                                    var date= comment.date;
                                    return(
                                        <div key={comment.id}>
                                           {comment.comment}
                                            
                                            <p> -- {comment.author},{dateFormat(date,"mmmm dS,yyyy")}</p>
                                        </div>
                                        
                                    );

                                    }
                                )}
                        
                    </div>

                </div>
            )
        }

        else{
            return(
                <div></div>
            );
        }

    }

    const DishDetail=(props)=>{

        return (
            <div>
                <RenderDish dish={props.dish}/>
            </div>
        );
    }


export default DishDetail;