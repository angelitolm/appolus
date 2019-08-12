import React from 'react'
import { injectIntl} from 'react-intl';
import IntlMessages from "../../util/IntlMessages";
import { Container } from 'reactstrap'
import { Colxx } from '../CustomBootstrap'

import laptop from '../../assets/img/laptop.png'
import bg_header from '../../assets/img/bg_header.png'

const styleBg = {
  height: 400,
  paddingTop: '185px',
  textAlign: 'center',
  color: 'white',
  backgroundImage: `url(${bg_header})`,
  backgroundPosition: "50% 0",
  backgroundRepeat: "no-repea",
  backgroundSize: "cover"
}


function HeaderTop () {
  return (
    <div style={ styleBg }>
      <h1><IntlMessages id="appolus.platform" /></h1>
      <p>Appolus es la plataforma de gestión del trabajo que nuestro equipo usa para mantener informado a los usuarios del Sistema ZeusArtex,
         sobre los lanzamientos de las futuras versiones de nuestra aplicacion.
      </p>
    </div>
  )
}

export default injectIntl(HeaderTop)
