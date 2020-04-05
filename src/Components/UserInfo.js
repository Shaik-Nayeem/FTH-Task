import React from 'react'
import { List, Avatar,Layout,Card} from 'antd';
import 'antd/dist/antd.css';
import UserModal from './modal'

const { Content } = Layout;


export default class UserInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
        click:false,
        modal_info:[],
    }
  }
    Openmodal=(evt)=>{
    this.setState({click:true,
          modal_info:evt
    })
    }
today_date=()=>{

  
    let dateObj = new Date();
  let year = dateObj.getFullYear().toString().length === 1
      ? "0" + dateObj.getFullYear()
      : dateObj.getFullYear();
  let month =
    (dateObj.getMonth() + 1).toString().length === 1
      ? "0" + (dateObj.getMonth() + 1)
      : dateObj.getMonth() + 1;
  let date =
    dateObj.getDate().toString().length === 1
      ? "0" + dateObj.getDate()
      : dateObj.getDate();

  let dateString = `${year}/${month}/${date}`;

  return dateString
}
    

  render() {

    let dict = this.props.user_data;
    const {click,modal_info}=this.state;
    var arr = [];

    let date=this.today_date()
    
    for (let i=1;i<dict.length;i++) {

          arr.push({
                title:dict[i]['real_name'],
                id:dict[i]['id'],
                location:dict[i]['tz'],
                time_ranges:dict[i]['activity_periods'][date]

          })}
    


    return (
      <React.Fragment>
           <div  className="site-card-border-less-wrapper">
    <Card title="Users" bordered={true} style={{ width: 600 }}>
    {click && <UserModal  user_data={modal_info} date={date} action={(evt)=>(this.setState({click:evt}))} /> }

    <Content>
        <List
            itemLayout="horizontal"
            dataSource={arr}
            renderItem={item => (
            <List.Item>
                <List.Item.Meta
                avatar={<span onClick={()=>this.Openmodal(item)}><Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" /></span>}
                title={<span onClick={()=>this.Openmodal(item)}><strong>{item.title}</strong></span>}
                description={<span onClick={()=>this.Openmodal(item)}><strong>{item.id}</strong>.{item.title} lives in <strong>{item.location}</strong></span>}
                />
        </List.Item>
                    )}/>
    </Content>
    </Card>
  </div>
</React.Fragment>
    )
  }
}