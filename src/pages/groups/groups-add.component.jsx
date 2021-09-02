import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import GroupAddForm from '../../components/groups/group-add-form.component';

const GroupsAddPage = () => {
  return (
    <PageContainer>
      <PageTitle title="Nuevo grupo"></PageTitle>
      <GroupAddForm />
    </PageContainer>
  )
}

export default GroupsAddPage;