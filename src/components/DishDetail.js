import React, { Component } from 'react';
import {Card, CardImg , CardBody , CardTitle, BreadcrumbItem} from 'reactstrap';
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom'

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
                
                    <div className="col-12 col-md-5 offset-md-1 ">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardBody>{dish.description}</CardBody>
                        </CardBody>

                    </Card>
                    </div>
                
            )
        }

        else{
            return(
                <div></div>
            );
        }

    }

    function RenderComments({comment}){ 

        return(
            <div className="col-12 col-md-5">
                        
            <h4>Comments</h4>
            
                {comment.map((comment)=> {
                console.log(comment);

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

        );


    }

    const DishDetail=(props)=>{

        return (
            <div>
                <div className="row">
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr />
                        </div>
                </div>
                <div className="row mb-2">
                <RenderDish dish={props.dish}/>
                <RenderComments comment={props.comments}/>
                </div>
                
            </div>
        );
    }


export default DishDetail;