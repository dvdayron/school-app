import React, {useState, useEffect} from "react";
import Loading from '../loading/loading.component';
import FormAlert from '../form/form-alert.component';
import FormInput from '../form/form-input.component';
import FormSubmit from '../form/form-submit.component';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {editCityAsync, fetchCitiesStartAsync} from '../../redux/cities/cities.actions';
import {selectCities, selectIsFetching} from '../../redux/cities/cities.selectors';

/**
 * Edit city form
 * 
 * Props
 * - id | City id
 * - addCity | Async add city action
 * - cities | Cities list
 * - isFetching | Loading control
 */
const CityEditForm = ({id, getCities, editCity, cities, isFetching}) => {

  /* Initialize control hook*/
  const [city, setCity] = useState({name: '', createdAt: new Date()});
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState('');

  useEffect(() => {
    getCities();
  }, [getCities]);

  useEffect(() => {
    let current = cities.find((c) => c.id === id);
    setCity(current ? current : {name: '', createdAt: new Date()});
  }, [id, cities]);

  /* Component constants*/
  const {name} = city;

  /* On input value change action*/
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCity({...city, [name]: value});
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
    if (city.name !== '') {
      const unique = cities.find((c) => c.name === name && c.id !== city.id);
      if (unique === undefined) {
        editCity(city);
        setSuccess('Ciudad actualizada.');
      } else {
        setErrors('Ya existe una ciudad con ese nombre');
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
        required/>
      <FormSubmit>
        Actualizar
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
  cities: selectCities,
  isFetching: selectIsFetching,
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  editCity: (city) => dispatch(editCityAsync(city)),
  getCities: () => dispatch(fetchCitiesStartAsync()),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityEditForm);