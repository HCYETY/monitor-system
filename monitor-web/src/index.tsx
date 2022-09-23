import { PageContainer, ProCard } from '@ant-design/pro-components';
import { useState } from 'react';
import {
  SettingOutlined,
  DatabaseOutlined,
  DownOutlined,
} from '@ant-design/icons';

const getShowProject = function () {
  return (
    <ProCard
      title="官网"
      extra={
        <div>
          <DatabaseOutlined />查看大屏<DownOutlined />
          <SettingOutlined />
        </div>
      }
      // style={{ width: '50%', height: '50%' }}
      bordered
      headerBordered
    >
      <ProCard split='horizontal'>
        <ProCard split='vertical'>
          <ProCard>
            <div>1219</div>
            <div>位活跃用户</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>用户总数</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>老用户数</div>
          </ProCard>
          <ProCard>
            <div>1219</div>
            <div>新用户数</div>
          </ProCard>
        </ProCard>

        <ProCard title='健康总分'>
          <ProCard split='horizontal'>

          </ProCard>
          <ProCard split='horizontal'>
            <div>js报错率：9.9%</div>
            <div>js报错率：9.9%</div>
          </ProCard>
          <ProCard split='horizontal'>
            <div>js报错率：9.9%</div>
            <div>js报错率：9.9%</div>
          </ProCard>
        </ProCard>
      </ProCard>
    </ProCard>
  )
}
const Index = () => {
  const [responsive, setResponsive] = useState(false);

  return (
    <PageContainer header={{ title: '应用汇总' }}>
      <ProCard gutter={15} ghost>
        {getShowProject()}
        {getShowProject()}
        {getShowProject()}
      </ProCard>


      {/*<div className=" md:mx-auto relative bg-white overflow-hidden border-b">*/}
      {/*  <div className="h-12 md:ml-10 md:pr-4 md:space-x-8 flex justify-center">*/}
      {/*    <a href="#" className="font-medium text-gray-500 hover:text-gray-900 flex items-center">Home</a>*/}
      {/*    <a href="#" className="font-medium text-gray-500 hover:text-gray-900 flex items-center">Product</a>*/}
      {/*    <a href="#" className="font-medium text-gray-500 hover:text-gray-900 flex items-center">Article</a>*/}
      {/*    <a href="#" className="font-medium text-gray-500 hover:text-gray-900 flex items-center">About</a>*/}
      {/*    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500 flex items-center">Log in</a>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </PageContainer>
  )
};
export default Index;
