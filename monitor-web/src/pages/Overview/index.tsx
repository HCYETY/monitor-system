import { PageContainer, ProCard, StatisticCard, ProFormDatePicker } from '@ant-design/pro-components';
import { Column } from '@ant-design/plots';

export default () => {
  const data = [
    {
      country: 'Asia',
      year: '1750',
      value: 502,
    },
    {
      country: 'Asia',
      year: '1800',
      value: 635,
    },
    {
      country: 'Asia',
      year: '1850',
      value: 809,
    },
    {
      country: 'Asia',
      year: '1900',
      value: 947,
    },
    {
      country: 'Asia',
      year: '1950',
      value: 1402,
    },
    {
      country: 'Asia',
      year: '1999',
      value: 3634,
    },
    {
      country: 'Asia',
      year: '2050',
      value: 5268,
    },
    {
      country: 'Africa',
      year: '1750',
      value: 106,
    },
    {
      country: 'Africa',
      year: '1800',
      value: 107,
    },
    {
      country: 'Africa',
      year: '1850',
      value: 111,
    },
    {
      country: 'Africa',
      year: '1900',
      value: 133,
    },
    {
      country: 'Africa',
      year: '1950',
      value: 221,
    },
    {
      country: 'Africa',
      year: '1999',
      value: 767,
    },
    {
      country: 'Africa',
      year: '2050',
      value: 1766,
    },
    {
      country: 'Europe',
      year: '1750',
      value: 163,
    },
    {
      country: 'Europe',
      year: '1800',
      value: 203,
    },
    {
      country: 'Europe',
      year: '1850',
      value: 276,
    },
    {
      country: 'Europe',
      year: '1900',
      value: 408,
    },
    {
      country: 'Europe',
      year: '1950',
      value: 547,
    },
    {
      country: 'Europe',
      year: '1999',
      value: 729,
    },
    {
      country: 'Europe',
      year: '2050',
      value: 628,
    },
  ];
  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'country',
    isPercent: true,
    isStack: true,
    label: {
      position: 'middle',
      content: (item) => {
        return item.value.toFixed(2);
      },
      style: {
        fill: '#fff',
      },
    },
  };

  return (
    <PageContainer
      header={{ title: '核心数据' }}
    >
      {/*<ProCard gutter={[18, 18]}>*/}
        <ProCard title='流量数据' split='vertical' headerBordered>
          <ProCard>
            <div>1219</div>
            <div>位活跃用户</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>位活跃用户</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>位活跃用户</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>位活跃用户</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>位活跃用户</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>位活跃用户</div>
          </ProCard>
        </ProCard>

        <ProCard title='用户量统计' headerBordered extra={<button>导出</button>}>
          <Column {...config} />
        </ProCard>
      {/*</ProCard>*/}
    </PageContainer>
  )
}
