import React from 'react';
import { Layout, Typography } from "antd";
const { Content } = Layout;
const { Title } = Typography;

const NotFound = () => {
    return (
        <Content style={{ backgroundColor: "#F6F8FC", padding: '20px' }}>
            <Title level={3}>Route doed not exist!</Title>
        </Content>
    )
}

export default NotFound