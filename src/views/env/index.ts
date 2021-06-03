import { defineComponent, reactive, ref, unref, onMounted } from 'vue'
import { ElNotification } from 'element-plus'

import { main } from './template'
import axios from '@/utils/axios'

export default defineComponent({
  setup() {
    const formData = reactive({ name: '', region: '', date1: '' })
    const tableData = reactive({ envs: [], links: [] })
    const dialogStatus = reactive({ env: false, link: false })
    //! ------------------------------------------------------- Download Resource Package Start
    const DownloadResourcePackageData = ref({ env: {}, link: {} })
    const handleDownloadResourcePackage = () => {
      if (
        Object.keys(DownloadResourcePackageData.value.env).length === 0 ||
        Object.keys(DownloadResourcePackageData.value.link).length === 0
      ) {
        return ElNotification({
          type: 'error',
          title: '下载资源包缺少必须项',
          message: '请选择需要下载资源包的环境及渠道链接',
        })
      }
    }
    //! ------------------------------------------------------- Download Resource Package End

    const defaultDatas = {
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
    }
    const dialogDatas = reactive({
      env: defaultDatas.env,
      link: defaultDatas.link,
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
      return Promise.resolve(res.data)
    }

    const handlerEnvEdit = (index: number, row: any) => {
      dialogStatus.env = true
      dialogDatas.env = row
    }

    const handlerEnvEditSubmit = () => {
      addEnvDialog.value?.validate((valid: boolean) => {
        if (valid) {
          const isEdit = dialogDatas.env.id !== undefined
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
              dialogDatas.env = defaultDatas.env
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
      return Promise.resolve(res.data)
    }

    const handlerLinkEditSubmit = () => {
      addLinkDialog.value?.validate((valid: boolean) => {
        if (valid) {
          const isEdit = dialogDatas.link.id !== undefined
          let query: Promise<any>

          if (isEdit) {
            dialogDatas.link.updated = +new Date()
            query = axios.put(
              `/api/links/${dialogDatas.link.id}`,
              dialogDatas.link
            )
          } else {
            dialogDatas.link.created = +new Date()
            dialogDatas.link.updated = +new Date()
            dialogDatas.link.status = 1
            query = axios.post('/api/links', dialogDatas.link)
          }

          query.then((res) => {
            if ([200, 201].indexOf(res.status) > -1) {
              const tips = isEdit ? '修改成功' : '添加成功'
              ElNotification({
                type: 'success',
                title: tips,
                message: `${dialogDatas.link.name}渠道,${tips}!`,
              })

              dialogStatus.link = false
              dialogDatas.link = defaultDatas.link
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
    //! ------------------------------------------------------- Link End

    //! ------------------------------------------------------- Autocomplete Env Start
    const selectEnv = ref('')
    const selectEnvs = ref([])
    const handleSelectEnvOnSearch = (
      queryString: string,
      callback: (...arg: any[]) => void
    ) => {
      var results = queryString
        ? selectEnvs.value.filter(createFilter(queryString))
        : selectEnvs.value

      callback(results)
    }

    const createFilter = (queryString: string) => {
      return (selectEnvs: any) => {
        return (
          selectEnvs.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        )
      }
    }

    const handleSelectEnv = (item: any) => {
      selectEnv.value = item.name
      DownloadResourcePackageData.value.env = item
    }

    const handleSelectEnvInput = (str: string) => {
      selectEnv.value = str
      DownloadResourcePackageData.value.env = {}
    }

    //! ------------------------------------------------------- Autocomplete Env End

    //! ------------------------------------------------------- Autocomplete Link Start
    const selectLink = ref('')
    const selectLinks = ref([])
    const handleSelectLinkOnSearch = (
      queryString: string,
      callback: (...arg: any[]) => void
    ) => {
      var results = queryString
        ? selectLinks.value.filter(createLinksFilter(queryString))
        : selectLinks.value

      callback(results)
    }

    const createLinksFilter = (queryString: string) => {
      return (selectLinks: any) => {
        return (
          selectLinks.name.toLowerCase().indexOf(queryString.toLowerCase()) ===
          0
        )
      }
    }

    const handleSelectLink = (item: any) => {
      selectLink.value = item.name
      DownloadResourcePackageData.value.link = item
    }

    const handleSelectLinkInput = (str: string) => {
      selectLink.value = str
      DownloadResourcePackageData.value.link = {}
    }

    //! ------------------------------------------------------- Autocomplete Link End

    onMounted(() => {
      Promise.all([getEnvDatas(), getLinkDatas()]).then(([envs, links]) => {
        selectEnvs.value = envs
        selectLinks.value = links
      })
    })

    return {
      formData,
      tableData,
      dialogStatus,
      dialogDatas,

      handlerEnvEdit,
      handlerEnvEditSubmit,
      addEnvDialog,
      addEnvDialogRules,

      handlerLinkEdit,
      handlerLinkEditSubmit,
      addLinkDialog,
      addLinkDialogRules,

      selectEnv,
      handleSelectEnv,
      handleSelectEnvOnSearch,
      handleSelectEnvInput,

      selectLink,
      handleSelectLink,
      handleSelectLinkOnSearch,
      handleSelectLinkInput,

      DownloadResourcePackageData,
      handleDownloadResourcePackage,
    }
  },

  render() {
    return main(this)
  },
})
