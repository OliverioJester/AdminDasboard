import React,{ useState } from 'react'
import "../assets/scss/app.scss";
import Breadcrumb from '../components/Common/Breadcrumb';
import { Container, Row, Col, Card, CardBody} from "reactstrap";
import CardComponents from "../views/CardComponents/index.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import "../DefaultLayout.css";
import MetricsComp from '../views/MetricsComp/index.jsx';
import ColumnChart from './ColumnChart/ColumnChart.jsx';
import { periodData } from '../data';
import "../assets/css/loading.css";

 const Dashboard = () => {

  const reports = [
    { title: "Orders", iconClass: "fa-bag-shopping", description: "1,235", percent: "+1.2" },
    { title: "Revenue", iconClass: "fa-money-check-dollar", description: "$35, 723", percent: "-5" },
    {
      title: "Sales",
      iconClass: "fa-sack-dollar",
      description: "$160,230",
      percent: "+20"
    },
  ];

  const [loading, setLoading] = useState(false)

  return (
    <Container fluid>
      {loading && <div className="loading-bar"></div>}
    <Breadcrumb title="Admin" breadcrumbItem="Dashboard" />
    <Row>
      <Col xl="4">
        <CardComponents/>
        <MetricsComp />
      </Col>
      <Col xl="8">
        <Row >
          {reports.map((report, key) => {
                return(
                  <Col md="6" key={"_col_" + key}>
                  <Card className='mini-stats-wid'>
                    <CardBody className='dd'>
                      <div className='d-flex'>
                        <div className='flex-grow-1'>
                          <p className='fw-medium' style={{color: 'gray'}}>
                            {report.title}
                          </p>
                          <h4 className='mb-0'>{report.description}</h4>
                        </div>
                        <div className='icon-sm rounded-circle bg-primary align-self-center mini-stat-icon'>
                          <span className='icon-container rounded-circle bg-primary'>

                            <FontAwesomeIcon icon={`fa-solid ${report.iconClass}`}/>
                          </span>
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Col>
                );
            })}
        </Row>

        {/* Chart */}
        <Row>
          <Col xs="12">
            <Card>
              <ColumnChart periodData={periodData} dataColors={["#a855f7", "#3258F2", "#A0EADE"]} />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  </Container>
  )
}
export default Dashboard;