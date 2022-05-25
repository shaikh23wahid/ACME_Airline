import { SearchOutlined } from '@ant-design/icons';
import { Layout, Row, Col, Form, Input, message } from 'antd';
import React, { useCallback } from 'react';
import './index.css';
import { messageService } from '../service/messageService';
const { Header } = Layout;

const PageTopHeader = () => {

    const onSearch = useCallback((values) => {
        message.info(`Trying to search with ${JSON.stringify(values)}`);
    }, [])

    return (
        <Header style={{ backgroundColor: "whie", border: 'none', maxHeight: '40px', lineHeight: 0 }}>
            <Row className="headerSearchRow">
                <Col span="24">
                    <Form
                        name="globalSearch_Form"
                        onFinish={onSearch}
                    >
                        <Form.Item
                            name="globalSearch"
                        >
                            <Input prefix={<SearchOutlined />}
                                placeholder="Type in to search" />
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Header>
    )
}

export default PageTopHeader;