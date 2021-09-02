/**
 * Generic form inputs
 */
function FormInput({handleChange, label, ...otherSectionProps}) {

  return (
    <div className="mb-3">
      {
        label
        ? <label className="form-label">{label}</label>
        : null
      }
      <input className="form-control" onChange={handleChange} {...otherSectionProps}/>
    </div>
  )
}

export default FormInput; 