import {
  ElContainer,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  ElSelect,
  ElOption,
  ElDatePicker,
  ElTable,
  ElTableColumn,
} from 'element-plus'

const tpl = (ctx: any) => {
  return (
    <>
      <ElContainer direction="vertical">
        <ElRow class="w-full h-5 mt-10">
          <ElCol span={12} offset={6}></ElCol>
        </ElRow>
        <ElRow class="w-full">
          <ElCol span={12} offset={6}>
            <ElForm inline class={'grid-content'}>
              <ElFormItem label="选项名称">
                <ElInput
                  type="text"
                  v-model={ctx.formData.name}
                  maxlength={10}
                  showWordLimit
                />
              </ElFormItem>

              <ElFormItem label="活动区域">
                <ElSelect v-model={ctx.formData.region}>
                  <ElOption label="区域一" value="Shanghai"></ElOption>
                  <ElOption label="区域二" value="Beijing"></ElOption>
                </ElSelect>
              </ElFormItem>

              <ElFormItem label="活动时间">
                <ElCol span={11}>
                  <ElDatePicker
                    placeholder="选择日期"
                    type="date"
                    v-model={ctx.formData.date1}
                  ></ElDatePicker>
                </ElCol>
              </ElFormItem>
            </ElForm>
          </ElCol>
        </ElRow>

        <ElRow class="w-full">
          <ElCol span={12} offset={6}>
            <ElTable border data={ctx.tableData} maxHeight="540px">
              <ElTableColumn
                prop="date"
                fixed
                label="日期"
                width="180"
              ></ElTableColumn>
              <ElTableColumn
                prop="name"
                label="姓名"
                width="180"
              ></ElTableColumn>
              <ElTableColumn prop="address" label="地址"></ElTableColumn>
            </ElTable>
          </ElCol>
        </ElRow>
      </ElContainer>
    </>
  )
}

export { tpl as main }
