import React from 'react'
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Breadcrumb from '../components/Common/Breadcrumb';
import MonthlyChart from './ColumnChart/MonthlyChart.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { periodData } from './Monthlydata.js';
import Dropdown  from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function Reports() {
  return (
    <div>
      <Container fluid style={{minHeight: "68vh"}}>
          <Breadcrumb title="Admin" breadcrumbItem="Reports" />

          <Row className=' mt-3'>
          <Col xs="12">
        {/* dropdown */}
        <Dropdown>
              <Dropdown.Toggle className='dd' variant=" success" id="dropdown-basic">
                Monthly
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item >
                  <Link className='dd' to={'/weeklyreports'}>Weekly</Link>
                </Dropdown.Item>
                <Dropdown.Item >
                  <Link className='dd' to={'/reports'}>Monthly</Link>
                </Dropdown.Item>
                <Dropdown.Item >
                  <Link className='dd' to={'/annuallyreports'}>Annually</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        {/* dropdown end */}
            <Card>
              <MonthlyChart className='dd' periodData={periodData} dataColors={["#3258F2"]} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Reports