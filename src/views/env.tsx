import { defineComponent, reactive, ref } from 'vue'
import {
  ElButton,
  ElContainer,
  ElForm,
  ElFormItem,
  ElInput,
} from 'element-plus'

export default defineComponent({
  components: {
    ElButton,
  },
  setup() {
    const formData = reactive({ name: '' })
    // const btn = ref<InstanceType<typeof ElButton>>()
    return () => (
      <>
        <ElContainer>
          <ElForm label-width="80">
            <ElFormItem label="选项名称">
              <ElInput
                type="text"
                v-model={formData.name}
                maxlength={10}
                showWordLimit
              />
            </ElFormItem>
          </ElForm>
        </ElContainer>
      </>
    )
  },
})
