import { AntDesignOutlined } from '@ant-design/icons';
import { Avatar, Badge, Layout, Space } from 'antd';
import "antd/dist/antd.css";
import React from 'react';
import radar_small from '../../assets/images/radar_small.png';

const { Sider } = Layout;
const SiderComponent = () => {

    return (
        <Sider style={{ backgroundColor: '#fff' }
        }>
            <div className="logo">
                <span className="title">ACME Corp</span>
                <Space>
                    <Badge
                        className="site-badge-count-109"
                        style={{ marginLeft: '10px', backgroundColor: '#6AAEE2' }}
                        size={{
                            xs: 24,
                            sm: 32,
                            md: 40,
                            lg: 64,
                            xl: 80,
                            xxl: 100,
                        }}
                    />
                </Space>
            </div>
            <Avatar
                style={{ backgroundColor: 'ActiveBorder', marginBottom: '20px' }}
                src={radar_small}
                size={{
                    xs: 24,
                    sm: 32,
                    md: 40,
                    lg: 64,
                    xl: 80,
                    xxl: 100,
                }}
                icon={<AntDesignOutlined />}
            />
        </Sider>

    )
}

export default SiderComponent;