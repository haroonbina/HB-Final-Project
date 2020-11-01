import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import DashboardNav from './DashboardNav';
import DashboardSideNav from './DashboardSideNav';
import Rooms from './Rooms';
import '../../css/dashboard.css';
import '../../css/toggle.css';


  
class Dashboard extends Component {	
	render(){
		if(!this.props.user.isAuthenticated) return <Redirect to='/login' />
		return (
			<div>
				<DashboardNav />
				<div className="dashboard-content container-fluid">	
					<div className="row">
						<DashboardSideNav />
						<div className="dashboard-main-content col col-md-9 col-xl-10 pb-5">
							<h5 className="dashboard-main-content-title p-3 mb-5">Dashboard</h5>
							<Rooms />
						</div>
					</div>
				</div>
				
			</div>
		)
	}
}
const mapStateToProps = (state) =>{
	return{
		logoutStatus: state.userData.logoutStatus,
		user: state.userData.user,
	}
}
  
export default connect(mapStateToProps)(Dashboard);