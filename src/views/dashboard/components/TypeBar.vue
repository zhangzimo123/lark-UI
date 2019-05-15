<template>
  <span class="el-card-tools">
    <a-radio-group v-if="!editing" v-model="selected" @on-change="selectedChanged" type="button" size="small">
      <a-radio-button v-if="showAll" :label="0">全部</a-radio-button>
      <a-radio-button v-for="type in showArray" :label="type.type" :key="'a-radio-button-'+type.type">{{ type.name }}</a-radio-button>
      <a-radio-button v-if="editable" :label="-1">
        <a-icon type="tool" />
      </a-radio-button>
    </a-radio-group>
    <a-button-group v-else size="small">
      <a-button class="el-card-tools-button-editing" v-for="(type,index) in array" :key="'a-checkbox-button-'+index+'-'+type.type" :class="editButtonClass(type)" @click="checkChanged(type)">
        {{ type.name }}
      </a-button>
      <a-button class="el-card-tools-button-editing" @click="completeEdit">
        <a-icon type="check" />
      </a-button>
    </a-button-group>
  </span>
</template>
<script>
import { ToolSettingShow } from '@/api/setting'
export default {
  data () {
    return {
      selected: 0,
      editing: false
    }
  },
  props: {
    showAll: {
      type: Boolean,
      default: true
    },
    editable: {
      type: Boolean,
      default: true
    },
    array: {
      type: Array,
      required: true
    }
  },
  created () {
    this.selected = this.showAll ? 0 : this.showArray[0].type
  },
  computed: {
    showArray () {
      return this.array.filter(item => { return item.show })
    }
  },
  methods: {
    editButtonClass (type) {
      return { 'el-card-tools-button-editing': true, 'ivu-btn-primary': type.show }
    },
    selectedChanged () {
      if (this.selected === -1) {
        this.editing = true
      } else {
        this.$emit('changed', this.selected)
      }
    },
    completeEdit () {
      this.editing = false
      this.selected = this.showAll ? 0 : this.showArray[0].type
      this.$emit('changed', this.selected)
    },
    checkChanged (type) {
      const v = !type.show
      ToolSettingShow(type.id, v).then(({ data, status }) => {
        type.show = v
      })
    }
  }
}
</script>
