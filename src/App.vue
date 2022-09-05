<template>
  <div id="app">
    <a-input placeholder="请输入任务" class="my_ipt" :value="inputValue" @change="valueChange" />
    <a-button type="primary" @click="addItemToList">添加事项</a-button>
    <a-list bordered :dataSource="list" class="dt_list">
      <a-list-item slot="renderItem" slot-scope="item">
        <!-- 复选框 -->
        <a-checkbox
          :checked="item.done"
          @change="
            e => {
              changeChecked(e, item.id)
            }
          "
          >{{ item.info }}</a-checkbox
        >
        <!-- 删除链接 -->
        <a slot="actions" @click="removeItemById(item.id)">删除</a>
      </a-list-item>

      <!-- footer区域 -->
      <div class="footer" slot="footer">
        <span>{{ unDoneListLength }}条剩余</span>
        <a-button-group>
          <a-button type="highLightBtn == all? primary : default" @click="changeList('all')">全部</a-button>
          <a-button type="highLightBtn == undone? primary : default" @click="changeList('undone')">未完成</a-button>
          <a-button type="highLightBtn == done? primary : default" @click="changeList('done')">已完成</a-button>
        </a-button-group>
        <a @click="clean">清除已完成</a>
      </div>
    </a-list>
  </div>
</template>
<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
export default {
  name: 'app',
  data () {
    return {}
  },
  computed: {
    ...mapState(['list', 'inputValue', 'highLightBtn']),
    ...mapGetters(['unDoneListLength'])
  },
  created () {
    this.$store.dispatch('getList')
  },
  methods: {
    ...mapMutations(['initInputValue', 'addItem', 'removeItem', 'changeStatus', 'cleanDone', 'changeHighLight']),
    valueChange (e) {
      // console.log(e.target.value)
      this.initInputValue(e.target.value)
    },
    addItemToList () {
      if (this.inputValue.trim().length <= 0) {
        this.$message.warning('你还没有输入')
      }
      this.addItem()
    },
    removeItemById (id) {
      // console.log(id)
      this.removeItem(id)
    },
    changeChecked (e, id) {
      // console.log(e.target.checked, id)
      const params = {
        id: id,
        status: e.target.checked
      }
      this.changeStatus(params)
    },
    clean () {
      this.cleanDone()
    },
    changeList (btnName) {
      // console.log(btnName)
      this.changeHighLight(btnName)
    }
  }
}
</script>
<style scoped>
#app {
  padding: 10px;
}
.my_ipt {
  width: 500px;
  margin-right: 10px;
}
.dt_list {
  width: 500px;
  margin-top: 10px;
}
.footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
