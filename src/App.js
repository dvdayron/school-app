import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Header from './components/header/header.component';
import Navigation from './components/navigation/navigation.component';
import DashboardPage from './pages/dashboard/dashboard.component';
import MembersPage from './pages/members/members.component';
import MemberAddForm from './pages/members/members-add.component';
import MembersEditPage from './pages/members/members-edit.component';
import GroupsPage from './pages/groups/groups.component';
import GroupsAddPage from './pages/groups/groups-add.component';
import GroupsEditPage from './pages/groups/groups-edit.component';
import CitiesPage from './pages/cities/cities.component';
import CitiesAddPage from './pages/cities/cities-add.component';
import CitiesEditPage from './pages/cities/cities-edit.component';

class App extends React.Component {

  componentDidMount() {
    document.title = "School App";
  }
  
  render() { 
    return (
      <div className="App">
        <Header></Header>
        <div className="container-fluid">
          <div className="row">
            <Navigation></Navigation>
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 pt-3 px-4">
              <Switch>
                <Route exact path='/' component={DashboardPage}/>
                <Route exact path='/miembros/adicionar/:type' render={(props) => <MemberAddForm {...props}/>}/>
                <Route path='/miembros/editar/:id' render={(props) => <MembersEditPage {...props}/>}/>
                <Route path='/miembros/:type' render={(props) => <MembersPage {...props}/>}/>
                <Route exact path='/grupos/adicionar' component={GroupsAddPage}/>
                <Route exact path='/grupos' component={GroupsPage}/>
                <Route path='/grupos/editar/:id' render={(props) => <GroupsEditPage {...props}/>}/>
                <Route exact path='/ciudades/adicionar' component={CitiesAddPage}/>
                <Route exact path='/ciudades' component={CitiesPage}/>
                <Route path='/ciudades/editar/:id' render={(props) => <CitiesEditPage {...props}/>}/>
              </Switch>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
