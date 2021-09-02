import {Link} from "react-router-dom";

const PageTitle = ({title, action}) => {
  return (
    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-2 mb-3 border-bottom">
      <h1 data-testid="title" className="h2">
        {title}
      </h1>
      {
        action
        ? <div className="btn-toolbar mb-2 mb-md-0">
            <Link className="btn btn-sm btn-success" to={action}>
              Adicionar
            </Link>
          </div>
        : null
      }
    </div>
  )
}

export default PageTitle;