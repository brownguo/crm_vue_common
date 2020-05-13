<template>
  <a-card :bordered="false">

    <a-tabs defaultActiveKey="1">
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="ordered-list" />订单列表
        </span>
        <div class="table-page-search-wrapper">
          <a-form layout="inline">
            <a-row :gutter="48">
              <a-col :md="8" :sm="24">
                <a-form-item label="规则编号">
                  <a-input placeholder=""/>
                </a-form-item>
              </a-col>
              <a-col :md="8" :sm="24">
                <a-form-item label="使用状态">
                  <a-select placeholder="请选择" default-value="0">
                    <a-select-option value="0">全部</a-select-option>
                    <a-select-option value="1">关闭</a-select-option>
                    <a-select-option value="2">运行中</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <template>
                <a-col :md="8" :sm="24">
                  <a-form-item label="调用次数">
                    <a-input-number style="width: 100%"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="更新日期">
                    <a-date-picker style="width: 100%" placeholder="请输入更新日期"/>
                  </a-form-item>
                </a-col>
                <a-col :md="8" :sm="24">
                  <a-form-item label="使用状态">
                    <a-select placeholder="请选择" default-value="0">
                      <a-select-option value="0">全部</a-select-option>
                      <a-select-option value="1">关闭</a-select-option>
                      <a-select-option value="2">运行中</a-select-option>
                    </a-select>
                  </a-form-item>
                </a-col>
              </template>
              <a-col :md="8" :sm="24">
                <span class="table-page-search-submitButtons" :style="advanced && { float: 'right', overflow: 'hidden' } || {} ">
                  <a-button type="primary">查询</a-button>
                  <a-button style="margin-left: 8px">重置</a-button>
                </span>
              </a-col>
            </a-row>
          </a-form>
        </div>
        <a-modal
          title="Let it go go ~"
          :visible="visible"
          :confirm-loading="confirmLoading"
          @ok="handleOk"
          @cancel="handleCancel"
        >
          <p>{{ dialogValue.title }}</p>
        </a-modal>
        <a-table :columns="columns" :dataSource="data" :loading="tableLoding" :rowKey="record => record.path">
          <span slot="action" slot-scope="text, record">
            <a @click="showModal(record)">更改</a>
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
  // {
  //   title: '新闻缩略图',
  //   dataIndex: 'image'
  // },
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
  name: 'Draw',
  data () {
    return {
      data: [],
      queryParam: {},
      buttonLoading: false,
      tableLoding: true,
      advanced: false,
      columns,
      confirmLoading: false,
      visible: false,
      dialogValue: {}
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
    showModal (record) {
      this.visible = true
      this.dialogValue.title = record.title
    },
    handleOk (record) {
      console.log(record)
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel (e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    onEdit (value) {
      console.log(JSON.stringify(value))
    }
  }
}
</script>
