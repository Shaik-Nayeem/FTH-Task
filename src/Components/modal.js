import React from 'react'
import { Modal, Card, Col, Row,DatePicker } from 'antd';
import { server } from "../server";
import moment from "moment";
import './custom.css';



export default class UserModal extends React.Component {
    constructor(props){
        super(props);
  this.state = {
    ModalText: this.props.user_data.id,
    visible: true,
    confirmLoading: false,
    date_range:''

  };
    }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
    this.props.action(!this.state.visible)

  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
    this.props.action(!this.state.visible)

  };

  onChange=(date, dateString)=> {
   let Formatchange=moment(dateString).format("YYYY/MM/DD")
    this.userActivity(Formatchange)
  }

  info=()=>{
    let {date_range}=this.state;
    return(
      <div style={{marginTop:'40px'}}>
            <ul>
            <li>Login: <span style={{color:'green'}}>{date_range[0].start_time}</span></li>
            <li>Logout:  <span style={{color:'red'}}>{date_range[0].end_time}</span></li>
            </ul>
        </div>
    )
  }

userActivity=  async(date)=>{

  let userActivity = await server.get("userActivity", {
    userId: this.props.user_data.id,
    date:date
  });

  this.setState({date_range:userActivity})
}
  render() {
    const data=this.props.user_data;
    const {date_range,visible,confirmLoading}=this.state;

    if(visible){
    return (
      <div>
        <Modal
          title={data.title}
          visible={visible}
          onOk={this.handleOk}
          confirmLoading={confirmLoading}
          onCancel={this.handleCancel}
        >
        
        <div className="site-card-wrapper">
            <Row >
              <Col sz={6}>
                <Card title={'Activity :'+ this.props.date }>

                  <ul>
                    <li>Login: <span style={{color:'green'}}>{data.time_ranges[0].start_time}</span></li>
                    <li>Logout:  <span style={{color:'red'}}>{data.time_ranges[0].end_time}</span></li>
                    </ul>
                </Card>
              </Col>

              <Col>
              <div style={{marginLeft:'50px'}}>
                <DatePicker   onChange={this.onChange} />
                  {date_range && this.info()}
                </div>
              </Col>
              
              
            </Row>
        </div>
        </Modal>
      </div>
    );
  }
}
}

