import type { ProColumns } from '@ant-design/pro-components';
import { PageContainer, ProCard, ProTable, ProBreadcrumb, TableDropdown  } from '@ant-design/pro-components';
import {
  DownOutlined,
  QuestionCircleOutlined,
  CheckCircleOutlined,
  StopOutlined,
  AndroidOutlined,
  AppleOutlined,
  WindowsOutlined,
  AndroidFilled,
  AppleFilled,
  WindowsFilled,
} from '@ant-design/icons';
import { Button, Tooltip, Space, Table , Select, Tag, } from 'antd';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import type { CustomTagProps } from 'rc-select/lib/BaseSelect';

import {useEffect, useState} from 'react';
import {createColor} from "@/util";
import {findJsError} from "@/api/modules/error";
import {useRequest} from "@@/plugin-request/request";

import axios from 'axios';

const valueEnum = {
  0: 'unsolved',
  1: 'handled',
  2: 'fixed',
};

export type TableListItem = {
  key: number;
  errorDes: string;
  status: string;
  errorTime: number;
  androidNumber: number;
  iosNumber: number;
  windowNumber: number;
  person: number;
  handler: string;
};
const tableListDataSource: TableListItem[] = [];

const creators = ['付小小', '曲丽丽', '林东东', '陈帅帅', '兼某某'];


// person
for (let i = 0; i < 5; i += 1) {
  tableListDataSource.push({
    key: i,
    errorDes: 'AppName',
    status: valueEnum[Math.floor(Math.random() * 10) % 3],
    errorTime: Date.now() - Math.floor(Math.random() * 100000),
    androidNumber: Math.floor(Math.random() * 20),
    iosNumber: Math.floor(Math.random() * 20),
    windowNumber: Math.floor(Math.random() * 20),
    person: Math.floor(Math.random() * 20),
    handler: creators[Math.floor(Math.random() * creators.length)],
  });
}

const tagRender = (props: CustomTagProps) => {
  const { label, value, closable, onClose } = props;
  const onPreventMouseDown = (event: React.MouseEvent<HTMLSpanElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };
  return (
    <Tag
      color={value}
      onMouseDown={onPreventMouseDown}
      closable={closable}
      onClose={onClose}
      style={{ marginRight: 3 }}
    >
      {label}
    </Tag>
  );
};
const options = ['foursheep', '四羊', 'syandeg'];
// const options = [{ value: 'gold' }, { value: 'lime' }, { value: 'green' }, { value: 'cyan' }];

const columns: ProColumns<TableListItem>[] = [
  {
    title: '错误描述',
    tip: '报错信息过长会自动收缩',
    width: 80,
    copyable: true,
    ellipsis: true,
    dataIndex: 'errorDes',
    render: (_) => <a>{_}</a>,
  },
  {
    title: '状态',
    width: 80,
    dataIndex: 'status',
    valueEnum: {
      unsolved: { text: '未解决', status: 'Error' },
      handled: { text: '处理中', status: 'Processing' },
      fixed: { text: '已修复', status: 'Success' },
    },
  },
  {
    title: '报错时间',
    width: 140,
    key: 'since',
    dataIndex: 'errorTime',
    valueType: 'date',
    sorter: (a, b) => a.createdAt - b.createdAt,
  },
  {
    title: '发生次数',
    width: 80,
    search: false,
    dataIndex: 'number',
    render: (dom, record) => (
      <Space>
        <span><AndroidFilled style={{ color: 'rgb(129, 189, 67)' }}/>{record.androidNumber}</span>
        <span><AppleFilled style={{ color: '#666666' }}/>{record.iosNumber}</span>
        <span><WindowsFilled style={{ color: '#1FADE7' }}/>{record.windowNumber}</span>
      </Space>
    )
    // initialValue: 'all',
    // valueEnum: {
    //   all: { text: '全部', status: 'Default' },
    //   close: { text: '关闭', status: 'Default' },
    //   running: { text: '运行中', status: 'Processing' },
    //   online: { text: '已上线', status: 'Success' },
    //   error: { text: '异常', status: 'Error' },
    // },
  },
  {
    title: '影响人数',
    width: 80,
    search: false,
    dataIndex: 'person',
    // align: 'right',
    sorter: (a, b) => a.containers - b.containers,
  },
  {
    title: '处理人',
    width: 80,
    dataIndex: 'handler',
    render: () =>
      <Select
        showArrow
        style={{ width: '100%' }}
        tagRender={tagRender}
      >
        {
          options.map((item, index) => {
            return (
              <Select.Option key={index}>
                <Tag color={createColor()}>{item.substring(0, 1)}</Tag>
                {item}
              </Select.Option>
            )
          })
        }
      </Select>
  },
  {
    title: '操作',
    width: 180,
    key: 'option',
    valueType: 'option',
    render: () => [
      <a key="link">链路</a>,
      <a key="link2">报警</a>,
      <a key="link3">监控</a>,
      <TableDropdown
        key="actionGroup"
        menus={[
          { key: 'copy', name: '复制' },
          { key: 'delete', name: '删除' },
        ]}
      />,
    ],
  },
];

const overview = (
  <div>

  </div>
)
const errorList = (
  <ProTable<TableListItem>
    columns={columns}
    rowSelection={{
      // 自定义选择项参考: https://ant.design/components/table-cn/#components-table-demo-row-selection-custom
      // 注释该行则默认不显示下拉选项
      selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
    }}
    tableAlertRender={({selectedRowKeys, selectedRows, onCleanSelected}) => <Space>
      <span>已选 {selectedRowKeys.length} 项</span>
      <Button key='solve'><CheckCircleOutlined />解决</Button>
      <Button key='ignore'><StopOutlined />忽略</Button>
    </Space>}
    // tableAlertOptionRender={false}
    request={(params, sorter, filter) => {
      // 表单搜索项会从 params 传入，传递给后端接口。
      console.log(params, sorter, filter);
      return Promise.resolve({
        data: tableListDataSource,
        success: true,
      });
    }}
    rowKey="key"
    pagination={{
      showQuickJumper: true,
    }}
    search={{
      labelWidth: 'auto',
    }}
    dateFormatter="string"
    headerTitle='错误列表'
    toolBarRender={() => [
      <Button key="show">查看日志</Button>,
      <Button key="out">
        导出数据
        <DownOutlined />
      </Button>,
      <Button type="primary" key="primary">
        创建应用
      </Button>,
    ]}
  />
)
const versionAnalysis = (
  <div>

  </div>
)

export default () => {
  let arr: any[] = [];
  // const { data, error, loading } = useRequest((services) => {
  //   return services.getUserList('/error/js');
  // });

  useEffect(() => {

    findJsError().then(res => {

      console.log('res', res)
    })
    // arr = [...res.data.response];
    axios.get('/error/js').then((res) => {
      console.log('jserror', res)
    })
    console.log('arr', arr)
  })


  return (
    <PageHeaderWrapper>
      <PageContainer
        header={{
          title: 'js错误',
        }}
        tabList={[
          {
            tab: '概览',
            key: 'overview',
            children: overview
          },
          {
            tab: '错误列表',
            key: 'errorList',
            children: errorList
          },
          {
            tab: '版本分析',
            key: 'versionAnalysis',
            children: versionAnalysis
          },
        ]}
      >

        <ProCard direction="column" ghost gutter={[0, 16]}>
          <ProCard style={{ height: 200 }} />
          <ProCard gutter={16} ghost style={{ height: 200 }}>
            <ProCard colSpan={16} />
            <ProCard colSpan={8} />
          </ProCard>
        </ProCard>
      </PageContainer>
    </PageHeaderWrapper>
  );
};
