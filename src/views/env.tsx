import { defineComponent } from 'vue'
import { ElButton } from 'element-plus'

export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    return () => (
      <>
        <ElButton type="primary">环境设置</ElButton>
      </>
    )
  },
})
