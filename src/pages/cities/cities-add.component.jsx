import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import CityAddForm from '../../components/cities/city-add-form.component';

const CitiesAddPage = () => {
  return (
    <PageContainer>
      <PageTitle title="Nueva ciudad"></PageTitle>
      <CityAddForm />
    </PageContainer>
  )
}

export default CitiesAddPage;