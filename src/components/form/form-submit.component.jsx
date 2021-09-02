/**
 * Generic form buttons
 */
const FormSubmit = ({children, ...otherSectionProps}) => {
  return (
    <div className="col-auto">
      <button type="submit" className="btn btn-success mb-3" {...otherSectionProps}>
        {children}
      </button>
    </div>
  )
}

export default FormSubmit;  