import { PageContainer, ProCard, StatisticCard } from '@ant-design/pro-components';
import RcResizeObserver from 'rc-resize-observer';
import { useState, useEffect } from 'react';
import { Area, RingProgress, DualAxes, Liquid } from '@ant-design/plots';
// import style from './index.less';
import { RightOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import ReactTooltip from "react-tooltip";
import { useHistory } from 'react-router-dom'
import jsError from '@/pages/Error/js';
import { Link } from 'react-router-dom';

const { Statistic, Divider } = StatisticCard;

const getRingProgress2 = () => {
  const config = {
    height: 100,
    width: 100,
    percent: 0.25,
    outline: {
      border: 4,
      distance: 8,
    },
    wave: {
      length: 128,
    },
  };
  return <Liquid {...config} />;
};
const getRingProgress = function () {
  const config2 = {
    height: 100,
    width: 100,
    autoFit: false,
    percent: 0.6,
    color: ['#F4664A', '#E8EDF3'],
    innerRadius: 0.85,
    radius: 0.98,
    statistic: {
      title: {
        style: {
          color: '#363636',
          fontSize: '12px',
          lineHeight: '14px',
        },
        formatter: () => 'JS错误',
      },
    },
  };

  return (
    <RingProgress {...config2} />
  )
}

export default () => {
  const history = useHistory();
  const [responsive, setResponsive] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch('https://gw.alipayobjects.com/os/bmw-prod/360c3eae-0c73-46f0-a982-4746a6095010.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const config = {
    data: [
      { errorNum: 15, time: '13日01:00' },
      { errorNum: 45, time: '12日04:00' },
      { errorNum: 75, time: '11日06:00' },
      { errorNum: 95, time: '13日08:00' },
      { errorNum: 125, time: '13日10:00' },
      { errorNum: 150, time: '13日11:00' },
      { errorNum: 170, time: '13日24:00' },
    ],
    xField: 'time',
    yField: 'errorNum',
    xAxis: {
      range: [0, 1],
    },
  };

  const data2 = [
    {
      year: '1991',
      value: 3,
      count: 10,
    },
    {
      year: '1992',
      value: 4,
      count: 4,
    },
    {
      year: '1993',
      value: 3.5,
      count: 5,
    },
    {
      year: '1994',
      value: 5,
      count: 5,
    },
    {
      year: '1995',
      value: 4.9,
      count: 4.9,
    },
    {
      year: '1996',
      value: 6,
      count: 35,
    },
    {
      year: '1997',
      value: 7,
      count: 7,
    },
    {
      year: '1998',
      value: 9,
      count: 1,
    },
    {
      year: '1999',
      value: 13,
      count: 20,
    },
  ];
  const config3 = {
    data: [data2, data2],
    xField: 'year',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        smooth: false,
        color: '#5B8FF9',
        label: {
          formatter: (datum) => {
            return `${datum.value}个`;
          },
        },
        lineStyle: {
          lineWidth: 3,
          lineDash: [5, 5],
        },
      },
      {
        geometry: 'line',
        smooth: true,
        color: '#5AD8A6',
        lineStyle: {
          lineWidth: 4,
          opacity: 0.5,
        },
        label: {
          formatter: (datum) => {
            return `${datum.count}个`;
          },
        },
        point: {
          shape: 'circle',
          size: 4,
          style: {
            opacity: 0.5,
            stroke: '#5AD8A6',
            fill: '#fff',
          },
        },
      },
    ],
  };

  return (
    <div>
    {/*<div className={style.whole}>*/}
      <PageContainer header={{ title: '异常监控大屏' }}>
        <ProCard gutter={8}>
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
        </ProCard>

        <ProCard gutter={8}>
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
          <Divider type={responsive ? 'horizontal' : 'vertical'} />
          <ProCard layout="center">
            {getRingProgress()}
          </ProCard>
        </ProCard>
      </PageContainer>

      <PageContainer header={{ title: '异常细目' }}>
        <ProCard gutter={8}>
          <ProCard
            title={<div onClick={() => history.push({ pathname: '/error/js' })}>JS异常</div>}
            extra='2022-9-13'
            tooltip='程序运行时出错，使用window.onerror进行异常捕获并上报'
            headerBordered
            gutter={8}
            style={{ maxWidth: 300, marginTop: 20 }}
          >
            {/*<div className={style.timeLabel}>2022-9-13</div>*/}
            <DualAxes {...config3} />
          </ProCard>

          <ProCard
            title={<div onClick={() => history.push({ pathname: '/error/js' })}>Promise异常</div>}
            extra='2022-9-13'
            tooltip='程序运行时出错，使用window.unhandledrejection进行异常捕获并上报'
            headerBordered
            gutter={8}
            style={{ maxWidth: 300, marginTop: 20 }}
          >
            {/*<div className={style.timeLabel}>2022-9-13</div>*/}
            <DualAxes {...config3} />
          </ProCard>

          <ProCard
            title={<div onClick={() => history.push({ pathname: '/error/js' })}>资源异常</div>}
            extra='2022-9-13'
            tooltip='静态资源加载失败的数量统计'
            headerBordered
            gutter={8}
            style={{ maxWidth: 300, marginTop: 20 }}
          >
            {/*<div className={style.timeLabel}>2022-9-13</div>*/}
            <DualAxes {...config3} />
          </ProCard>
        </ProCard>

        <ProCard gutter={8}>
          <ProCard
            title={<div onClick={() => history.push({ pathname: '/error/js' })}>console.error异常</div>}
            extra='2022-9-13'
            tooltip='用户自定义报错，console.error打印的错误均视为自定义错误'
            headerBordered
            gutter={8}
            style={{ maxWidth: 300, marginTop: 20 }}
          >
            {/*<div className={style.timeLabel}>2022-9-13</div>*/}
            <DualAxes {...config3} />
          </ProCard>

          <ProCard
            title={<div onClick={() => history.push({ pathname: '/error/js' })}>跨域异常</div>}
            extra='2022-9-13'
            tooltip="程序运行时出错，使用window.addEventListener('error')进行异常捕获并上报"
            headerBordered
            gutter={8}
            style={{ maxWidth: 300, marginTop: 20 }}
          >
            {/*<div className={style.timeLabel}>2022-9-13</div>*/}
            <DualAxes {...config3} />
          </ProCard>

          <ProCard
            title={<div onClick={() => history.push({ pathname: '/error/js' })}>白屏异常</div>}
            extra='2022-9-13'
            tooltip='用户自定义报错，console.error打印的错误均视为自定义错误'
            headerBordered
            gutter={8}
            style={{ maxWidth: 300, marginTop: 20 }}
          >
            {/*<div className={style.timeLabel}>2022-9-13</div>*/}
            <DualAxes {...config3} />
          </ProCard>
        </ProCard>

        <ProCard gutter={8}>
          <ProCard
            title={<div onClick={() => history.push({ pathname: '/error/js' })}>接口异常</div>}
            extra='2022-9-13'
            tooltip='程序运行时出错，使用window.onerror进行异常捕获并上报'
            headerBordered
            gutter={8}
            style={{ maxWidth: 300, marginTop: 20 }}
          >
            {/*<div className={style.timeLabel}>2022-9-13</div>*/}
            <DualAxes {...config3} />
          </ProCard>
        </ProCard>
      </PageContainer>
    </div>
  );
};

