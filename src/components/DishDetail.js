import React, { Component } from 'react';
import {Card, CardImg , CardBody , CardTitle, BreadcrumbItem, ModalHeader, ModalBody, Row, Col, Label} from 'reactstrap';
import dateFormat from 'dateformat';
import {Link} from 'react-router-dom'
import { Button, Modal } from 'reactstrap';
import { Control, Errors, LocalForm } from 'react-redux-form';
import Loading from './LoadingComponent';

const required = val => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len ;
const minLength = (len) => (val) => val && val.length >= len;

class CommentForm extends Component{

    constructor(props){
        super();

        this.state={
            togglemodal : false
        }
        this.togglefunc=this.togglefunc.bind(this);
    }

    togglefunc(){
        this.setState({
            togglemodal : !this.state.togglemodal,
        });
    }
    handleSubmit(values){
        this.togglefunc();
        // console.log(JSON.stringify(values));
        // alert("Current state is : "+JSON.stringify(values));
        this.props.addComment(this.props.dishId,values.rating,values.name,values.comment);
        
    }


    render(){
        return(
            <>
                <Button outline onClick={this.togglefunc}>Add a comment</Button>
                <Modal isOpen={this.state.togglemodal} toggel={this.togglefunc}>
                    <ModalHeader toggle={this.togglefunc}>Add a comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className='form-group'>
                                <Label htmlFor="rating" xs={12}>No. of Guests</Label>
                                <Col xs={{size:12}}>
                                    <Control.select model=".rating" name='rating' id='rating' className="form-control"
                                    >
                                        <option selected>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                    
                                </Col>
                            </Row>

                            <Row className='form-group'>
                                <Label htmlFor='name' xs={12}>Name</Label>
                                <Col xs={{size:12}}>
                                    <Control.text model=".name" name='name' id='name' className="form-control"
                                         validators={{
                                            required,maxLength:maxLength(15),minLength:minLength(3)
                                        }}
                                    >
                                    </Control.text>
                                    <Errors
                                        className="text-danger"
                                        model='.name'
                                        show='touched'
                                        messages={{
                                            required:"Required, ",
                                            minLength: 'must be greater than 3 characters',
                                            maxLength : 'must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Row className='form-group'>
                                <Label htmlFor='comment' md={12}>comment</Label>
                                <Col md={{size:12}}>
                                    <Control.textarea model='.comment' name='comment' row='6' id='comment' className='form-control' >
                                    </Control.textarea>
                                </Col>
                            </Row>
                            <Row className='form-group'>
                                <Col>
                                    <Button type="submit" className="btn-info">Submit</Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>
                </Modal>

            </>
                
            
        );
    
    }
        
    
}

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

    function RenderComments({comment,addComment,dishId}){ 

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

                <div>

                <CommentForm  dishId={dishId} addComment={addComment}/>
                </div>

            </div>


        );


    }

    const DishDetail=(props)=>{

        if(props.isLoading) {
            return (
                <div className="row">
                    <Loading/>
                </div>
            );
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
        else if(props.dish != null){
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
                    <RenderComments comment={props.comments} addComment={props.addComment} dishId={props.dish.id}/>
                    </div>
                    
                </div>
            );
        }
        
    }


export default DishDetail;