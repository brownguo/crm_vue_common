<template>
  <a-card :bordered="false">

    <a-tabs defaultActiveKey="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="ordered-list" />订单列表
        </span>
        <a-table :columns="columns" :dataSource="data" :loading="tableLoding" :rowKey="record => record.path">
          <span slot="action" slot-scope="text, record">
            <a @click="onEdit(record)">更改</a>
            <a-divider type="vertical" />
            <a>删除</a>
            <a-divider type="vertical" />
          </span>
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="copy" />
          下单
        </span>
        Tab 2123
      </a-tab-pane>
    </a-tabs>

  </a-card>
</template>

<script>
import { getInfos } from '@/api/orders'

const columns = [
  {
    title: 'URL',
    dataIndex: 'path',
    key: 'path'
  },
  {
    title: '新闻缩略图',
    dataIndex: 'image'
  },
  {
    title: '标题',
    key: 'title',
    dataIndex: 'title'
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  name: 'OrderList',
  data () {
    return {
      data: [],
      buttonLoading: false,
      tableLoding: true,
      columns
    }
  },
  created () {
    this.getNewList()
  },
  methods: {
    getNewList () {
      this.tableLoding = true
      getInfos().then(res => {
        this.tableLoding = false
        this.data = res.data.result
      })
    },
    handleSearchButton () {
      this.buttonLoading = true
      const { $message } = this
      getInfos(1234).then(res => {
        this.buttonLoading = false
        this.tableLoding = false
        this.data = res.data.result
      }).catch(err => {
        $message.error(`load user err: ${err.message}`)
      })
    },
    onEdit (value) {
      console.log(JSON.stringify(value))
    }
  }
}
</script>
