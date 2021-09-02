/**
 * Generic form select
 */
function FormSelect({label, options, selected, handleChange, includeBlank = true, ...otherSectionProps}) {

  return (
    <div className="mb-3">
      {
        label
        ? <label className="form-label">{label}</label>
        : null
      }
      <select className="form-select" onChange={handleChange} value={selected} {...otherSectionProps}>
        {
          includeBlank
          ? <option value=""></option>
          : null
        }
        {
          options && options.length
          ? options.map(({value, text}) => {
              return (
                <option key={value} value={value}>{text}</option>
              )
            })
          : null
        }
      </select>
    </div>
  )
}

export default FormSelect; 