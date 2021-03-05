<!--  
 * @description:新增/修改页面 
 * @fileName: Form.vue 
 * @author: Javi
 * @date: 2021-03-05 13:53:40 
 * @version: V1.0 
 !-->
<template>
  <div class="From">
    <v-header title="Task Add Form" :leftState="true"></v-header>
    <van-form @submit="onSubmit" autocomplete="off" colon>
      <van-field
        v-model="form.title"
        name="title"
        label="Title"
        placeholder="Title"
        :rules="[{ required: true, message: 'Please fill in the title' }]"
      />

      <van-field
        v-model="form.content"
        :autosize="{ minHeight: 100 }"
        label="Content"
        name="content"
        placeholder="Content"
        type="textarea"
        show-word-limit
        maxlength="400"
        :rules="[{ required: true, message: 'Please fill in the Content' }]"
      />
      <van-field
        readonly
        clickable
        name="endTime"
        :value="form.endTime ? formatDate(form.endTime) : null"
        label="End Time"
        placeholder="End Time"
        @click="show = true"
        :rules="[{ required: true, message: 'Please fill in the End Time' }]"
      />
      <van-popup
        v-model="show"
        round
        position="bottom"
        :style="{ height: '30%' }"
      >
        <van-datetime-picker
          v-model="currentDate"
          type="datetime"
          title="Select complete time"
          @confirm="onConfirm"
          @cancel="show = false"
          :min-date="minDate"
          :max-date="maxDate"
        />
      </van-popup>

      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      minDate: new Date(),
      maxDate: new Date(2025, 10, 1),
      currentDate: new Date(),
      state: this.$route.name == "Form",
      form: {
        createTime: new Date().getTime(),
        title: null,
        content: null,
        endTime: null,
        status: 0,
        do: false,
      },
    };
  },
  methods: {
    onConfirm(value) {
      this.form.endTime = value.getTime();
      this.show = false;
    },
    onSubmit() {
      if (this.state) {
        let id = parseInt(new Date().getTime() * Math.random() * 2);
        this.form.id = id;
      }
      if (this.storeCli.setStoreDetails(this.form, this.state ? 0 : 1)) {
        this.$notify({
          type: "success",
          message: this.state
            ? "Created successfully"
            : "Successfully modified",
        });
        setTimeout(() => {
          this.$router.push({ name: "Home" });
        }, 1000);
      }
    },
  },
  mounted() {
    if (this.$route.name == "Form_handle") {
      this.form = this.storeCli.getStoreDetails(this.$route.params.id);
    }
  },
};
</script>

<style>
.From {
  padding: 0px;
}
</style>