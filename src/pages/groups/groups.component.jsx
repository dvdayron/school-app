import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import GroupsList from '../../components/groups/groups-list.component';

const GroupsPage = () => {
  return (
    <PageContainer>
      <PageTitle title="Grupos" action="/grupos/adicionar"></PageTitle>
      <GroupsList />
    </PageContainer>
  )
}

export default GroupsPage;