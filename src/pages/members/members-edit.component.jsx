import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import MemberEditForm from '../../components/members/member-edit-form.component';

const MembersEditPage = ({match}) => {
  return (
    <PageContainer>
      <PageTitle title="Editar miembro"></PageTitle>
      <MemberEditForm id={match.params.id}/>
    </PageContainer>
  )
}

export default MembersEditPage;