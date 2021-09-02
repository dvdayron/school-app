import React, {useState, useEffect} from "react";
import Loading from '../loading/loading.component';
import FormAlert from '../form/form-alert.component';
import FormInput from '../form/form-input.component';
import FormSelect from '../form/form-select.component';
import FormSubmit from '../form/form-submit.component';
import StudentsList from './group-students.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {editGroupAsync, fetchGroupsStartAsync} from '../../redux/groups/groups.actions';
import {selectGroups, selectIsFetching} from '../../redux/groups/groups.selectors';
import {fetchMembersStartAsync} from '../../redux/members/members.actions';
import {selectMembers} from '../../redux/members/members.selectors';

/**
 * Edit group form
 * 
 * Props
 * - id | Group id
 * - addGroup | Async add group action
 * - groups | Groups list
 * - isFetching | Loading control
 */
const GroupEditForm = ({groupId, getGroups, editGroup, groups, isFetching, getMembers, members}) => {

  /* Initialize control hook*/
  const [group, setGroup] = useState({name: '', proffesorId: '', createdAt: new Date()});
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  useEffect(() => {
    getMembers('profesores');
  }, [getMembers]);

  useEffect(() => {
    let current = groups.find((c) => c.id === groupId);
    setGroup(current ? current : {name: '', createdAt: new Date()});
  }, [groupId, groups]);

  /* Component constants*/
  const {name, proffesorId} = group;

  /* On input value change action*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setGroup({...group, [name]: value});
    // remove notifications
    setSuccess(false);
    if (value !== '') {
      setErrors('');
    }
  } 

  /* On submit action*/
  const handleSubmit = (e) => {
    e.preventDefault(); 
    // model validations
    if (group.name !== '') {
      const unique = groups.find((c) => c.name === name && c.id !== group.id);
      if (unique === undefined) {
        editGroup(group);
        setSuccess('Grupo actualizado.');
      } else {
        setErrors('Ya existe un grupo con ese nombre');
      }
    } else {
      setErrors('Debe llenar los campos requeridos.');
    }
  } 

  return (
    <div className="row">
      <form 
        onSubmit={handleSubmit} 
        className="col-12 col-sm-4">
        {
          errors
          ? <FormAlert title={errors} type="alert-danger"/>
          : null
        }
        {
          success
          ? <FormAlert title={success} type="alert-success"/>
          : null 
        }
        <FormInput 
          handleChange={handleChange}
          name="name"
          type="text" 
          label="Nombre" 
          value={name} 
          required
        />
        {
          members && members.length
          ? <FormSelect 
              handleChange={handleChange}
              name="proffesorId"
              label="Profesor guía"
              selected={proffesorId}
              options={members.map((m) => ({value: m.id, text: m.name}))}
              required
            />
          : null
        }
        <FormSubmit>
          Actualizar
        </FormSubmit>
        { 
          isFetching 
          ? <Loading></Loading>
          : null
        }
      </form>
      {
        group
        ? <div className="col-12 col-sm-7 offset-sm-1">
            <div className="mb-3">
              <label className="form-label">Estudiantes que pertenecen a este grupo</label>
              <StudentsList id={groupId}/>
            </div>
          </div>
        : null
      }
    </div>
  )
}

/* Component properties*/
const mapStateToProps = createStructuredSelector({
  groups: selectGroups,
  isFetching: selectIsFetching,
  members: selectMembers,
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  editGroup: (group) => dispatch(editGroupAsync(group)),
  getGroups: () => dispatch(fetchGroupsStartAsync()),
  getMembers: (type) => dispatch(fetchMembersStartAsync(type)),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupEditForm);