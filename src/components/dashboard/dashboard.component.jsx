import React from 'react';
import {CountsContainer, CountsItem, CountsItemLabel, CountsItemNumber} from '../../styles/common.styles';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {getCitiesCountAsync, getGroupsCountAsync, getProffesorsCountAsync, getStudentsCountAsync} from '../../redux/dashboard/dashboard.actions';
import {selectCities, selectGroups, selectProffesors, selectStudents} from '../../redux/dashboard/dashboard.selectors';

class Dashboard extends React.Component {

  componentDidMount() {
    const {getCitiesCount, getGroupsCount, getProffesorsCount, getStudentsCount} = this.props;
    getCitiesCount();
    getGroupsCount();
    getProffesorsCount();
    getStudentsCount();
  }

  render() {

    const {cities, groups, proffesors, students} = this.props;

    return (
      <CountsContainer>
        <CountsItem>
          <CountsItemLabel>
            Estudiantes
          </CountsItemLabel>
          <CountsItemNumber>
            {students}
          </CountsItemNumber>
        </CountsItem>
        <CountsItem>
          <CountsItemLabel>
            Profesores
          </CountsItemLabel>
          <CountsItemNumber>
            {proffesors}
          </CountsItemNumber>
        </CountsItem>
        <CountsItem>
          <CountsItemLabel>
            Grupos
          </CountsItemLabel>
          <CountsItemNumber>
            {groups}
          </CountsItemNumber>
        </CountsItem>
        <CountsItem>
          <CountsItemLabel>
            Ciudades
          </CountsItemLabel>
          <CountsItemNumber>
            {cities}
          </CountsItemNumber>
        </CountsItem>
      </CountsContainer>
    )
  }
}

/* Component properties*/
const mapStateToProps = createStructuredSelector({
  cities: selectCities,
  groups: selectGroups,
  proffesors: selectProffesors,
  students: selectStudents,
});

/* Component actions*/
const mapDispatchToProps = dispatch => ({
  getCitiesCount: () => dispatch(getCitiesCountAsync()),
  getGroupsCount: () => dispatch(getGroupsCountAsync()),
  getProffesorsCount: () => dispatch(getProffesorsCountAsync()),
  getStudentsCount: () => dispatch(getStudentsCountAsync()),
});

/* Redux connect*/
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);