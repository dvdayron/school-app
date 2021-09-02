import React, { useEffect } from 'react';
import EmptyValues from '../form/empty-values.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchCitiesStartAsync} from '../../redux/cities/cities.actions';
import {selectCities} from '../../redux/cities/cities.selectors';
import {fetchGroupStudentsStartAsync} from '../../redux/groups/groups.actions';
import {selectStudents} from '../../redux/groups/groups.selectors';

const StudentsList = ({id, getStudents, members, getCities, cities}) => {

  useEffect(() => {
    getStudents(id);
  }, [id, getStudents]);

  useEffect(() => {
    getCities();
  }, [getCities]);

  const getCityName = (id) => {
    let city = cities ? cities.find((c) => c.id === id) : null;
    return city ? city.name : id;
  }

  return (
    <div className="table-responsive">
      {
        members && members.length
        ? <table className="table table-bordered table-sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Ciudad</th>
              </tr>
            </thead>
            <tbody>
              {
                members.map(({id, name, email, age, gender, cityId}) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{getCityName(cityId)}</td>
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

/* Component properties*/
const mapStateToProps = createStructuredSelector({
  members: selectStudents,
  cities: selectCities
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  getStudents: (id) => dispatch(fetchGroupStudentsStartAsync(id)),
  getCities: () => dispatch(fetchCitiesStartAsync())
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StudentsList);