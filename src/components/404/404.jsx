import { NavLink } from 'react-router-dom';
import './404.css';

const InvalidPage = () => {
    
    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%,-50%)',
        fontSize: '100px',
        
    }
    
    return(
        <div className="invalidpage-container">
            <h1 style={style}>404 page</h1>
            <NavLink to="/" className="link">Back Home</NavLink>
        </div>
    )
}

export default InvalidPage