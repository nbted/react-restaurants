import React from 'react';

class SearchResto extends React.Component{
    constructor(props){
        super(props);
        this.state={
            restaurant : {},
            nom : ""
        }
        this.handleInputChange= this.handleInputChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);

    }
    handleInputChange(event){
         
         const target = event.target;
         const name = target.name;
         const value = target.value;
         this.setState({ [name] : value })

    }

    handleSearchSubmit(event){
        event.preventDefault();
        const nom =this.state.nom;
        //alert("mon noooo" + nom);
        let url  = "http://localhost:8080/api/restaurants?nom="+nom ;
        //console.log(url);
        fetch(url)
        .then(response => {
         return response.json();
          })
         .then(rest => {
         this.setState({ restaurant:rest.data });
         console.log( this.state.restaurant);

         }).catch(err => {
       console.log("erreur dans le get : " + err)
      });  
    }


   render(){

    let list = Object.keys(this.state.restaurant).map((key,index)=>{
        const restau = this.state.restaurant[key];
        return <tr key={index} ><td>{restau.name}</td>
                    <td >{restau.cuisine}</td>
               </tr>
    })
       return(
          <div>
              <h2>Recherche d'un restaurant </h2>
              <form onSubmit={this.handleSearchSubmit}>
                  <label>
                     Recherche :
                     <input type="text" value={this.state.nom} name="nom" onChange={this.handleInputChange}/>
                     <input type="submit" value ="search" /> 
                  </label>
              </form>


              <table>
                      <thead>
                        <tr>
                          <th>Nom</th>
                          <th>Cuisine</th>                        
                          
                        </tr>
                      </thead>
                      <tbody>
                        {list}
                      </tbody>
                    </table>


          </div> 
        
         
       )
   }
}
export default SearchResto;