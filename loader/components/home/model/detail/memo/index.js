export default {
  name: "BasicInf_meno",
  props: {
    model: {
      default: () => {
        return {};
      },
      type: Object,
    },
  },

  data() {
    return {
      tagValue: "",
      isEditTagInput: false,
    };
  },

  methods: {
    //Timestamp conversion
    timestampConversion(timeStamp) {
      const date = new Date(Number(timeStamp));
      return date.toLocaleString([], {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
      return date.getFullYear() + "/" + (date.getMonth() + 1) + "/" + date.getDate() + " " + date.getHours() + ": " + date.getMinutes();
    },
    // Delete tag
    deleteTag(index) {
      this.$emit("deleteTag", index);
    },
    // Focus event of tag input box
    editTagInput() {
      if (!this.isEditTagInput) {
        this.isEditTagInput = true;
        this.$nextTick(() => {
          const tagInput = this.$refs.tagInput;
          tagInput.focus();
        });
      }
    },
    // Blur event of tag input box
    tagInputBlur() {
      if (this.checkTagLegality()) {
        this.$emit("addTag", this.tagValue);
      }
      this.tagValue = "";
      this.isEditTagInput = false;
    },
    // Enter event for tag input box
    handleKeyDown(e) {
      if (e.key === "Enter") {
        this.createTag();
      }
    },
    // Create a tag
    createTag() {
      if (this.checkTagLegality()) {
        this.$emit("addTag", this.tagValue);
        this.tagValue = "";
        this.isEditTagInput = false;
      }
    },
    // Legality of detecting tags
    checkTagLegality() {
      if (this.tagValue === "") {
        return false;
      }
      if (this.model.tags.find((x) => x === this.tagValue)) {
        this.$message({
          type: "error",
          message: this.$t("messages.tagExists"),
        });
        return false;
      }
      return true;
    },
  },
  filters: {
    // 保留小数位数->str
    numberRound(num, decimal = 2) {
      return Math.round(num * Math.pow(10, decimal)) / Math.pow(10, decimal);
    },
  },
  template: `<div class="basic_inf_memo">
                <div class="model_inf">
                  <div class="size inf_item">
                    {{$t(model?.memo)}}
				</div>
                </div>
             </div>`,
};
