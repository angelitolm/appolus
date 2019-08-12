import React from 'react'
import { injectIntl} from 'react-intl';
import IntlMessages from "../../util/IntlMessages";
import { Container } from 'reactstrap'
import { Colxx } from '../CustomBootstrap'

import laptop from '../../assets/img/laptop.png'
// import bg_header from '../../assets/img/bg_header.png'

const style = {
  "front_header": {

  },
  "divspacer": {
    width: '100% !important',
    height: 35
  },
  "slogan": {
    marginBottom: 35
  }
}

const Header = () => {
  return (
    <Container>
      <Colxx xxl="12" style={{ textAlign: "center" }}>
        <h1><IntlMessages id="appolus.platform" /></h1>
        <p style={style.slogan}>Appolus es la plataforma de gestión del trabajo que nuestro equipo usa para mantener informado a los usuarios del Sistema ZeusArtex,
           sobre los lanzamientos de las futuras versiones de nuestra aplicacion.
        </p>
        <button className="mybtn_orange"><IntlMessages id="find.out.how" /></button>
        <div className="divspacer" style={style.divspacer} />
        <img src={laptop} alt="Services" style={{ width: "100%" }} />
      </Colxx>
    </Container>
  )
}

export default injectIntl(Header)
