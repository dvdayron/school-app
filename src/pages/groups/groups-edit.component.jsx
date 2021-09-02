import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import GroupEditForm from '../../components/groups/group-edit-form.component';

const GroupsEditPage = ({match}) => {
  return (
    <PageContainer>
      <PageTitle title="Editar grupo"></PageTitle>
      <GroupEditForm groupId={match.params.id}/>
    </PageContainer>
  )
}

export default GroupsEditPage;