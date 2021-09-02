import React from 'react';
import Loading from '../loading/loading.component';
import {ActionsContainer} from '../../styles/common.styles';
import RemoveItemAction from '../form/remove-item-action.component';
import EditItemAction from '../form/edit-item-action.component';
import EmptyValues from '../form/empty-values.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchCitiesStartAsync, deleteCityAsync} from '../../redux/cities/cities.actions';
import {selectCities, selectIsFetching} from '../../redux/cities/cities.selectors';

class CitiesList extends React.Component {

  componentDidMount() {
    const {getCities} = this.props;
    getCities();
  }

  removeItem(id) {
    const {deleteCity} = this.props;
    deleteCity(id);
  }

  render() {
    const {cities, isFetching} = this.props;
    return (
      <div className="table-responsive">
        { 
          isFetching 
          ? <Loading></Loading>
          : null
        }
        {
          cities && cities.length
          ? <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  cities.map(({id, name}) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>
                        <ActionsContainer>
                          <EditItemAction title="Editar" to={`/ciudades/editar/${id}`}/>
                          <RemoveItemAction title="Eliminar" handle={() => this.removeItem(id)}/>
                        </ActionsContainer>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          : <EmptyValues title="No hay elementos" />
        }
      </div>
    )
  }
}

/* Component properties*/
const mapStateToProps = createStructuredSelector({
  cities: selectCities,
  isFetching: selectIsFetching,
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  getCities: () => dispatch(fetchCitiesStartAsync()),
  deleteCity: (index, id) => dispatch(deleteCityAsync(index, id)),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitiesList);