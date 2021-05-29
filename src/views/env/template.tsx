import {
  ElContainer,
  ElForm,
  ElFormItem,
  ElInput,
  ElRow,
  ElCol,
  ElTable,
  ElTableColumn,
  ElButton,
  ElDialog,
  ElNotification,
  ElTag,
} from 'element-plus'

const tpl = (ctx: any) => {
  const addEnvDialogRules = {
    envName: [
      {
        required: true,
        message: '请输入环境名称',
        trigger: 'blur',
      },
      {
        min: 1,
        max: 10,
        message: '长度不能大于10',
        trigger: 'blur',
      },
    ],
    envAddress: [
      {
        type: 'url',
        required: true,
        message: '请输入包含(http|https)协议的环境地址',
        trigger: 'blur',
      },
    ],
  }

  const handlerEnvEdit = (index: unknown, row: unknown) => {
    ctx.dialogStatus.addEnvDialog = true
    ctx.dialogDatas.addEnvDialog = row
  }

  return (
    <>
      <ElContainer direction="vertical">
        <ElRow class="w-full h-5 mt-10">
          <ElCol span={12} offset={6}></ElCol>
        </ElRow>

        <ElRow class="w-full mb-2">
          <ElCol span={12} offset={6}>
            <ElDialog
              title={
                ctx.dialogDatas.addEnvDialog.id === undefined
                  ? '添加环境'
                  : '修改环境'
              }
              modelValue={ctx.dialogStatus.addEnvDialog}
              appendToBody={true}
              closeOnClickModal={false}
              destroyOnClose={true}
              beforeClose={(done: Function) => {
                ctx.dialogStatus.addEnvDialog = false
                ctx.dialogDatas.addEnvDialog = {}
                done()
              }}
              v-slots={{
                footer() {
                  return (
                    <>
                      <ElButton
                        plain
                        onClick={() => ctx.$refs['addEnvDialog'].resetFields()}
                      >
                        重置
                      </ElButton>
                      <ElButton
                        type="primary"
                        plain
                        onClick={() => {
                          ctx.$refs['addEnvDialog'].validate(
                            (valid: boolean) => {
                              if (valid) {
                                // console.log(ctx.dialogDatas.addEnvDialog)
                              } else {
                                // console.log(ctx.$notify)
                                ElNotification({
                                  type: 'error',
                                  title: '表单填写错误',
                                  message: '请核对表单信息后再次提交',
                                })
                                return false
                              }
                            }
                          )
                        }}
                      >
                        {ctx.dialogDatas.addEnvDialog.id === undefined
                          ? '提交'
                          : '修改'}
                      </ElButton>
                    </>
                  )
                },
              }}
            >
              <ElForm
                ref="addEnvDialog"
                model={ctx.dialogDatas.addEnvDialog}
                rules={addEnvDialogRules}
              >
                <ElFormItem label="环境名称" prop="name">
                  <ElInput
                    modelValue={ctx.dialogDatas.addEnvDialog.name}
                    onInput={(value: string) =>
                      (ctx.dialogDatas.addEnvDialog.name = value)
                    }
                  />
                </ElFormItem>

                <ElFormItem label="环境地址" prop="address">
                  <ElInput
                    modelValue={ctx.dialogDatas.addEnvDialog.address}
                    onInput={(value: string) =>
                      (ctx.dialogDatas.addEnvDialog.address = value)
                    }
                  />
                </ElFormItem>
              </ElForm>
            </ElDialog>
            <ElButton type="primary" plain onClick={ctx.openAddEnvDialog}>
              添加环境
            </ElButton>
            <ElButton type="primary" plain>
              添加渠道链接
            </ElButton>
          </ElCol>
        </ElRow>

        <ElRow class="w-full">
          <ElCol span={12} offset={6}>
            <h1 class="mb-4" style={{ fontSize: '20px', fontWeight: 100 }}>
              环境
            </h1>
          </ElCol>
        </ElRow>

        <ElRow class="w-full">
          <ElCol span={12} offset={6}>
            <ElTable border stripe data={ctx.tableData.envs} maxHeight="240px">
              <ElTableColumn
                prop="name"
                label="环境名称"
                width="180"
              ></ElTableColumn>
              <ElTableColumn prop="address" label="环境地址"></ElTableColumn>
              <ElTableColumn
                width="80"
                label="状态"
                v-slots={{
                  default: (scope: any) => (
                    <>
                      {scope.row.status == '1' ? (
                        <ElTag effect="dark" size="small" type="success">
                          已启用
                        </ElTag>
                      ) : (
                        <ElTag effect="dark" size="small" type="danger">
                          已禁用
                        </ElTag>
                      )}
                    </>
                  ),
                }}
              ></ElTableColumn>
              <ElTableColumn
                label="添加日期"
                width="180"
                v-slots={{
                  default: (scope: any) => (
                    <>
                      <span>
                        {new Date(scope.row.created).toLocaleString()}
                      </span>
                    </>
                  ),
                }}
              ></ElTableColumn>
              <ElTableColumn
                label="修改日期"
                width="180"
                v-slots={{
                  default: (scope: any) => (
                    <>
                      <span>
                        {new Date(scope.row.updated).toLocaleString()}
                      </span>
                    </>
                  ),
                }}
              ></ElTableColumn>
              <ElTableColumn
                label="操作"
                width="80"
                v-slots={{
                  default: (scope: any) => (
                    <>
                      <ElButton
                        type="primary"
                        size="mini"
                        onClick={() => handlerEnvEdit(scope.$index, scope.row)}
                      >
                        编辑
                      </ElButton>
                    </>
                  ),
                }}
              ></ElTableColumn>
            </ElTable>
          </ElCol>
        </ElRow>

        <ElRow class="w-full mt-8">
          <ElCol span={12} offset={6}>
            <h1 class="mb-4" style={{ fontSize: '20px', fontWeight: 100 }}>
              渠道链接
            </h1>
          </ElCol>
        </ElRow>

        <ElRow class="w-full">
          <ElCol span={12} offset={6}>
            <ElTable border stripe data={ctx.tableData.envs} maxHeight="240px">
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
