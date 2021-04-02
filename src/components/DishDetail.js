import React, { Component } from 'react';
import {Card, CardImg , CardBody , CardTitle} from 'reactstrap';
import dateFormat from 'dateformat';

class DishDetail extends Component {

    allComments(dish){
        dish.comments.map((comment)=> {
            return(
                console.log(comment.comment)
            );

        }
        )
    }

    renderDish(dish){
        if(dish != null){
            return(
                <div className="row">
                    <div className="col-12 col-md-5 ">
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardBody>{dish.description}</CardBody>
                        </CardBody>

                    </Card>
                    </div>

                    <div className="col-12 col-md-7">
                        
                                <h4>Comments</h4>
                                {dish.comments.map((comment)=> {
                                    var date= comment.date;
                                    return(
                                        <div key={comment.id}>
                                           {comment.comment}
                                            
                                            <p> --{comment.author},{dateFormat(date,"mmmm dS,yyyy")}</p>
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

    render() {

        return (
            <div>
                {this.renderDish(this.props.dish)}
            </div>
        );
    }
}

export default DishDetail;