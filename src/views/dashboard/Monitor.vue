<template>
  <div>
    <div class="antd-pro-pages-dashboard-analysis-twoColLayout" :class="isDesktop() ? 'desktop' : ''">
      <Container @drop="onDrop">
        <a-row :gutter="8">
          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">

            <Draggable>
              <a-card
                :headStyle="headStyle"
                :loading="loading"
                :bordered="true"
                title="研讨消息"
                :style="{ marginTop: '6px', minHeight: '296px' }">
                <a href="#" slot="extra"><a-icon type="tool" /></a>
                <div v-if="talkData.length!=0">
                  <a-list
                    bordered
                    :dataSource="talkData"
                  >
                    <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
                    <div slot="header">Header</div>
                    <div slot="footer">Footer</div>
                  </a-list>
                </div>
                <div v-else style="margin: 40px auto 0 auto;text-align: center;">
                  <a-icon type="file-exclamation" theme="twoTone" :style="fontSize" />
                  <p class="description">卡片暂无内容</p>
                </div>
              </a-card>
            </draggable>
          </a-col>
          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <a-card
              :headStyle="headStyle"
              class="antd-pro-pages-dashboard-analysis-salesCard"
              :loading="loading"
              :bordered="true"
              title="待办事项"
              :style="{ marginTop: '6px', minHeight: '296px' }">
              <a href="#" slot="extra"><a-icon type="tool" /></a>
              <div v-if="talkData.length!=0">
                <a-list
                  bordered
                  :dataSource="talkData"
                >
                  <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
                  <div slot="header">Header</div>
                  <div slot="footer">Footer</div>
                </a-list>
              </div>
              <div v-else style="margin: 40px auto 0 auto;text-align: center;">
                <a-icon type="file-exclamation" theme="twoTone" :style="fontSize" />
                <p class="description">卡片暂无内容</p>
              </div>
            </a-card>
          </a-col>
          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <a-card
              :headStyle="headStyle"
              :loading="loading"
              :bordered="true"
              title="会议室"
              :style="{ marginTop: '6px', minHeight: '296px' }">
              <a href="#" slot="extra"><a-icon type="tool" /></a>
              <div v-if="talkData.length!=0">
                <a-list
                  bordered
                  :dataSource="talkData"
                >
                  <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
                  <div slot="header">Header</div>
                  <div slot="footer">Footer</div>
                </a-list>
              </div>
              <div v-else style="margin: 40px auto 0 auto;text-align: center;">
                <a-icon type="file-exclamation" theme="twoTone" :style="fontSize" />
                <p class="description">卡片暂无内容</p>
              </div>
            </a-card>
          </a-col>
          <a-col :xl="12" :lg="12" :md="12" :sm="24" :xs="24">
            <a-card
              :headStyle="headStyle"
              class="antd-pro-pages-dashboard-analysis-salesCard"
              :loading="loading"
              :bordered="true"
              title="资源池"
              :style="{ marginTop: '6px', minHeight: '296px' }">
              <a href="#" slot="extra"><a-icon type="tool" /></a>
              <div v-if="talkData.length!=0">
                <a-list
                  bordered
                  :dataSource="talkData"
                >
                  <a-list-item slot="renderItem" slot-scope="item">{{ item }}</a-list-item>
                  <div slot="header">Header</div>
                  <div slot="footer">Footer</div>
                </a-list>
              </div>
              <div v-else style="margin: 40px auto 0 auto;text-align: center;">
                <a-icon type="file-exclamation" theme="twoTone" :style="fontSize" />
                <p class="description">卡片暂无内容</p>
              </div>
            </a-card>
          </a-col>
        </a-row>
      </container>
      <!-- <a-row :gutter="8">
      </a-row> -->
      <!-- <div class="simple-page">
        <Container @drop="onDrop">
          <Draggable v-for="item in items" :key="item.id">
            <div class="draggable-item">
              {{ item.data }}
            </div>
          </Draggable>
        </Container>
      </div> -->
    </div>
    <footer-tool-bar :style="{height:'72px', width: isSideMenu() && isDesktop() ? `calc(100% - ${sidebarOpened ? 256 : 80}px)` : '100%'}">

    </footer-tool-bar>
  </div>
</template>

<script>
import { mixin, mixinDevice } from '@/utils/mixin'
import FooterToolBar from '@/components/FooterToolbar'
import { Container, Draggable } from 'vue-smooth-dnd'
import { applyDrag, generateItems } from './utils'

const talkData = [
]

export default {
  name: 'Monitor',
  mixins: [mixin, mixinDevice],
  data () {
    return {
      loading: true,
      headStyle: { height: '52px', 'border-top': '4px solid #1890ff', 'border-bottom': 'none' },
      fontSize: { fontSize: '52px' },
      talkData: talkData,
      visible: false,
      items: generateItems(50, i => ({ id: i, data: 'Draggable' + i }))
    }
  },
  components: {
    FooterToolBar,
    Container,
    Draggable
  },
  created () {
    setTimeout(() => {
      this.loading = !this.loading
    }, 1000)
  },
  methods: {
    onDrop (dropResult) {
      this.items = applyDrag(this.items, dropResult)
    }
  }
}
</script>

<style lang="less" scoped>
  .antd-pro-pages-dashboard-analysis-twoColLayout {
    position: relative;
    display: flex;
    display: block;
    flex-flow: row wrap;

    &.desktop div[class^=ant-col]:last-child {
      position: absolute;
      right: 0;
      height: 100%;
    }
  }
  .description{
    margin-top: 24px;
    color: gray;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
  }
</style>
