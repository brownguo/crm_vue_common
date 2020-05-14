<template>
  <div>
    <a-card :bordered="false">
      <a-row>
        <a-col :sm="8" :xs="24">
          <head-info title="任务队列" content="2个任务" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="处理时间" content="32分钟" :bordered="true"/>
        </a-col>
        <a-col :sm="8" :xs="24">
          <head-info title="任务总数" content="24个"/>
        </a-col>
      </a-row>
    </a-card>

    <a-card
      style="margin-top: 24px"
      :bordered="false"
      title="Launch">

      <div slot="extra">
        <a-radio-group v-model="status">
          <a-radio-button value="all">精选</a-radio-button>
          <a-radio-button value="processing">热卖中</a-radio-button>
          <a-radio-button value="waiting">预告</a-radio-button>
        </a-radio-group>
        <!--<a-input-search style="margin-left: 16px; width: 272px;" />-->
      </div>
      <a-list size="large" :pagination="{showSizeChanger: false, showQuickJumper: false, pageSize: 20, total: 1}" :loading="listLoding">
        <a-list-item :key="index" v-for="(item, index) in data">
          <a-list-item-meta :description="item.publishedContent.properties.coverCard.properties.altText">
            <a-avatar slot="avatar" size="large" shape="square" :src="item.publishedContent.properties.coverCard.properties.squarishURL"/>
            <a slot="title">{{ item.publishedContent.properties.title }}</a>
          </a-list-item-meta>
          <div slot="actions">
            <a @click="edit(item)">购买</a>
          </div>
          <div slot="actions">
            <a @click="edit(item)">定时购买</a>
          </div>
          <div slot="actions">
            <a-dropdown>
              <a-menu slot="overlay">
                <a-menu-item><a>定时扫库存</a></a-menu-item>
                <a-menu-item><a>不让这双鞋出现在这里</a></a-menu-item>
              </a-menu>
              <a>更多<a-icon type="down"/></a>
            </a-dropdown>
          </div>
          <div class="list-content">
            <div class="list-content-item">
              <span>ID</span>
              <p>
                <a-tag color="purple">
                  {{ item.id }}
                </a-tag>
              </p>
            </div>
            <div class="list-content-item">
              <span>商品类型</span>
              <p>
                <a-tag color="cyan">
                  {{ item.publishedContent.properties.threadType }}
                </a-tag>
              </p>
            </div>
            <div class="list-content-item">
              <span>尺码</span>
              <p>
                <a-tag color="red">
                  点击查看
                </a-tag>
              </p>
            </div>
            <div class="list-content-item">
              <span>状态</span>
              <p>
                <a-tag color="green">
                  ACTIVE
                </a-tag>
              </p>
            </div>
            <div class="list-content-item">
              <span>上架时间</span>
              <p>{{ item.lastFetchTime }}</p>
            </div>
            <div class="list-content-item">
              <!--<a-progress :percent="item.progress.value" :status="!item.progress.status ? null : item.progress.status" style="width: 180px" />-->
            </div>
          </div>
        </a-list-item>
      </a-list>
    </a-card>
  </div>
</template>

<script>
import HeadInfo from '@/components/tools/HeadInfo'
import TaskForm from './modules/TaskForm'
import { getLaunch } from '@/api/snkrs'

// const data = []
// data.push({
//   title: 'Alipay',
//   avatar: 'https://gw.alipayobjects.com/zos/rmsportal/WdGqmHpayyMjiEhcKoVE.png',
//   description: '那是一种内在的东西， 他们到达不了，也无法触及的',
//   owner: '付晓晓',
//   startAt: '2018-07-26 22:44',
//   progress: {
//     value: 90
//   }
// })

export default {
  name: 'Launch',
  components: {
    HeadInfo
  },
  data () {
    return {
      data: [],
      status: 'all',
      listLoding: false
    }
  },
  created () {
    this.getNewList()
  },
  methods: {
    getNewList () {
      this.listLoding = true
      getLaunch().then(res => {
        this.listLoding = false
        this.data = res.data.objects
        console.log(this.data)
      })
    },
    edit (record) {
      // mockdata
      record.taskName = record.description
      // mockend
      this.$dialog(TaskForm,
        // component props
        {
          record
        },
        // modal props
        {
          title: '操作',
          width: 700,
          centered: true,
          maskClosable: false
        })
    }
  }
}
</script>

<style lang="less" scoped>
    .ant-avatar-lg {
        width: 48px;
        height: 48px;
        line-height: 48px;
    }

    .list-content-item {
        color: rgba(0, 0, 0, .45);
        display: inline-block;
        vertical-align: middle;
        font-size: 14px;
        margin-left: 40px;
        span {
            line-height: 20px;
        }
        p {
            margin-top: 4px;
            margin-bottom: 0;
            line-height: 22px;
        }
    }
</style>
