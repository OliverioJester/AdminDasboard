import React from 'react'
import Container from 'react-bootstrap/Container';
import Breadcrumb from '../components/Common/Breadcrumb';
import WeeklyChart from './ColumnChart/WeeklyChart.jsx';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { periodData } from './Weeklydata.js';
import Dropdown  from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';

function WeeklyReports() {
  return (
    <div>
      <Container fluid style={{minHeight: "68vh"}}>
          <Breadcrumb title="Admin" breadcrumbItem="Reports" />

        <Row className='dd mt-3'>
          <Col xs="12">
        {/* dropdown */}
        <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Weekly
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item >
                  <Link to={'/weeklyreports'}>Weekly</Link>
                </Dropdown.Item>
                <Dropdown.Item >
                  <Link to={'/reports'}>Monthly</Link>
                </Dropdown.Item>
                <Dropdown.Item >
                  <Link to={'/annuallyreports'}>Annually</Link>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
        {/* dropdown end */}
            <Card>
              <WeeklyChart periodData={periodData} dataColors={["#3258F2"]} />
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default WeeklyReports