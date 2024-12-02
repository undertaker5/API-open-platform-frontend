import { listInterfaceInfoByPageUsingGet } from '@/services/api-platform-backend/interfaceInfoController';
import { PageContainer } from '@ant-design/pro-components';
import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

/**
 * 主页
 * @constructor
 */
const Index: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<API.InterfaceInfo[]>([]);
  const [total, setTotal] = useState<number>(0);

  const loadDate = async (current = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const res = await listInterfaceInfoByPageUsingGet({
        current,
        pageSize,
      });
      setList(res?.data?.records ?? []);
      setTotal(res?.data?.total ?? 0);
    } catch (error: any) {
      message.error('请求失败,' + error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadDate();
  }, []);

  return (
    <PageContainer title="在线接口开放平台">
      <List
        className="api-list"
        loading={loading}
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item) => {
          const apiLink = `/interface_info/${item.id}`;
          return (<List.Item actions={[<a key={item.id} href={apiLink}>查看</a>]}>
            <List.Item.Meta
              title={<a href={apiLink}>{item.name}</a>}
              description={item.description}
            />
            <div>content</div>
          </List.Item>);
        }}
        pagination={{
          showTotal(total: number) {
            return '总数:' + total;
          },
          pageSize: 10,
          total,
          onChange(page, pageSize) {
            loadDate(page, pageSize);
          },
        }}
      />
    </PageContainer>
  );
};

export default Index;
