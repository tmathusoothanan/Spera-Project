import React, { Component } from 'react';

class Home extends Component {
    constructor(props){
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        }
    }

    componentDidMount(){
        fetch('http://localhost:5000/products')
            .then(res => res.json())
            .then(json => {
               this.setState({
                   isLoaded: true,
                   items: json,
               }) 
            });
    }
   
    render(){
        var {isLoaded, items} = this.state;
        return(
            <div>
                {items.map(item => (
                <div>
                    
                    <div className='post-card '>
                        <label>Product Name : {item.name}</label><br />
                        <label>Description : {item.description}</label><br />
                        <label>{item.quantity} products are available</label>
                    </div>
                    
                </div>  
                   ))}
            </div>
        );
    }
}

export default Home;