import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import MembersList from '../../components/members/members-list.component';

const MembersPage = ({match}) => {
  return (
    <PageContainer>
      <PageTitle title="Miembros" action={`/miembros/adicionar/${match.params.type}`}></PageTitle>
      <MembersList type={match.params.type}/>
    </PageContainer>
  )
}

export default MembersPage;