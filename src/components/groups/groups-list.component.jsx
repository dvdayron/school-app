import React from 'react';
import Loading from '../loading/loading.component';
import {ActionsContainer} from '../../styles/common.styles';
import RemoveItemAction from '../form/remove-item-action.component';
import EditItemAction from '../form/edit-item-action.component';
import EmptyValues from '../form/empty-values.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchGroupsStartAsync, deleteGroupAsync} from '../../redux/groups/groups.actions';
import {selectGroups, selectIsFetching} from '../../redux/groups/groups.selectors';
import {fetchMembersStartAsync} from '../../redux/members/members.actions';
import {selectMembers} from '../../redux/members/members.selectors';

class GroupsList extends React.Component {

  componentDidMount() {
    const {getGroups, getMembers} = this.props;
    getGroups();
    getMembers('profesores');
  }

  getMemberName(id) {
    const {members} = this.props;
    let member = members ? members.find((m) => m.id === id) : null;
    return member ? member.name : id;
  }

  removeItem(id) {
    const {deleteGroup} = this.props;
    deleteGroup(id);
  }

  render() {
    const {groups, isFetching} = this.props;
    return (
      <div className="table-responsive">
        { 
          isFetching 
          ? <Loading></Loading>
          : null
        }
        {
          groups && groups.length
          ? <table className="table table-striped table-sm">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Profesor guía</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  groups.map(({id, name, proffesorId}) => (
                    <tr key={id}>
                      <td>{name}</td>
                      <td>{this.getMemberName(proffesorId)}</td>
                      <td>
                        <ActionsContainer>
                          <EditItemAction title="Editar" to={`/grupos/editar/${id}`}/>
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
  groups: selectGroups,
  isFetching: selectIsFetching,
  members: selectMembers,
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  getGroups: () => dispatch(fetchGroupsStartAsync()),
  deleteGroup: (index, id) => dispatch(deleteGroupAsync(index, id)),
  getMembers: (type) => dispatch(fetchMembersStartAsync(type)),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupsList);