import { Layout } from "antd";
import "antd/dist/antd.css";
import React, { Suspense, useState } from "react";
import loadable from 'react-loadable';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './styles.css';

const LoadingComponent = () => <h3>Component is loading..., please ait!</h3>

const Dashboard = loadable({
    loader: () => import(/* webpackChunkName: 'HomePage' */ './components/Dashboard/Dashboard'),
    loading: LoadingComponent
})

const Login = loadable({
    loader: () => import(/* webpackChunkName: 'Login' */ './components/Login/Login'),
    loading: LoadingComponent
})

const PageTopHeader = loadable({
    loader: () => import(/* webpackChunkName: 'PageTopHeader' */ './components/PageTopHeader/PageTopHeader'),
    loading: LoadingComponent
})

const SiderComponent = loadable({
    loader: () => import(/* webpackChunkName: 'SiderComponent' */ './components/SiderComponent/SiderComponent'),
    loading: LoadingComponent
})

const NotFound = loadable({
    loader: () => import(/* webpackChunkName: 'NotFound' */ './components/NotFound/NotFound'),
    loading: LoadingComponent
})

export default function App() {
    const [token, setToken] = useState();

    if (!token) {
        return <Login setToken={setToken} />
    }

    return (
        <div className="App">
            <Layout style={{
                minHeight: '100vh',
            }}>
                <Router>
                    <SiderComponent />
                    <Layout style={{ backgroundColor: "lightblue" }}>
                        <PageTopHeader />
                        <Routes>
                            <Route exact path='/' element={<Dashboard />} />
                            <Route path='/dashboard' element={<Dashboard />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                    </Layout>
                </Router>
            </Layout>
        </div>
    );
}
