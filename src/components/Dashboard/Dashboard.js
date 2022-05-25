import {
    BellOutlined
} from '@ant-design/icons';
import { Avatar, Button, Card, Col, Divider, Layout, Radio, Row, Select, Space, Spin, Typography, Tabs } from "antd";
import React, { useCallback, useEffect, useState } from 'react';
import arrivals from '../../assets/images/arrivals.png';
import departure from '../../assets/images/Departure.png';
import ACME_DATA from '../../data/ACME_DATA.json';
import './index.css';
// import { messageService } from '../service/messageService';

const { Content } = Layout;
const { TabPane } = Tabs;
const { Text, Title } = Typography;
const { Option } = Select;

const FLIGHTS_URL = `https://opensky-network.org/api/states/all`;
const PAGE_SIZE = 20;
const TIME_INTERVAL = 10000;

export async function getAircrafts(country) {
    const url = country ? `${FLIGHTS_URL}?origin_country=${country}` : FLIGHTS_URL;
    return fetch(url)
        .then(data => data.json())
}

const Dashboard = () => {
    const [aircrafts, setAircrafts] = useState([]);
    const [pagewiseAircrafts, setPagewiseAircrafts] = useState([]);
    const [countries, setCountries] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [airport, setAirport] = useState('');
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [noOfPages, setNoOfPages] = useState(0)
    const [flightType, setFlightType] = useState('a')
    const [groupedData, setGroupedData] = useState(null)
    // useEffect(() => {
    //      // subscribe to glbal search from header component
    //     const subscription = messageService.onMessage().subscribe(message => {
    //         if (message) {
    //             setCountry(message)
    //         }
    //     })

    //     // return unsubscribe method to execute when component unmounts
    //     return subscription.unsubscribe;
    // })

    const groupByCountry = useCallback((aircrafts) => {
        const aircraftsMap = {};
        const arrCountries = []
        aircrafts.map((item, index) => {
            if (!aircraftsMap[item[2]]) {
                aircraftsMap[item[2]] = [{ ...item }]
                arrCountries.push(item[2])
            } else {
                aircraftsMap[item[2]].push({ ...item })
            }
        })
        console.log('groupByCountry =>', aircraftsMap);
        setCountries(arrCountries);
        setGroupedData(aircraftsMap);
    }, [])

    useEffect(() => {
        async function loadAircrafts(selectedCountry) {
            const { states, time } = await getAircrafts(selectedCountry);
            setLoading(false);
            setAircrafts(states);
            const pagedData = states.length > PAGE_SIZE ? states.slice(0, PAGE_SIZE) : states;
            setNoOfPages(Math.round(states.length / PAGE_SIZE))
            setPagewiseAircrafts(pagedData);
            groupByCountry(states);
        }

        let timer = setInterval(() => {
            setAircrafts([]);
            setPagewiseAircrafts([])
            setGroupedData(null)
            setLoading(true);
            setPageNumber(1)
            setNoOfPages(0)
            loadAircrafts(selectedCountry)
        }, TIME_INTERVAL);

        loadAircrafts(selectedCountry);
        return () => {
            clearInterval(timer);
        };
    }, [selectedCountry, airport, flightType])

    const handleCountryChange = useCallback(async (country) => {
        setAircrafts([]);
        setPagewiseAircrafts([])
        setLoading(true);
        setPageNumber(1)
        setNoOfPages(0)
        setSelectedCountry(country);
    }, []);

    const handleAirportChange = useCallback(async (airport) => {
        setAircrafts([]);
        setPagewiseAircrafts([])
        setLoading(true);
        setPageNumber(1)
        setNoOfPages(0)
        setAirport(airport);
    }, []);

    const handleLoadMore = useCallback(() => {
        const count = pageNumber + 1;
        const pagedData = aircrafts.slice(pagewiseAircrafts.length, PAGE_SIZE * count);
        const mergedFlights = [...pagewiseAircrafts];
        mergedFlights.push(...pagedData);
        setPagewiseAircrafts(mergedFlights);
        setPageNumber(count);
    }, [pageNumber, aircrafts, pagewiseAircrafts])

    const { airports } = ACME_DATA;
    return (
        <Content style={{ textAlign: 'left', backgroundColor: "#F6F8FC", padding: '20px' }}>
            <Row style={{ marginBottom: '20px' }}>
                <Col style={{ position: 'relative' }}>
                    <Button size="large" type="primary" icon={
                        <BellOutlined />} ></Button>
                    <div className="pageHeader pL_10">Aircrafts Alterts</div>
                    <div className="pageSubHeading pL_10">ACME Corp | Export to Mail</div>
                </Col>
            </Row>
            <Divider style={{ margin: '10px 0' }} />
            <Row style={{ marginBottom: '20px' }}>
                <Col sm={24} xs={18} xl={6} md={12}>
                    <Typography>
                        <Text>Filter :</Text>
                        <Select defaultValue="Select country" style={{ width: 120 }}
                            onChange={handleCountryChange}>
                            {countries.map((item, index) => {
                                return <Option value={item} key={index}>{item} </Option>
                            })}
                        </Select>
                    </Typography>
                </Col>
                <Col sm={24} xs={18} xl={6} md={12}>
                    <Space size={8}>
                        <Typography>
                            <Text>Airport :</Text>
                            <Select defaultValue="Select airport" style={{ width: 120 }}
                                onChange={handleAirportChange}>
                                {airports.map((airport, index) => {
                                    return <Option value={airport.id} key={airport.id}>{airport.name} </Option>
                                })}
                            </Select>
                            <Radio.Group onChange={(e) => setFlightType(e.target.value)} defaultValue="a">
                                <Radio.Button value="a">Arrival</Radio.Button>
                                <Radio.Button value="d">Departure</Radio.Button>
                            </Radio.Group>
                        </Typography>
                    </Space>
                </Col>
            </Row>
            <Divider style={{ margin: '10px 0' }} />
            <Typography>
                <Title level={4}>{selectedCountry ? `Aircrafts group by : ${selectedCountry}` : `All Aircrafts`}</Title>
            </Typography>
            <Tabs defaultActiveKey="1" style={{ marginBottom: 32 }}>
                <TabPane tab="All Aircrafts" key="1">
                    {
                        loading ? (
                            <div className="spinner">
                                <Spin size="large" />
                            </div>
                        ) : pagewiseAircrafts && pagewiseAircrafts.length > 0 && (
                            <>
                                <Row gutter={16}>
                                    {pagewiseAircrafts.map((stats, index) => {
                                        return <Col sm={24} xs={18} xl={6} md={12} key={index}>
                                            <div style={{ cursor: 'pointer', margin: '10px' }} className="tiles tiles-center">
                                                <Card style={{ height: '150px', maxHeight: '150px' }}>
                                                    <Avatar
                                                        style={{ backgroundColor: 'ActiveBorder', marginBottom: '20px' }}
                                                        src={flightType === 'a' ? arrivals : departure}
                                                        size={{
                                                            xs: 24,
                                                            sm: 32,
                                                            md: 40,
                                                            lg: 64,
                                                            xl: 80,
                                                            xxl: 100,
                                                        }} />
                                                    <div className='right-content'>
                                                        <h1>{stats[2]}</h1>
                                                        <h2>{stats[1]}</h2>
                                                        <h3>{stats[0]}</h3>
                                                    </div>
                                                </Card>
                                            </div>
                                        </Col>
                                    })}
                                </Row>
                                {pageNumber < noOfPages && (
                                    <>
                                        <Divider className="noMargin" />
                                        <Row gutter={16}>
                                            <Col sm={24} xs={24} xl={24} md={24}>
                                                <p className="loadMore" onClick={handleLoadMore}>{`load ${aircrafts.length - pagewiseAircrafts.length} more flights`}</p>
                                            </Col>
                                        </Row>
                                    </>
                                )}
                            </>
                        )
                    }
                </TabPane>
                <TabPane tab="Group by Country" key="2">
                    <Row>
                        {groupedData && Object.keys(groupedData).map((key, idx) => (
                            <>
                                <Col sm={24} xs={18} xl={6} md={12}>
                                    <div style={{ cursor: 'pointer', margin: '10px' }} className="tiles tiles-center">
                                        <Card style={{ height: '150px', maxHeight: '150px' }} key={key}>
                                            <Typography>
                                                <Title level={4}>{key}</Title>
                                                <Text>{`Flights in the air ${groupedData[key].length}`}</Text>
                                            </Typography>
                                        </Card>
                                    </div>
                                </Col>
                            </>))}
                    </Row>
                    <Divider className="noMargin" />
                </TabPane>
            </Tabs>
        </Content >
    )
}

export default Dashboard;