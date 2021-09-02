/**
 * Generic form alerts
 */
 function FormAlert({title, type}) {

  return (
    <div className={`alert ${type}`}>
      {title}
    </div>
  )
}

export default FormAlert; 