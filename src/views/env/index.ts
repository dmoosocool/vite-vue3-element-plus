import type {} from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { ElNotification, ElForm } from 'element-plus'

import { main } from './template'
import axios from '@/utils/axios'

export default defineComponent({
  setup() {
    const formData = reactive({ name: '', region: '', date1: '' })
    const tableData = reactive({ envs: [] })
    const dialogStatus = reactive({ addEnvDialog: false })
    const dialogDatas = reactive({
      addEnvDialog: {
        name: '',
        address: '',
        id: 0,
        status: 0,
        created: 0,
        updated: 0,
      },
    })

    const addEnvDialog = ref()

    const addEnvDialogRules = reactive({
      name: [
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
      address: [
        {
          type: 'url',
          required: true,
          message: '请输入包含(http|https)协议的环境地址',
          trigger: 'blur',
        },
      ],
    })

    const openAddEnvDialog = () => {
      dialogStatus.addEnvDialog = !dialogStatus.addEnvDialog
    }

    const handlerEnvEdit = (index: number, row: any) => {
      dialogStatus.addEnvDialog = true
      dialogDatas.addEnvDialog = row
    }

    const loading = reactive({ envs: false })

    const getEnvDatas = (callback?: () => void) => {
      loading.envs = true
      setTimeout(() => {
        axios.get('/api/envs').then((response) => {
          tableData.envs = response.data
          loading.envs = false
          callback && callback()
        })
      }, 3000)
    }

    const handlerEnvEditSubmit = () => {
      addEnvDialog.value?.validate((valid: boolean) => {
        if (valid) {
          const isEdit = dialogDatas.addEnvDialog.id !== 0
          let query: Promise<any>

          if (isEdit) {
            dialogDatas.addEnvDialog.updated = +new Date()
            query = axios.put(
              `/api/envs/${dialogDatas.addEnvDialog.id}`,
              dialogDatas.addEnvDialog
            )
          } else {
            dialogDatas.addEnvDialog.created = +new Date()
            dialogDatas.addEnvDialog.updated = +new Date()
            dialogDatas.addEnvDialog.status = 1
            query = axios.post('/api/envs', dialogDatas.addEnvDialog)
          }

          query.then((res) => {
            if (res.status === 200) {
              const tips = isEdit ? '修改成功' : '添加成功'
              ElNotification({
                type: 'success',
                title: tips,
                message: `${dialogDatas.addEnvDialog.name}环境,${tips}!`,
              })

              dialogStatus.addEnvDialog = false
            }
          })
        } else {
          ElNotification({
            type: 'error',
            title: '表单填写错误',
            message: '请核对表单信息后再次提交',
          })
          return false
        }
      })
    }

    getEnvDatas()

    return {
      formData,
      tableData,
      openAddEnvDialog,
      handlerEnvEdit,
      handlerEnvEditSubmit,
      addEnvDialog,
      addEnvDialogRules,
      dialogStatus,
      dialogDatas,
      loading,
    }
  },

  render() {
    return main(this)
  },
})
