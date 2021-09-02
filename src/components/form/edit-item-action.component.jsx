import {Link} from "react-router-dom";

/**
 * Generic table delete action
 */
const EditItemAction = ({title, to}) => {
  return (
    <Link className="btn btn-info btn-sm" to={to}>
      {title}
    </Link>
  )
}

export default EditItemAction;