import React from "react";

class DeleteResto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _id : "",
            message : ""
        }
        this.handleDeleteSubmit = this.handleDeleteSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event){
        const id = event.target.value;
        this.setState({
            _id : id
        })
    }
    handleDeleteSubmit(event){
       event.preventDefault();
       const _id = this.state._id;
       let url = "http://localhost:8080/api/restaurants/"+ _id
       console.log(url)
       fetch(url,{
        method: "DELETE"
        })
       .then(response=>{
           return response.json()
       }).then(res=>{
           let msg =res.msg;
           alert(msg)
          this.setState({ message:msg})
          
       }).catch(err=>{
           console.log("erreur dans la suppression" + err);
       }
    )
    }

    render(){
        return(
            <div>
                     <h2>Supression d'un restaurant</h2>   
            <form onSubmit={this.handleDeleteSubmit}>
            <label>
            Supression :
               <input type="text" value={this.state.nom} name="nom" onChange={this.handleInputChange}/>
               <input type="submit" value ="search" /> 
            </label>
            </form>
            </div>
            
        )
        
        
    }
}

export default DeleteResto;