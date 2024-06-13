import { Link } from 'react-router-dom';
import logoDark from '../../assets/img/Untitled-1.png';
import logoLight from '../../assets/img/logo-light.png';

// eslint-disable-next-line react/prop-types
const LogoDark = ({ light }) => {
  return (
    <Link to='/'>
      <img
        src={light ? logoLight : logoDark}
        alt='AIMass'
        width='150'
        height='84'
      />
    </Link>
  );
};

export default LogoDark;
