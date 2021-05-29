import { defineComponent, reactive, ref } from 'vue'
import { main } from './template'
import axios from '@/utils/axios'

export default defineComponent({
  setup() {
    const formData = reactive({ name: '', region: '', date1: '' })

    const tableData = reactive({
      envs: [
        {
          id: 1,
          name: 'PRD',
          address: 'https://sjkh.essence.com.cn/h5kh/index.htm',
          status: 1,
          created: 1622196562801,
          updated: 1622196577737,
        },
        {
          id: 2,
          name: 'PRD',
          address: 'https://sjkh.essence.com.cn/h5kh/index.htm',
          status: 1,
          created: 1622196562801,
          updated: 1622196577737,
        },
        {
          id: 3,
          name: 'PRD',
          address: 'https://sjkh.essence.com.cn/h5kh/index.htm',
          status: 1,
          created: 1622196562801,
          updated: 1622196577737,
        },
        {
          id: 4,
          name: 'PRD',
          address: 'https://sjkh.essence.com.cn/h5kh/index.htm',
          status: 1,
          created: 1622196562801,
          updated: 1622196577737,
        },
      ],
    })

    const dialogStatus = reactive({ addEnvDialog: false })
    const dialogDatas = reactive({ addEnvDialog: {} })
    const openAddEnvDialog = () => {
      dialogStatus.addEnvDialog = !dialogStatus.addEnvDialog
    }

    const loading = reactive({ envs: false })
    const getEnvDatas = () => {
      loading.envs = true
      axios.get('/api/envs').then((response) => {
        console.log('response:', response)
        tableData.envs = response.data
        loading.envs = false
      })
    }
    getEnvDatas()

    return {
      formData,
      tableData,
      openAddEnvDialog,
      dialogStatus,
      dialogDatas,
      loading,
    }
  },

  render() {
    return main(this)
  },
})
