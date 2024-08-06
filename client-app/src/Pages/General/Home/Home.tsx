import { FC } from 'react';
import Layout from '../../../Components/Layout/Layout';

interface HomeProps {
    children?: any
}

const Home: FC<HomeProps> = ({ children }) => {
    

    return (
        <Layout>
            <h4 className='text-zinc-700 font-bold'>Bienvenido</h4>
        </Layout>
    );
}

export default Home;

