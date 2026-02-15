import { useState, useEffect } from 'react';
import api from '../services/api';
import { Wifi, WifiOff, RefreshCw } from 'lucide-react';

const ConnectionStatus = () => {
    const [status, setStatus] = useState('checking'); // 'checking', 'connected', 'disconnected'
    const [errorMsg, setErrorMsg] = useState('');

    const checkConnection = async () => {
        setStatus('checking');
        try {
            await api.get('health/', { timeout: 5000 });
            setStatus('connected');
            setErrorMsg('');
        } catch (error) {
            console.error("Backend check failed:", error);
            setStatus('disconnected');
            if (error.code === 'ERR_NETWORK') {
                setErrorMsg('Network Error: Server unreachable');
            } else if (error.response) {
                setErrorMsg(`Server Error: ${error.response.status}`);
            } else {
                setErrorMsg(error.message);
            }
        }
    };

    useEffect(() => {
        checkConnection();
        const interval = setInterval(checkConnection, 10000);
        return () => clearInterval(interval);
    }, []);

    if (status === 'checking' && !errorMsg) return null;

    return (
        <div className={`fixed bottom-4 right-4 px-4 py-2 rounded-full shadow-lg flex items-center space-x-2 transition-all duration-300 z-50 ${status === 'connected' ? 'bg-green-100 text-green-700 border border-green-200' :
                status === 'checking' ? 'bg-yellow-100 text-yellow-700 border border-yellow-200' :
                    'bg-red-100 text-red-700 border border-red-200'
            }`}>
            {status === 'connected' && <Wifi size={16} />}
            {status === 'disconnected' && <WifiOff size={16} />}
            {status === 'checking' && <RefreshCw size={16} className="animate-spin" />}

            <span className="text-sm font-medium">
                {status === 'connected' ? 'Backend Connected' :
                    status === 'checking' ? 'Checking Connection...' :
                        'Backend Disconnected'}
            </span>
            {status === 'disconnected' && (
                <button
                    onClick={checkConnection}
                    className="ml-2 bg-red-200 hover:bg-red-300 rounded-full p-1"
                    title="Retry"
                >
                    <RefreshCw size={12} />
                </button>
            )}
        </div>
    );
};

export default ConnectionStatus;
