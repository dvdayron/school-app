import React, {useState, useEffect} from "react";
import Loading from '../loading/loading.component';
import FormAlert from '../form/form-alert.component';
import FormInput from '../form/form-input.component';
import FormSelect from '../form/form-select.component';
import FormSubmit from '../form/form-submit.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {addGroupsStartAsync, fetchGroupsStartAsync} from '../../redux/groups/groups.actions';
import {selectGroups, selectIsFetching} from '../../redux/groups/groups.selectors';
import {fetchMembersStartAsync} from '../../redux/members/members.actions';
import {selectMembers} from '../../redux/members/members.selectors';

/**
 * Add group form
 * 
 * Props
 * - addgroup | Async add group action
 * - groups | Groups list
 * - isFetching | Loading control
 */
const GroupAddForm = ({getGroups, addGroup, groups, isFetching, getMembers, members}) => {

  /* Initialize control hook*/
  const [group, setgroup] = useState({name: '', proffesorId: '', createdAt: new Date()});
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  useEffect(() => {
    getMembers('profesores');
  }, [getMembers]);

  /* Component constants*/
  const {name, proffesorId} = group;

  /* On input value change action*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setgroup({...group, [name]: value});
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
      const unique = groups.find((c) => c.name === name);
      if (unique === undefined) {
        addGroup(group);
        setSuccess('Grupo adicionado.');
        // change model status
        setgroup({name: '', proffesorId: '', createdAt: new Date()});
      } else {
        setErrors('Ya existe un grupo con ese nombre');
      }
    } else {
      setErrors('Debe llenar los campos requeridos.');
    }
  } 

  return (
    <form 
      onSubmit={handleSubmit} 
      className="col-12 col-sm-6">
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
        Adicionar
      </FormSubmit>
      { 
        isFetching 
        ? <Loading></Loading>
        : null
      }
    </form>
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
  addGroup: (group) => dispatch(addGroupsStartAsync(group)),
  getGroups: () => dispatch(fetchGroupsStartAsync()),
  getMembers: (type) => dispatch(fetchMembersStartAsync(type)),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GroupAddForm);