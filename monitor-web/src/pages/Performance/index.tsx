import { useState, useEffect } from 'react';
import { PageContainer, ProCard, StatisticCard, ProFormDatePicker } from '@ant-design/pro-components';
import { Column, Area } from '@ant-design/plots';

const { Statistic } = StatisticCard;


const getPerformColumn = function () {
  const data = [
    {
      type: '家具家电',
      sales: 38,
    },
    {
      type: '粮油副食',
      sales: 52,
    },
    {
      type: '生鲜水果',
      sales: 61,
    },
    {
      type: '美容洗护',
      sales: 145,
    },
    {
      type: '母婴用品',
      sales: 48,
    },
    {
      type: '进口食品',
      sales: 38,
    },
    {
      type: '食品饮料',
      sales: 38,
    },
    {
      type: '家庭清洁',
      sales: 38,
    },
  ];

  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    autoFit: true,
    // width: 100,
    // height: 100,
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle',
      // 配置样式
      style: {
        fill: '#FFFFFF',
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };

  return (
    <Column {...config} />
  )
}

const getPerformArea = function () {
  const config = {
    data: [
      {
        "Date": "2010-01",
        "scales": 1998
      },
      {
        "Date": "2010-02",
        "scales": 1850
      },
      {
        "Date": "2010-03",
        "scales": 1720
      },
      {
        "Date": "2010-04",
        "scales": 1818
      },
      {
        "Date": "2010-05",
        "scales": 1920
      },
      {
        "Date": "2010-06",
        "scales": 1802
      },
      {
        "Date": "2010-07",
        "scales": 1945
      },
      {
        "Date": "2010-08",
        "scales": 1856
      },
      {
        "Date": "2010-09",
        "scales": 2107
      },
      {
        "Date": "2010-10",
        "scales": 2140
      },
      {
        "Date": "2010-11",
        "scales": 2311
      },
      {
        "Date": "2010-12",
        "scales": 1972
      },
      {
        "Date": "2011-01",
        "scales": 1760
      },
      {
        "Date": "2011-02",
        "scales": 1824
      },
      {
        "Date": "2011-03",
        "scales": 1801
      },
      {
        "Date": "2011-04",
        "scales": 2001
      },
      {
        "Date": "2011-05",
        "scales": 1640
      },
      {
        "Date": "2011-06",
        "scales": 1502
      },
      {
        "Date": "2011-07",
        "scales": 1621
      },
      {
        "Date": "2011-08",
        "scales": 1480
      },
      {
        "Date": "2011-09",
        "scales": 1549
      },
      {
        "Date": "2011-10",
        "scales": 1390
      },
      {
        "Date": "2011-11",
        "scales": 1325
      },
      {
        "Date": "2011-12",
        "scales": 1250
      },
      {
        "Date": "2012-01",
        "scales": 1394
      },
      {
        "Date": "2012-02",
        "scales": 1406
      },
      {
        "Date": "2012-03",
        "scales": 1578
      },
      {
        "Date": "2012-04",
        "scales": 1465
      },
      {
        "Date": "2012-05",
        "scales": 1689
      },
      {
        "Date": "2012-06",
        "scales": 1755
      },
      {
        "Date": "2012-07",
        "scales": 1495
      },
      {
        "Date": "2012-08",
        "scales": 1508
      },
      {
        "Date": "2012-09",
        "scales": 1433
      },
      {
        "Date": "2012-10",
        "scales": 1344
      },
      {
        "Date": "2012-11",
        "scales": 1201
      },
      {
        "Date": "2012-12",
        "scales": 1065
      },
      {
        "Date": "2013-01",
        "scales": 1255
      },
      {
        "Date": "2013-02",
        "scales": 1429
      },
      {
        "Date": "2013-03",
        "scales": 1398
      },
      {
        "Date": "2013-04",
        "scales": 1678
      },
      {
        "Date": "2013-05",
        "scales": 1524
      },
      {
        "Date": "2013-06",
        "scales": 1688
      },
      {
        "Date": "2013-07",
        "scales": 1500
      },
      {
        "Date": "2013-08",
        "scales": 1670
      },
      {
        "Date": "2013-09",
        "scales": 1734
      },
      {
        "Date": "2013-10",
        "scales": 1699
      },
      {
        "Date": "2013-11",
        "scales": 1508
      },
      {
        "Date": "2013-12",
        "scales": 1680
      },
      {
        "Date": "2014-01",
        "scales": 1750
      },
      {
        "Date": "2014-02",
        "scales": 1602
      },
      {
        "Date": "2014-03",
        "scales": 1834
      },
      {
        "Date": "2014-04",
        "scales": 1722
      },
      {
        "Date": "2014-05",
        "scales": 1430
      },
      {
        "Date": "2014-06",
        "scales": 1280
      },
      {
        "Date": "2014-07",
        "scales": 1367
      },
      {
        "Date": "2014-08",
        "scales": 1155
      },
      {
        "Date": "2014-09",
        "scales": 1289
      },
      {
        "Date": "2014-10",
        "scales": 1104
      },
      {
        "Date": "2014-11",
        "scales": 1246
      },
      {
        "Date": "2014-12",
        "scales": 1098
      },
      {
        "Date": "2015-01",
        "scales": 1189
      },
      {
        "Date": "2015-02",
        "scales": 1276
      },
      {
        "Date": "2015-03",
        "scales": 1033
      },
      {
        "Date": "2015-04",
        "scales": 956
      },
      {
        "Date": "2015-05",
        "scales": 845
      },
      {
        "Date": "2015-06",
        "scales": 1089
      },
      {
        "Date": "2015-07",
        "scales": 944
      },
      {
        "Date": "2015-08",
        "scales": 1043
      },
      {
        "Date": "2015-09",
        "scales": 893
      },
      {
        "Date": "2015-10",
        "scales": 840
      },
      {
        "Date": "2015-11",
        "scales": 934
      },
      {
        "Date": "2015-12",
        "scales": 810
      },
      {
        "Date": "2016-01",
        "scales": 782
      },
      {
        "Date": "2016-02",
        "scales": 1089
      },
      {
        "Date": "2016-03",
        "scales": 745
      },
      {
        "Date": "2016-04",
        "scales": 680
      },
      {
        "Date": "2016-05",
        "scales": 802
      },
      {
        "Date": "2016-06",
        "scales": 697
      },
      {
        "Date": "2016-07",
        "scales": 583
      },
      {
        "Date": "2016-08",
        "scales": 456
      },
      {
        "Date": "2016-09",
        "scales": 524
      },
      {
        "Date": "2016-10",
        "scales": 398
      },
      {
        "Date": "2016-11",
        "scales": 278
      },
      {
        "Date": "2016-12",
        "scales": 195
      },
      {
        "Date": "2017-01",
        "scales": 145
      },
      {
        "Date": "2017-02",
        "scales": 207
      }
    ],
    xField: 'Date',
    yField: 'scales',
    annotations: [
      {
        type: 'text',
        position: ['min', 'median'],
        content: '中位数',
        offsetY: -4,
        style: {
          textBaseline: 'bottom',
        },
      },
      {
        type: 'line',
        start: ['min', 'median'],
        end: ['max', 'median'],
        style: {
          stroke: 'red',
          lineDash: [2, 2],
        },
      },
    ],
  };

  return (
    <Area {...config} />
  )
}
export default () => {

  // const [date, setDate] = useState([]);
  //
  // useEffect(() => {
  //   asyncFetch();
  // }, []);
  //
  // const asyncFetch = () => {
  //   fetch('https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json')
  //     .then((response) => response.json())
  //     .then((json) => setDate(json))
  //     .catch((error) => {
  //       console.log('fetch data failed', error);
  //     });
  // };



  return (
    <div>
      <PageContainer header={{ title: '页面性能' }}>
        <ProFormDatePicker name="time" placeholder="日期" />

        <ProCard>
          <ProCard
            title='LCP'
            tooltip='分析页面的LCP数据'
            // extra='2022-9-13'
            headerBordered
            gutter={8}
          >
            {getPerformArea()}
          </ProCard>

          <ProCard
            title='LCP'
            tooltip='分析页面的LCP数据'
            // extra='2022-9-13'
            headerBordered
            gutter={8}
          >
            {getPerformColumn()}
          </ProCard>

          <ProCard
            title='FCP'
            tooltip='分析页面的FCP数据'
            // extra='2022-9-13'
            headerBordered
            gutter={8}
          >
            {getPerformColumn()}
          </ProCard>
        </ProCard>


        <ProCard  direction="column" ghost gutter={[0, 16]} style={{ marginBlockStart: 8 }}>
          <ProCard gutter={16} ghost style={{ height: 150 }}>
            <ProCard title="TTFB平均时间" tooltip="发起请求到第一个字节到达的时间，涉及DNS,TCP等">
              <h1>158.91ms</h1>
            </ProCard>
            <ProCard title="Dom解析时间" tooltip="Dom解析完成的时间，反映出DOM的复杂度">
              <h1>158.91ms</h1>
            </ProCard>
            <ProCard title="页面平均加载时间" tooltip="页面加载完成的总时间">
              <h1>158.91ms</h1>
            </ProCard>
          </ProCard>
        </ProCard>


        <ProCard
          title="页面加载耗时分段数量占比"
          extra="2019年9月28日 星期五"
          headerBordered
          bordered
        >
          <ProCard split="horizontal">
            <ProCard split="horizontal">
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: '昨日全部流量',
                    value: 234,
                    description: <Statistic title="较本月平均流量" value="8.04%" trend="down" />,
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: '本月累计流量',
                    value: 234,
                    description: <Statistic title="月同比" value="8.04%" trend="up" />,
                  }}
                />
              </ProCard>
              <ProCard split="vertical">
                <StatisticCard
                  statistic={{
                    title: '运行中实验',
                    value: '12/56',
                    suffix: '个',
                  }}
                />
                <StatisticCard
                  statistic={{
                    title: '历史实验总数',
                    value: '134',
                    suffix: '个',
                  }}
                />
              </ProCard>
            </ProCard>
            <StatisticCard
              title="流量走势"
              chart={
                <img
                  src="https://gw.alipayobjects.com/zos/alicdn/_dZIob2NB/zhuzhuangtu.svg"
                  width="100%"
                />
              }
            />
          </ProCard>
          <StatisticCard
            title="流量占用情况"
            chart={
              <img
                src="https://gw.alipayobjects.com/zos/alicdn/qoYmFMxWY/jieping2021-03-29%252520xiawu4.32.34.png"
                alt="大盘"
                width="100%"
              />
            }
          />
        </ProCard>
      </PageContainer>
    </div>
  )
}
