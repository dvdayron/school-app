/**
 * Generic table delete action
 */
const RemoveItemAction = ({title, handle}) => {
  return (
    <button className="btn btn-danger btn-sm mx-1" onClick={() => {
      if (window.confirm('El elemento será eliminado permanentemente')) {
        handle();
      }
    }}>
      {title}
    </button>
  )
}

export default RemoveItemAction;