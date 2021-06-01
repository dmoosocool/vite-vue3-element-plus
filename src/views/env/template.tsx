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
  ElLink,
  ElTag,
} from 'element-plus'

const tpl = (ctx: any) => {
  const createEnvFormDialog = () => (
    <>
      <ElDialog
        title={ctx.dialogDatas.env.id === undefined ? '添加环境' : '修改环境'}
        modelValue={ctx.dialogStatus.env}
        appendToBody={true}
        closeOnClickModal={false}
        destroyOnClose={true}
        beforeClose={(done: Function) => {
          ctx.dialogStatus.env = false
          ctx.dialogDatas.env = {}
          done()
        }}
        v-slots={{
          footer() {
            return (
              <>
                <ElButton
                  plain
                  onClick={() =>
                    ctx.dialogDatas.env.id === undefined
                      ? ctx.addEnvDialog.resetFields()
                      : ((ctx.dialogDatas.env.name = ''),
                        (ctx.dialogDatas.env.address = ''))
                  }
                >
                  重置
                </ElButton>
                <ElButton
                  type="primary"
                  plain
                  onClick={() => ctx.handlerEnvEditSubmit()}
                >
                  {ctx.dialogDatas.env.id === undefined ? '提交' : '修改'}
                </ElButton>
              </>
            )
          },
        }}
      >
        <ElForm
          ref="addEnvDialog"
          model={ctx.dialogDatas.env}
          rules={ctx.addEnvDialogRules}
        >
          <ElFormItem label="环境名称" prop="name">
            <ElInput
              modelValue={ctx.dialogDatas.env.name}
              onInput={(value: string) => (ctx.dialogDatas.env.name = value)}
            />
          </ElFormItem>

          <ElFormItem label="环境地址" prop="address">
            <ElInput
              modelValue={ctx.dialogDatas.env.address}
              onInput={(value: string) => (ctx.dialogDatas.env.address = value)}
            />
          </ElFormItem>
        </ElForm>
      </ElDialog>
      <ElButton
        type="primary"
        plain
        onClick={() => (ctx.dialogStatus.env = !ctx.dialogStatus.env)}
      >
        添加环境
      </ElButton>
      <ElButton
        type="primary"
        plain
        onClick={() => (ctx.dialogStatus.link = !ctx.dialogStatus.link)}
      >
        添加渠道链接
      </ElButton>
    </>
  )

  const createLinkFormDialog = () => (
    <>
      <ElDialog
        title={
          ctx.dialogDatas.link.id === undefined
            ? '添加渠道链接'
            : '修改渠道链接'
        }
        modelValue={ctx.dialogStatus.link}
        appendToBody={true}
        closeOnClickModal={false}
        destroyOnClose={true}
        beforeClose={(done: Function) => {
          ctx.dialogStatus.link = false
          ctx.dialogDatas.link = {}
          done()
        }}
        v-slots={{
          footer() {
            return (
              <>
                <ElButton
                  plain
                  onClick={() => {
                    ctx.dialogDatas.link.id === undefined
                      ? ctx.addLinkDialog.resetFields()
                      : ((ctx.dialogDatas.link.name = ''),
                        (ctx.dialogDatas.link.address = ''))
                  }}
                >
                  重置
                </ElButton>
                <ElButton
                  type="primary"
                  plain
                  onClick={() => ctx.handlerEnvEditSubmit()}
                >
                  {ctx.dialogDatas.link.id === undefined ? '提交' : '修改'}
                </ElButton>
              </>
            )
          },
        }}
      >
        <ElForm
          ref="addLinkDialog"
          model={ctx.dialogDatas.link}
          rules={ctx.addLinkDialogRules}
        >
          <ElFormItem label="渠道名称" prop="name">
            <ElInput
              modelValue={ctx.dialogDatas.link.name}
              onInput={(value: string) => (ctx.dialogDatas.link.name = value)}
            />
          </ElFormItem>

          <ElFormItem label="渠道地址" prop="address">
            <ElInput
              modelValue={ctx.dialogDatas.link.address}
              onInput={(value: string) =>
                (ctx.dialogDatas.link.address = value)
              }
            />
          </ElFormItem>
        </ElForm>
      </ElDialog>
    </>
  )

  return (
    <>
      <ElContainer direction="vertical">
        <ElRow class="w-full h-5 mt-10">
          <ElCol span={12} offset={6}></ElCol>
        </ElRow>

        <ElRow class="w-full mb-2">
          <ElCol span={12} offset={6}>
            {createEnvFormDialog()}
            {createLinkFormDialog()}
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
              <ElTableColumn
                prop="address"
                label="环境地址"
                formatter={(row: any) => {
                  return (
                    <ElLink type="primary" href={row.address} target="_blank">
                      {row.address}
                    </ElLink>
                  )
                }}
              ></ElTableColumn>
              <ElTableColumn
                width="80"
                label="状态"
                sortable
                prop="stauts"
                formatter={(row: any) => {
                  return row.status == '1' ? (
                    <ElTag effect="dark" size="small" type="success">
                      已启用
                    </ElTag>
                  ) : (
                    <ElTag effect="dark" size="small" type="danger">
                      已禁用
                    </ElTag>
                  )
                }}
              ></ElTableColumn>
              <ElTableColumn
                label="添加日期"
                width="180"
                prop="created"
                sortable
                formatter={(row: unknown) =>
                  new Date((row as any).created).toLocaleString()
                }
              ></ElTableColumn>
              <ElTableColumn
                label="修改日期"
                width="180"
                sortable
                prop="updated"
                formatter={(row: unknown) =>
                  new Date((row as any).updated).toLocaleString()
                }
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
                        onClick={() =>
                          ctx.handlerEnvEdit(scope.$index, scope.row)
                        }
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
            <ElTable border stripe data={ctx.tableData.links} maxHeight="240px">
              <ElTableColumn
                prop="name"
                label="渠道名称"
                width="180"
              ></ElTableColumn>
              <ElTableColumn prop="address" label="渠道地址"></ElTableColumn>
              <ElTableColumn
                width="80"
                label="状态"
                sortable
                prop="stauts"
                formatter={(row: any) => {
                  return row.status == '1' ? (
                    <ElTag effect="dark" size="small" type="success">
                      已启用
                    </ElTag>
                  ) : (
                    <ElTag effect="dark" size="small" type="danger">
                      已禁用
                    </ElTag>
                  )
                }}
              ></ElTableColumn>
              <ElTableColumn
                label="添加日期"
                width="180"
                prop="created"
                sortable
                formatter={(row: unknown) =>
                  new Date((row as any).created).toLocaleString()
                }
              ></ElTableColumn>
              <ElTableColumn
                label="修改日期"
                width="180"
                sortable
                prop="updated"
                formatter={(row: unknown) =>
                  new Date((row as any).updated).toLocaleString()
                }
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
                        onClick={() =>
                          ctx.handlerLinkEdit(scope.$index, scope.row)
                        }
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
      </ElContainer>
    </>
  )
}

export { tpl as main }
