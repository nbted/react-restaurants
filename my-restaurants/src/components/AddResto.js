import React from 'react';

class AddResto extends React.Component{

    constructor(props){
        super(props);
        this.state = {
                     nom :'',
                     cuisine :"",
                     message :""
                    };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleInputSubmit = this.handleInputSubmit.bind(this);
    }

    handleInputChange(event){
            const target = event.target;
            const value = target.value;
            const name = target.name;

         this.setState({[name] : value});
     }

     handleInputSubmit(event){
        event.preventDefault();

        let form = event.target;
        let dataForm = new FormData(form);
        let url = "http://localhost:8080/api/restaurants/";

        fetch (url, {
            method:"POST",
            body:dataForm
        })
        .then(response=>{
            return response.json();
        })
        .then(res=>{
            const msg = res.msg;
            this.setState({message :msg });
            alert('A name was submitted: ' + msg);
        });
       
    
     }
    render(){
        return (
            <div>
              <h2>Ajouter un restaurant</h2>
            <form onSubmit={this.handleInputSubmit}>
             <label>
                  Nom : <input type="text" value={this.state.nom} onChange = {this.handleInputChange} name="nom"/>
             </label>
             <label>
                 cuisine: <input type="text" value={this.state.cuisine} onChange = {this.handleInputChange} name="cuisine"/>
             </label>
                         <input type="submit" value="Submit"/>

            </form>
            </div>
            
        )
    }
}

export default AddResto;