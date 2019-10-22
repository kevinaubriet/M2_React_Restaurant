import React, { Component } from "react";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import TablePagination from "@material-ui/core/TablePagination";

class SimpleTable extends Component {
  constructor(props) {
    super(props);

    this.state = {
      titre: "",
      columns: [
        { title: "Nom", field: "name" },
        { title: "Cuisine", field: "cuisine" },
        { title: "City ", field: "borough" }
      ],
      rowsPerPage: 10,
      indexPage: 0
    };
  }
  setPageSize(event, newpagesize) {
    this.setState({ rowsPerPage: parseInt(newpagesize.key) });
    console.log("Venant du tableau " + this.state.rowsPerPage);
    this.props.parrentCallbackPageSize(this.state.rowsPerPage);
  }
  setIndexPage(event, index) {
    console.log(index);
    this.setState({ indexPage: index });
    this.props.parrentCallbackIndexPage(index);
  }

  search(searchChild) {
    this.props.parrentCallbackSearch(searchChild);
  }
  addRestaurant(restaurantACild) {
    this.props.parrentCallbackAdd(restaurantACild);
  }
  deleteRestaurant(restaurantSChild) {
    this.props.parrentCallbackDel(restaurantSChild);
  }
  modifRestaurant(oldrestaurantMChild, newrestaurantMChild) {
    this.props.parrentCallbackMod(oldrestaurantMChild, newrestaurantMChild);
  }

  render() {
    return (
      <Paper>
        <div>
          <MaterialTable
            style={{ width: 1200 }}
            title={this.props.titre}
            columns={this.state.columns}
            data={this.props.data}
            options={{
              search: true,
              exportButton: false,
              paging: false
            }}
            onSearchChange={search => this.search(search)}
            editable={{
              onRowAdd: newData =>
                new Promise(resolve => {
                  resolve();
                  console.log(newData);
                  this.addRestaurant(newData);
                }),
              onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                  resolve();
                  this.modifRestaurant(oldData, newData);
                }),
              onRowDelete: oldData =>
                new Promise(resolve => {
                  resolve();
                  this.deleteRestaurant(oldData);
                })
            }}
          />
        </div>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={this.props.nbRestaurant}
          rowsPerPage={this.state.rowsPerPage}
          page={this.state.indexPage}
          backIconButtonProps={{
            "aria-label": "previous page"
          }}
          nextIconButtonProps={{
            "aria-label": "next page"
          }}
          onChangeRowsPerPage={(e, v) => this.setPageSize(e, v)}
          onChangePage={(e, v) => this.setIndexPage(e, v)}
        />
      </Paper>
    );
  }
}
export default SimpleTable;
