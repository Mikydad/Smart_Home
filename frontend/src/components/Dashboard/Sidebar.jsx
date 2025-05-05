import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
    const navigate = useNavigate();

    return (
        <div style={{
            width: '250px',
            background: '#1f1f1f',
            color: '#fff',
            padding: '20px',
            height: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
        }}>
            <div>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                    <li>
                        <button
                            style={buttonStyle}
                            onClick={() => navigate('/')}
                        >
                            Dashboard
                        </button>
                    </li>
                    <li>
                        <button
                            style={buttonStyle}
                            onClick={() => navigate('/weather')}
                        >
                            Weather
                        </button>
                    </li>
                    <li>
                        <button
                            style={buttonStyle}
                            onClick={() => navigate('/lights')}
                        >
                            Lights
                        </button>
                    </li>
                    <li>
                        <button
                            style={buttonStyle}
                            onClick={() => navigate('/security')}
                        >
                            Security
                        </button>
                    </li>
                </ul>
            </div>
            <div>
                <button
                    style={{ ...buttonStyle, marginBottom: '120px' }}
                    onClick={() => navigate('/settings')}
                >
                    Settings
                </button>
            </div>
        </div>
    );
};

const buttonStyle = {
    width: '100%',
    padding: '15px',
    borderRadius: '15px',
    marginBottom: '10px',
    border: 'none',
    background: '#333',
    color: '#fff',
    cursor: 'pointer',
};

export default Sidebar;
