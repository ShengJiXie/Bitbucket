<template>
  <div class="home">
    <v-header title="Home" :leftState="false"></v-header>
    <van-dropdown-menu>
      <van-dropdown-item
        @change="dropdowns"
        v-model="dropdown"
        :options="option"
      />
    </van-dropdown-menu>
    <van-list>
      <van-cell
        center
        v-for="(item, key) in list"
        :key="key"
        :title="item.title"
        :to="'/detail/' + item.id"
        :value="item.status"
        :label="'Deadline:' + formatDate(item.createTime)"
        clickable
      >
        <template #title>
          <span class="custom-title">{{ item.title }}</span>
          <van-icon
            name="bookmark"
            v-if="item.es === 1"
            class="iconTitle"
            color="red"
          />
        </template>
        <template #default>
          <van-tag
            :type="
              item.status === 0
                ? 'primary'
                : item.status === 1
                ? 'success'
                : 'danger'
            "
          >
            {{
              item.status === 0
                ? "processing"
                : item.status === 1
                ? "completed"
                : "over"
            }}
          </van-tag>
        </template>
      </van-cell>
      <van-empty v-if="list.length === 0" description="No project yet" />
      <van-divider>Pending project:{{ lengthList }}</van-divider>
      <van-button
        type="info"
        icon="plus"
        style="margin: 10px"
        @click="$router.push({ name: 'Form' })"
        size="normal"
        >Add Project</van-button
      >
    </van-list>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      list: [],
      dropdown: 0,
      lengthList: 0,
      option: [
        {
          text: "All",
          value: 0,
        },
        {
          text: "To be completed",
          value: 1,
        },
        {
          text: "completed",
          value: 2,
        },
      ],
      loading: false,
    };
  },
  mounted() {
    this.list = this.storeCli.getStoreList();
    this.lengthList = this.storeCli.store_Minx_item(2).value.length;
  },
  methods: {
    dropdowns(type) {
      var params = [];
      const _this = this;
      _this.storeCli.getStoreList().map((e) => {
        switch (Number(type)) {
          case 0:
            params = _this.storeCli.getStoreList();
            break;
          case 1:
            if (e.status === 0) {
              params.push(e);
            }
            break;
          case 2:
            if (e.status != 0) params.push(e);
            break;
        }
      });
      _this.list = params;
    },
  },
};
</script>
<style>
.home .van-cell__title {
  text-align: left;
}
.home .iconTitle {
  margin-left: 5px;
}
</style>
