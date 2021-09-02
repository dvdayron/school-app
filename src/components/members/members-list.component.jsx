import React, { useEffect } from 'react';
import Loading from '../loading/loading.component';
import {ActionsContainer} from '../../styles/common.styles';
import RemoveItemAction from '../form/remove-item-action.component';
import EditItemAction from '../form/edit-item-action.component';
import EmptyValues from '../form/empty-values.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchMembersStartAsync, deleteMemberAsync} from '../../redux/members/members.actions';
import {selectMembers, selectIsFetching} from '../../redux/members/members.selectors';
import {fetchCitiesStartAsync} from '../../redux/cities/cities.actions';
import {selectCities} from '../../redux/cities/cities.selectors';
import {fetchGroupsStartAsync} from '../../redux/groups/groups.actions';
import {selectGroups} from '../../redux/groups/groups.selectors';

const MembersList = ({type, getMembers, members, getCities, cities, getGroups, groups, deleteMember, isFetching}) => {

  useEffect(() => {
    getMembers(type);
  }, [type, getMembers]);

  useEffect(() => {
    getCities();
  }, [getCities]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  const getCityName = (id) => {
    let city = cities ? cities.find((c) => c.id === id) : null;
    return city ? city.name : id;
  }

  const getGroupName = (id) => {
    let group = groups ? groups.find((g) => g.id === id) : null;
    return group ? group.name : id;
  }

  const removeItem = (id) => {
    deleteMember(id);
  }

  return (
    <div className="table-responsive">
      { 
        isFetching 
        ? <Loading></Loading>
        : null
      }
      {
        members && members.length
        ? <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Email</th>
                <th>Edad</th>
                <th>Género</th>
                <th>Ciudad</th>
                {
                  type !== 'profesores'
                  ? <th>Grupo</th>
                  : null
                }
                <th></th>
              </tr>
            </thead>
            <tbody>
              {
                members.map(({id, name, email, age, gender, cityId, groupId}) => (
                  <tr key={id}>
                    <td>{name}</td>
                    <td>{email}</td>
                    <td>{age}</td>
                    <td>{gender}</td>
                    <td>{getCityName(cityId)}</td>
                    {
                      type !== 'profesores'
                      ? <td>{getGroupName(groupId)}</td>
                      : null
                    }
                    <td>
                      <ActionsContainer>
                        <EditItemAction title="Editar" to={`/miembros/editar/${id}`}/>
                        <RemoveItemAction title="Eliminar" handle={() => removeItem(id)}/>
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

/* Component properties*/
const mapStateToProps = createStructuredSelector({
  members: selectMembers,
  isFetching: selectIsFetching,
  cities: selectCities,
  groups: selectGroups,
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  getMembers: (type) => dispatch(fetchMembersStartAsync(type)),
  deleteMember: (index, id) => dispatch(deleteMemberAsync(index, id)),
  getCities: () => dispatch(fetchCitiesStartAsync()),
  getGroups: () => dispatch(fetchGroupsStartAsync()),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MembersList);