import type { SidebarItem } from './global'
import { defineComponent, reactive } from 'vue'
import Sidebar from '@/components/Sidebar/Sidebar'
import { ElContainer, ElHeader, ElMain, ElAside } from 'element-plus'
import { useRoute, RouterView } from 'vue-router'

export default defineComponent({
  components: {
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
  },

  render() {
    const SidebarDatas: SidebarItem[] = reactive([
      {
        index: '1',
        title: '首页',
        icon: 'el-icon-s-home',
        route: { name: 'Home' },
      },

      {
        index: '2',
        title: '环境设置',
        icon: 'el-icon-setting',
        route: { name: 'Env' },
      },
      {
        index: '3',
        title: '下载资源包',
        icon: 'el-icon-download',
        route: { name: 'Download' },
      },
    ])

    const getTitle = (): string => {
      const route = useRoute()
      const routeName = route.name
      const result = SidebarDatas.find((item) => item.route.name === routeName)
      return result?.title || ''
    }

    return (
      <>
        <ElContainer style={{ 'min-height': '100vh' }}>
          <ElAside>
            <Sidebar style={{ height: '100%' }} sidebar={SidebarDatas} />
          </ElAside>
          <ElContainer>
            <ElHeader
              class={
                'border-b-1 border-solid border-gray-400 border-opacity-50'
              }
            >
              <h1 class={'mt-4'} style={{ fontSize: '20px', fontWeight: 100 }}>
                {getTitle()}
              </h1>
            </ElHeader>
            <ElMain>
              <RouterView />
            </ElMain>
          </ElContainer>
        </ElContainer>
      </>
    )
  },
})
