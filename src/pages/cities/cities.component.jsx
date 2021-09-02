import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import CitiesList from '../../components/cities/cities-list.component';

const CitiesPage = () => {
  return (
    <PageContainer>
      <PageTitle title="Ciudades" action="/ciudades/adicionar"></PageTitle>
      <CitiesList />
    </PageContainer>
  )
}

export default CitiesPage;