<template>
  <div class="detail">
    <v-header
      title="Task details"
      :leftState="true"
      :rightCode="items ? items.status : 0"
    ></v-header>

    <div v-if="show">
      <section class="main">
        <h3 class="van-multi-ellipsis--l2">{{ items.title }}</h3>
        <p>
          Status:{{
            items.status === 0
              ? "Project waiting to be completed"
              : items.status === 1
              ? "Project completed"
              : "The project has been terminated and the time has expired"
          }}
        </p>
        <van-row>
          <van-col :span="6">
            <label for="createTime">Create Time:</label>
          </van-col>
          <van-col :span="10">
            <span v-html="formatDate(items.createTime)"></span>
          </van-col>
        </van-row>
        <van-row>
          <van-col :span="6">
            <label for="endTime">End Time:</label>
          </van-col>
          <van-col :span="10">
            <span v-html="formatDate(items.endTime)"></span>
          </van-col>
        </van-row>
        <van-divider :style="{ borderColor: '#c8c9cc' }" />
        <article v-html="items.content"></article>
        <van-divider :style="{ borderColor: '#c8c9cc' }" />
        <van-row style="margin: 10px 0">
          <van-col :span="24">
            <van-button
              type="primary"
              :disabled="items.do"
              @click="setStore(items.id)"
              plain
              block
              >Mark as completed</van-button
            >
          </van-col>
        </van-row>
        <van-row gutter="20">
          <van-col :span="12">
            <van-button
              type="info"
              size="large"
              @click="$router.push('/Form/' + items.id)"
              >Edit</van-button
            >
          </van-col>
          <van-col :span="12">
            <van-button type="danger" size="large" @click="deleteItem(items.id)"
              >Delete</van-button
            >
          </van-col>
        </van-row>
        <p class="van-ellipsis auther">Auther:Javi</p>
      </section>
    </div>
    <van-empty image="error" v-else description="No Task" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      items: {},
    };
  },
  methods: {
    setStore(id) {
      if (this.storeCli.setStoreStatus(id)) {
        this.requestView();
        this.$notify({ message: "Handle Success", type: "success" });
      }
    },
    deleteItem(id) {
      this.$dialog
        .confirm({
          title: "Delete",
          message: "Are you sure to delete this item?",
        })
        .then(() => {
          const DeleteState = this.storeCli.removeStoreDetails(id);
          if (DeleteState) {
            this.$notify("Delete Success");
            setTimeout(() => {
              this.$router.push({ name: "Home" });
            }, 2000);
          }
        });
    },
    requestView() {
      this.items = this.storeCli.getStoreDetails(this.$route.params.id);
      if (this.items) {
        this.show = true;
      }
    },
  },
  created() {
    this.requestView();
  },
};
</script>

<style>
.detail .main {
  text-align: left;
  padding: 0px 10px;
}
.detail .main article {
  min-height: 300px;
}
.detail .main .van-row {
  font-size: 14px;
  line-height: 20px;
}
.auther {
  text-align: center;
}
</style>