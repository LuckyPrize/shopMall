<template>
  <div class="pagination">
    <button @click="$emit('getPageNo', pageNo - 1)">上一页</button>
    <button
      v-if="StartandEnd.start >= 2"
      @click="$emit('getPageNo', 1)"
      :class="{ active: pageNo == 1 }"
    >
      1
    </button>
    <button v-if="StartandEnd.start >= 3">···</button>

    <button
      v-for="(page, index) in StartandEnd.end"
      :key="index"
      v-if="page >= StartandEnd.start"
      @click="$emit('getPageNo', page)"
      :class="{ active: pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="StartandEnd.end <= pageAll - parseInt(continues / 2)">
      ···
    </button>
    <button
      v-if="StartandEnd.end <= pageAll - parseInt(continues / 2) + 1"
      @click="$emit('getPageNo', pageAll)"
      :class="{ active: pageNo == pageAll }"
    >
      {{ pageAll }}
    </button>
    <button @click="$emit('getPageNo', pageNo + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{ total }} 条</button>
  </div>
</template>
  
  <script>
export default {
  name: "Pagination",
  props: ["pageNo", "continues", "total", "pageSize"],

  computed: {
    pageAll() {
      return Math.ceil(this.total / this.continues);
    },
    StartandEnd() {
      let start = 0;
      let end = 0;
      const { pageNo, continues, pageAll } = this;
      if (continues > pageAll) {
        start = 1;
        end = pageAll;
      } else {
        start = pageNo - parseInt(continues / 2);
        end = pageNo + parseInt(continues / 2);
        if (start < 1) {
          start = 1;
          end = continues;
        }
        if (end > pageAll) {
          end = pageAll;
          start = pageAll - continues;
        }
      }
      return { start, end };
    },
  },
};
</script>
  
  <style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      cursor: not-allowed;
      background-color: #409eff;
      color: #fff;
    }
  }
}
.active {
  background-color: skyblue;
}
</style>