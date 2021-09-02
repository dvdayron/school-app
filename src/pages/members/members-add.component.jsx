import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import MemberAddForm from '../../components/members/member-add-form.component';

const MembersAddPage = ({match}) => {
  return (
    <PageContainer>
      <PageTitle title="Nuevo miembro"></PageTitle>
      <MemberAddForm type={match.params.type}/>
    </PageContainer>
  )
}

export default MembersAddPage;