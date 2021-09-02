import React, {useState, useEffect} from "react";
import Loading from '../loading/loading.component';
import FormAlert from '../form/form-alert.component';
import FormInput from '../form/form-input.component';
import FormSelect from '../form/form-select.component';
import FormSubmit from '../form/form-submit.component';
import {GENDERS} from '../../constants/generic';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {editMemberAsync, fetchMembersStartAsync} from '../../redux/members/members.actions';
import {selectMembers, selectIsFetching} from '../../redux/members/members.selectors';
import {fetchCitiesStartAsync} from '../../redux/cities/cities.actions';
import {selectCities} from '../../redux/cities/cities.selectors';
import {fetchGroupsStartAsync} from '../../redux/groups/groups.actions';
import {selectGroups} from '../../redux/groups/groups.selectors';

/**
 * Add member form
 * 
 * Props
 * - addmember | Async add member action
 * - members | Members list
 * - isFetching | Loading control
 */
const MemberEditForm = ({id, getMembers, editMember, members, isFetching, cities, getCities, groups, getGroups}) => {

  /* Initialize control hook*/
  const [member, setmember] = useState({
    name: '', 
    email: '',
    age: '',
    gender: '',
    groupId: '',
    cityId: '',
    createdAt: new Date()
  });
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    // exclude type from query
    getMembers(null);
  }, [getMembers]);

  useEffect(() => {
    getCities();
  }, [getCities]);

  useEffect(() => {
    getGroups();
  }, [getGroups]);

  useEffect(() => {
    let current = members.find((m) => m.id === id);
    setmember(current ? current : {
      name: '', 
      email: '',
      age: '',
      gender: '',
      groupId: '',
      cityId: '',
      createdAt: new Date()
    });
  }, [id, members]);

  /* Component constants*/
  const {name, email, age, gender, groupId, cityId} = member;

  /* On input value change action*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setmember({...member, [name]: value});
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
    if (name
      && email
      && age
      && gender
      && cityId) {
      const unique = members.find((m) => m.email === email && m.id !== member.id);
      if (unique === undefined) {
        editMember(member);
        setSuccess('Miembro actualizado.');
        // change model status
        setmember({
          name: '', 
          email: '',
          age: '',
          gender: '',
          groupId: '',
          cityId: '',
          createdAt: new Date()
        });
      } else {
        setErrors('Ya existe un miembro con ese email.');
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
      <FormInput 
        handleChange={handleChange}
        name="email"
        type="email" 
        label="Email" 
        value={email} 
        required
      />
      <div className="row">
        <div className="col-12 col-sm-4">
          <FormInput 
            handleChange={handleChange}
            name="age"
            type="number" 
            label="Edad" 
            value={age} 
            min="5"
            required
          />
        </div>
        <div className="col-12 col-sm-4">
          <FormSelect 
            handleChange={handleChange}
            name="gender"
            label="Sexo"
            selected={gender}
            options={GENDERS}
            required
          />
        </div>
        <div className="col-12 col-sm-4">
          {
            cities && cities.length
            ? <FormSelect 
                handleChange={handleChange}
                name="cityId"
                label="Ciudad"
                selected={cityId}
                options={cities.map((c) => ({value: c.id, text: c.name}))}
                required
              />
            : null
          }
          
        </div>
      </div>
      {
        member && member.type !== 'profesores' && groups && groups.length
        ? <FormSelect 
            handleChange={handleChange}
            name="groupId"
            label="Grupo"
            selected={groupId}
            options={groups.map((g) => ({value: g.id, text: g.name}))}
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
  members: selectMembers,
  isFetching: selectIsFetching,
  cities: selectCities,
  groups: selectGroups,
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  editMember: (member) => dispatch(editMemberAsync(member)),
  getMembers: (type) => dispatch(fetchMembersStartAsync(type)),
  getCities: () => dispatch(fetchCitiesStartAsync()),
  getGroups: () => dispatch(fetchGroupsStartAsync()),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MemberEditForm);