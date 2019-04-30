<template>
  <a-tree
    :treeData="treeData"
    :defaultSelectedKeys="['0-0-0']"
    @select="this.onSelect"
    @check="this.onCheck"
  >
    <!--<a-icon slot="smile" type="smile-o" />-->
    <!--<a-icon slot="meh" type="smile-o" />-->
    <!--<template slot="custom">-->
    <!--<a-avatar size="small" icon="user"/>-->
    <!--</template>-->
  </a-tree>
</template>
<script>
const treeData = [
  {
    title: '科工二院一部（20）',
    key: '0-0',
    children: [
      {
        key: '0-0-0',
        title: '旺仔研究员1',
        head: '@/assets/sjs.jpg',
        msg: '今天一起去吃午饭吗？'
      },
      {
        title: '旺仔研究员2',
        key: '0-0-1',
        head: '@/assets/sjs.jpg',
        msg: '今天一起去吃午饭吗？'
      }
    ]
  },
  {
    title: '科工二院二部（20）',
    key: '0-1',
    children: [
      {
        title: '策划部（20）',
        key: '0-1-0',
        children: [
          {
            title: '策划部一分部（10）',
            key: '0-1-0-2',
            children: [
              {
                title: '旺仔研究员1',
                key: '0-1-0-2-0',
                head: '@/assets/sjs.jpg',
                msg: '今天一起去吃午饭吗？'
              },
              {
                title: '旺仔研究员2',
                key: '0-1-0-2-1',
                head: '@/assets/sjs.jpg',
                msg: '今天一起去吃午饭吗？'
              }
            ]
          }
        ]
      }
    ]
  }
]

export default {
  name: 'ContactList',
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
