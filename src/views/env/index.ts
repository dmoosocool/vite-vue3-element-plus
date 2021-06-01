import { defineComponent, reactive, ref, unref, nextTick, onMounted } from 'vue'
import { ElNotification, ElLoading } from 'element-plus'

import { main } from './template'
import axios from '@/utils/axios'

export default defineComponent({
  setup() {
    const formData = reactive({ name: '', region: '', date1: '' })
    const tableData = reactive({ envs: [], links: [] })
    const dialogStatus = reactive({ env: false, link: false })
    const dialogDatas = reactive({
      env: {
        name: '',
        address: '',
        id: undefined,
        status: 0,
        created: 0,
        updated: 0,
      },

      link: {
        name: '',
        address: '',
        id: undefined,
        status: 0,
        created: 0,
        updated: 0,
      },
    })

    //! ------------------------------------------------------- Env Begin
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

    const getEnvDatas = async () => {
      const res = await axios.get('/api/envs')
      tableData.envs = res.data
    }

    const handlerEnvEdit = (index: number, row: any) => {
      dialogStatus.env = true
      dialogDatas.env = row
    }

    const handlerEnvEditSubmit = () => {
      addEnvDialog.value?.validate((valid: boolean) => {
        if (valid) {
          const isEdit = dialogDatas.env.id !== 0
          let query: Promise<any>

          if (isEdit) {
            dialogDatas.env.updated = +new Date()
            query = axios.put(
              `/api/envs/${dialogDatas.env.id}`,
              dialogDatas.env
            )
          } else {
            dialogDatas.env.created = +new Date()
            dialogDatas.env.updated = +new Date()
            dialogDatas.env.status = 1
            query = axios.post('/api/envs', dialogDatas.env)
          }

          query.then((res) => {
            if (res.status === 200) {
              const tips = isEdit ? '修改成功' : '添加成功'
              ElNotification({
                type: 'success',
                title: tips,
                message: `${dialogDatas.env.name}环境,${tips}!`,
              })

              dialogStatus.env = false
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
    //! ------------------------------------------------------- Env End

    //! ------------------------------------------------------- Link Begin
    const addLinkDialog = ref()
    const addLinkDialogRules = reactive({})

    const handlerLinkEdit = (index: number, row: any) => {
      dialogStatus.link = true
      dialogDatas.link = row
    }

    const getLinkDatas = async () => {
      const res = await axios.get('/api/links')
      tableData.links = res.data
    }
    //! ------------------------------------------------------- Link End

    onMounted(() => {
      Promise.all([getEnvDatas(), getLinkDatas()])
    })

    return {
      formData,
      tableData,
      handlerEnvEdit,
      handlerEnvEditSubmit,
      addEnvDialog,
      addEnvDialogRules,
      dialogStatus,
      dialogDatas,

      handlerLinkEdit,
      addLinkDialog,
      addLinkDialogRules,
    }
  },

  render() {
    return main(this)
  },
})
