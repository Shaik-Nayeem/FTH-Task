import React from 'react'
import { server } from "../server";
import UserInfo from './UserInfo';
import './custom.css';




export default class UserLists extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user_data: {},
      isLoading:false
    }

  }
  componentDidMount = async () => {
    try {
      let users = await server.get("users");

      this.setState({user_data:users,isLoading:true})
      
      console.log("users", users);
    } catch (e) {
      console.log("something went wrong", e);
    }
  };
  
  
  render() {
    let {user_data,isLoading}=this.state;


    return (
      <React.Fragment>

        {isLoading  ? <UserInfo user_data={user_data} /> : 
        <div className='text-align'><span style={{textAlign:'center'}} id='loading'>Loading....</span></div> }
        
      </React.Fragment>
      
    )
  }
}