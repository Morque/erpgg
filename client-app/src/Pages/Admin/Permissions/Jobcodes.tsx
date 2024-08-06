import { FC, useEffect, useState } from 'react';
import Layout from '../../../Components/Layout/Layout';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

interface JobcodesProps {
  children?: any
}

const Jobcodes: FC<JobcodesProps> = ({ children }) => {
  const [model, setModel] = useState(null);
  const sessionId = Cookies.get('SSID');
  const navigate = useNavigate();

  const fetchModel = async () => {
    try {
      const { data } = await axios.get('', { headers: { 'Authorization': sessionId } });
      setModel(data);
    } catch (error) {
      navigate('/login', { replace: true });
    }
  }

  useEffect(() => {
    fetchModel();
  }, []);

  return (
    <Layout>
      <h3 className='text-xl mb-4'>Perfiles de acceso</h3>
      <hr />

    </Layout>
  );
}

export default Jobcodes;