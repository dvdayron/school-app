import {PageContainer} from '../../styles/common.styles';
import PageTitle from '../../components/page-title/page-title.component';
import Dashboard from '../../components/dashboard/dashboard.component';

const DashboardPage = () => {
  return (
    <PageContainer>
      <PageTitle title="Dashboard"></PageTitle>
      <Dashboard />
    </PageContainer>
  )
}

export default DashboardPage;