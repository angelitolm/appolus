import React from 'react'
import { injectIntl} from 'react-intl';
import IntlMessages from "../../util/IntlMessages";
import { Container, Row } from 'reactstrap'
import { Colxx } from '../CustomBootstrap'

// ===============================================================
// Components
// ===============================================================

// ===============================================================
// CSS
// ===============================================================
import '../../assets/css/custom_style.css'

// const style = {
//   "glows": {
//     textAlign: 'center !important'
//   }
// }

const Sectiona = () => {
  return (
    <Container>
      <div className="glows">
        <Row>
          <Colxx xxs="4" style={{ textAlign: "center" }}>
            <div className="glow1">
              <i className="iconsmind-Light-Bulb2" />
            </div>
            <h3>asdasdasd</h3>
            <p>asdasdasd asdas das aqw q qw nqwkn wqneqwnejnjk nkjasnd</p>
          </Colxx>
          <Colxx xxs="4" style={{ textAlign: "center" }}>
            <div className="glow2">
              <i className="simple-icon-puzzle" />
            </div>
            <h3>asdasdasd</h3>
            <p>asdasdasd asdas das aqw q qw nqwkn wqneqwnejnjk nkjasnd</p>
          </Colxx>
          <Colxx xxs="4" style={{ textAlign: "center" }}>
            <div className="glow3">
              <i className="simple-icon-pin" />
            </div>
            <h3>asdasdasd</h3>
            <p>asdasdasd asdas das aqw q qw nqwkn wqneqwnejnjk nkjasnd</p>
          </Colxx>
          <Colxx xxs="12" style={{ marginTop: "35px" }}>
            <button className="mybtn_grey"><IntlMessages id="read.more" /></button>
          </Colxx>
        </Row>
      </div>
    </Container>
  )
}

export default injectIntl(Sectiona)
