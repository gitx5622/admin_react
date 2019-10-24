import React from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { Container, Col, Row } from "shards-react";
import { Table } from 'antd';
import reqwest from 'reqwest';
import { Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';

const columns = [
  {
    title: 'Names',
    dataIndex: 'first_name',
    width: '20%',
  },
  {
    title: 'Status',
    dataIndex: 'is_active',
    width: '20%',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
  },

];

class AuditLogs extends React.Component {
  state = {
    data: [],
    pagination: {},
    loading: false,
  };

  componentDidMount() {
    this.fetch();
  }

  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      results: pagination.pageSize,
      page: pagination.current
      
    });
  };

  fetch = (params = {}) => {
    console.log('params:', params);
    this.setState({ loading: true });
    reqwest({
      url: 'http://localhost:8000/users/',
      method: 'get',
      data: {
        ...params,
      },
      type: 'json',
    }).then(data => {
      const pagination = { ...this.state.pagination };
      // Read total count from server
      // pagination.total = data.totalCount;
      pagination.total = 100;
      this.setState({
        loading: false,
        data: data,
        pagination,
      });
    });
  };

  render() {
    return (
        <Container>
        <Row>
      <Col lg="8" md="12">
      <Table
        columns={columns}
        rowKey={record => record.id}
        dataSource={this.state.data}
        pagination={this.state.pagination}
        loading={this.state.loading}
        onChange={this.handleTableChange}
      />
      </Col>
      <Col lg="4" md="12">
      <Card bg="light" text="white" style={{ width: '18rem' }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Primary Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
  <br />
  <Card bg="light" style={{ width: '18rem' }}>
    <Card.Header>Header</Card.Header>
    <Card.Body>
      <Card.Title>Light Card Title</Card.Title>
      <Card.Text>
        Some quick example text to build on the card title and make up the bulk
        of the card's content.
      </Card.Text>
    </Card.Body>
  </Card>
      </Col>
    </Row>
    
      
      </Container>
    );
  }
}

export default AuditLogs;