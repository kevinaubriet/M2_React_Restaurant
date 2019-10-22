import React from "react";
import SimpleTable from "./table/simple_table";

class Restaurant extends React.Component {
  constructor(props) {
    super(props);
    // modele, equivalent du data de VueJS
    this.state = {
      restaurants: [],
      nouveauRestaurant: "",
      search: "",
      nbRestaurants: 0,
      pageSize: 10,
      indexPage: 0
    };
    this.getRestaurants();
  }

  callbackPageSize = pageSizeChild => {
    this.state.pageSize = pageSizeChild;
    // this.setState({ pageSize: pageSizeChild });
    console.log("Venant du menu " + this.state.pageSize);
    this.getRestaurants();
  };

  callbackIndexPage = indexPagechild => {
    this.state.indexPage = indexPagechild;
    // this.setState({ indexPage: indexPagechild });
    console.log(this.state.indexPage);
    this.getRestaurants();
  };

  callbackAddrestaurant = newRestaurant => {
    console.log("je vais ajouter un restaurant");

    var formDataA = new FormData();

    let url = "http://localhost:8080/api/restaurants";

    formDataA.append("nom", newRestaurant.name);
    formDataA.append("cuisine", newRestaurant.cuisine);
    formDataA.append("place", newRestaurant.borough);

    fetch(url, {
      method: "POST",
      body: formDataA
    })
      .then(responseJSON => {
        return responseJSON.json();
      })
      .then(responseJS => {
        var apiMessage = responseJS.msg;
        console.log(apiMessage);
      })
      .catch(err => {
        console.log(err);
      });
  };

  callbackDelrestaurant = delRestaurant => {
    console.log(delRestaurant._id);
  };

  callbackModrestaurant = (oldRestaurant, newRestaurant) => {
    console.log("je vais modifier un restaurant");

    var formData = new FormData();

    let url = "http://localhost:8080/api/restaurants/" + oldRestaurant._id;

    formData.append("nom", newRestaurant.name);
    formData.append("cuisine", newRestaurant.cuisine);
    formData.append("place", newRestaurant.borough);

    fetch(url, {
      method: "PUT",
      body: formData
    })
      .then(responseJSON => {
        return responseJSON.json();
      })
      .then(responseJS => {
        this.getRestaurants();
      })
      .catch(err => {
        console.log(err);
      });
  };

  callbackNextPage() {
    this.setState({ indexPage: this.state.indexPage + 1 });
    this.getRestaurants();
  }
  callbackPreviousPage() {
    this.setState({ indexPage: this.state.indexPage - 1 });
    this.getRestaurants();
  }
  callbackSearch = searchChild => {
    this.setState({ search: searchChild });
    this.getRestaurants();
  };

  getRestaurants() {
    console.log("je vais chercher les restaurants");

    var url =
      "http://localhost:8080/api/restaurants?page=" +
      this.state.indexPage +
      "&pagesize=" +
      this.state.pageSize +
      "&name=" +
      this.state.search;

    fetch(url)
      .then(res => res.json())
      .then(
        result => {
          this.setState({
            // isLoaded: true,
            nbRestaurants: result.count,
            restaurants: result.data
          });
        },
        // Remarque : il est important de traiter les erreurs ici
        // au lieu d'utiliser un bloc catch(), pour ne pas passer à la trappe
        // des exceptions provenant de réels bugs du composant.
        error => {
          this.setState({
            error
          });
        }
      );
  }
  modifierRestaurant() {
    console.log("je vais modifier un restaurant");

    this.activeModifDialog = false;

    var formData = new FormData();

    let url =
      "http://localhost:8081/api/restaurants/" + this.restaurantModif.id;

    formData.append("nom", this.restaurantModif.nom);
    formData.append("cuisine", this.restaurantModif.cuisine);

    fetch(url, {
      method: "PUT",
      body: formData
    })
      .then(responseJSON => {
        return responseJSON.json();
      })
      .then(responseJS => {
        console.log(responseJS.msg);
        this.apiMessage = responseJS.msg;
        this.showSnackbar = true;
        this.state.getRestaurants();
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <SimpleTable
          titre={"Restaurants : " + this.state.nbRestaurants}
          data={this.state.restaurants}
          rowsPerPage={this.state.pageSize}
          parrentCallbackIndexPage={ip => this.callbackIndexPage(ip)}
          parrentCallbackPageSize={ps => this.callbackPageSize(ps)}
          parrentCallbackSearch={s => this.callbackSearch(s)}
          parrentCallbackAdd={a => this.callbackAddrestaurant(a)}
          parrentCallbackDel={d => this.callbackDelrestaurant(d)}
          parrentCallbackMod={(oldR, newR) =>
            this.callbackModrestaurant(oldR, newR)
          }
          nbRestaurant={this.state.nbRestaurants}
        ></SimpleTable>
      </div>
    );
  }
}
export default Restaurant;
