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
        modal_info:[]
    }
  }
    Openmodal=(evt)=>{
    this.setState({click:true,
          modal_info:evt
    })
    }


  render() {

    let dict = this.props.user_data;
    const {click,modal_info}=this.state;
    var arr = [];
    
    for (let i=1;i<dict.length;i++) {

          arr.push({
                title:dict[i]['real_name'],
                id:dict[i]['id'],
                location:dict[i]['tz'],
                time_ranges:dict[i]['activity_periods']['2020/04/04']

          })}
    


    return (
      <React.Fragment>
           <div  className="site-card-border-less-wrapper">
    <Card title="Users" bordered={true} style={{ width: 600 }}>
    {click && <UserModal  user_data={modal_info} action={(evt)=>(this.setState({click:evt}))} /> }

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