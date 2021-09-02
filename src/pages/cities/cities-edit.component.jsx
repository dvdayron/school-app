import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import CityEditForm from '../../components/cities/city-edit-form.component';

const CitiesEditPage = ({match}) => {
  return (
    <PageContainer>
      <PageTitle title="Editar ciudad"></PageTitle>
      <CityEditForm id={match.params.id}/>
    </PageContainer>
  )
}

export default CitiesEditPage;