<template>
  <span class="el-card-tools">
    <a-radio-group
      v-if="!editing"
      defaultValue="0"
      v-model="selected"
      @change="selectedChanged"
      type="button"
      size="small">
      <a-radio-button v-if="showAll" :value="0">全部</a-radio-button>
      <a-radio-button v-for="type in showArray" :value="type.type" :key="'a-radio-button-'+type.type">{{ type.name }}</a-radio-button>
      <a-radio-button v-if="editable" :value="-1">
        <a-icon type="setting" />
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
export default {
  model: {
    prop: 'selected',
    event: 'changed'
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
  data () {
    return {
      selected: 0,
      editing: false
    }
  },
  created () {
    this.$emit('changed', this.showAll ? 0 : this.showArray[0].type)
  },
  computed: {
    showArray () {
      return this.array.filter(item => { return item.show })
    }
  },
  methods: {
    editButtonClass (type) {
      return { 'ivu-btn-primary': type.show }
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
      this.$emit('changed', this.showAll ? 0 : this.showArray[0].type)
    },
    checkChanged (type) {
      const v = !type.show
      type.show = v
    }
  }
}
</script>
<style scoped>
  .ivu-btn-primary{
    background-color: #2D8cF0;
    border-color: #2D8cF0;
    color: white;
  }
</style>
