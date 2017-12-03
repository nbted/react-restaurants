import React, { Component } from 'react';
import AddResto from './components/AddResto';
import DeleteResto from './components/DeleteResto';
import SearchResto from './components/SearchResto';
import  './App.css';
// Composant fonctionnel
/*function Restaurants(props) {
  /*const liStyle = {
    backgroundColor: props.index % 2 === 0 ? 'lightpink' : 'red'
  };
    return(
      <li>
        {props.restaurantName}
      </li>
    )
}*/

class App extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      restaurants : {},
      page : 0,
      pagesizemax: 0,
      pagesize : 10
    };
  }


  componentWillMount() {
      let pa = this.state.page;
       this.getDataFromServer(pa);
       this.countRestaurant();
  }

  getDataFromServer(page){
     
    let url;
    
    if (page===0 ) {
        url = "http://localhost:8080/api/restaurants/"
        //previousButton.disabled=true;

         }
    else if (page > 0) {
    url = "http://localhost:8080/api/restaurants?page=" + page ;
    }

else{
     console.log("fininnnnnn") ;

  }
      // On récupère les données par fetch sur un serveur
      // acceptant le cross domain
      
      
      fetch(url)
         .then(response => {
          return response.json();
           })
          .then(rest => {
       
       //const restaurants = {...this.state.restaurants};
       this.setState({ restaurants:rest.data });
       

       // console.log( restaurants.length);

          }).catch(err => {
        console.log("erreur dans le get : " + err)
       });  
  }
  
  countRestaurant(){
    let url = "http://localhost:8080/api/restaurantNombre";
    fetch(url)
    .then(response=>{
      return response.json();
    })
    .then(compte=>{
      this.setState({pagesizemax:compte.data})
      //console.log(this.state.pagesizemax)

    }).catch(err=>{
      console.log(err);
    })
  }
  
  nextPage(){
     let page = this.state.page;
     page++;
     this.setState({page : page});
     let pagesize=this.state.pagesize;
     let pa =this.state.pagesizemax- pagesize; 
     this.setState({pagesizemax:pa})
     console.log("teddy"+ pa);
     this.getDataFromServer(page);
  }
  previousPage(){
    let page = this.state.page;
    page--;
    this.setState({page : page});
    //console.log(page);
    this.getDataFromServer(page);
 }

  render() {
      
            
       let list = Object.keys(this.state.restaurants).map((key,index)=>{
         const restaurant = this.state.restaurants[key];
         return <tr key={index} ><td>{restaurant.name}</td>
                     <td >{restaurant.cuisine}</td>
                </tr>
                
       })
     
       return ( 
                 <div>
                    <div className="tableaux">
                    <h2>Liste des Restaurants</h2>
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
                 <div className="tableaux">
                   <SearchResto/>
                 </div>
                 <div >
                   <button className="button" onClick={()=>this.nextPage()}>next</button>
                   <button  className="button" onClick={()=>this.previousPage()} disabled={this.state.page === 0}>previous</button>
                 </div>
                 
                
                 
                 <div className="action">
                   <AddResto/>
                   
                 </div> 
                  <div className="action">
                  <DeleteResto/>
                  </div>
                 
                 </div>

         
       )
    
  }
}

export default App;