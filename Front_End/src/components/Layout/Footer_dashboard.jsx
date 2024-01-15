import React from 'react'
import { Container, Row, Col } from "reactstrap";

function Footer_dashboard() {
  return (
    <footer>
      <Container fluid className='sticky-bottom '>
        <Row>          
          <Col className=' ' md={6}>{new Date().getFullYear()} LESTER-SARI-SARI-STORE.</Col>
          <Col md={6}>
            <div  className='text-sm-end  d-sm-block'>
                HARD-WORK           
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer_dashboard;