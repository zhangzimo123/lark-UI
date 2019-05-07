<template>
  <a-tree :treeData="treeData" defaultExpandAll>

    <!-- 组织节点 -->
    <template slot="orgNode" slot-scope="{title, icon}">
      <a-icon :type="icon" style="fontSize: 16px; marginRight: 3px;"></a-icon>
      <span style="fontSize: 16px;">{{ title }}</span>
    </template>

    <!-- 用户节点 -->
    <template slot="userNode" slot-scope="{title, icon}">
      <!-- <span> -->
      <img :src="icon" alt="Avatar" style="height: 24px; width: 24px; borderRadius: 2px; margin:0 5px 4px 0px;">
      <!-- </span> -->

      <span style="color: black; fontSize: 14px; lineHeight: 24px;">{{ title }}</span>
    </template>

  </a-tree>
</template>

<script>
/**
 * 拿到联系人的list后，先对list进行遍历
 * 对组织节点和非组织节点分别处理，
 * 组织节点添加<pre>scopedSlots: { icon: 'orgAvatar', title: 'orgName' }</pre>
 * 人员节点添加<pre>scopedSlots: { icon: 'userAvatar', title: 'userName' }</pre>
 * （以上工作也可以在服务端直接进行，节省前端渲染时间）
 * 然后对数据用本组件统一渲染
 */
const treeData = [
  {
    title: '中国航天科工第二研究院',
    icon: 'folder',
    key: '0',
    scopedSlots: {
      title: 'orgNode'
    },
    children: [
      {
        title: '第二总体设计部',
        icon: 'folder',
        key: '0-1',
        scopedSlots: {
          title: 'orgNode'
        },
        children: [
          {
            title: '十一室',
            icon: 'folder',
            key: '0-1-1',
            scopedSlots: {
              title: 'orgNode'
            },
            children: [
              {
                title: '三块五',
                icon: '/avatar2.jpg',
                key: '0-1-1-1',
                scopedSlots: {
                  title: 'userNode'
                }
              },{
                title: '两块八',
                icon: '/avatar2.jpg',
                key: '0-1-1-2',
                scopedSlots: {
                  title: 'userNode'
                }
              },{
                title: '四块三',
                icon: '/avatar2.jpg',
                key: '0-1-1-3',
                scopedSlots: {
                  title: 'userNode'
                }
              }
            ]
          },{
            title: '发展计划处',
            icon: 'folder',
            key: '0-1-2',
            scopedSlots: {
              title: 'orgNode'
            },
            children: []
          }
        ]
      },{
        title: '二十三所',
        icon: 'folder',
        key: '0-2',
        scopedSlots: {
          title: 'orgNode'
        },
        children: [
          {
            title: '市场处',
            icon: 'folder',
            key: '0-2-1',
            scopedSlots: {
              title: 'orgNode'
            },
            children: []
          },{
            title: '三室',
            icon: 'folder',
            key: '0-2-2',
            scopedSlots: {
              title: 'orgNode'
            },
            children: []
          }
        ]
      },{
        title: '二〇八所',
        icon: 'folder',
        key: '0-3',
        scopedSlots: {
          title: 'orgNode'
        },
        children: []
      }
    ]
  }
]
export default {
  name: 'Contacts',
  props: {},
  data () {
    return {
      treeData
    }
  },
  methods: {
    onSelect (selectedKeys, info) {
      console.log('selected', selectedKeys, info)
    },
    onCheck (checkedKeys, info) {
      console.log('onCheck', checkedKeys, info)
    }
  }
}

</script>

<style lang="less" scoped>
 .org-node-border {
   border-top: #d7d9db;
 }
</style>

