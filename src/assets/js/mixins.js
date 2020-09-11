export default {
  methods: {
    emit(event, options) {
      this.$bus.$emit(event, options);
    },
    on(event, callback) {
      this.$bus.$on(event, params => {
        callback && callback(params);
      });
    },
  }
}