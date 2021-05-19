import type { RouteParamsRaw } from 'vue-router'
import type { SidebarItem } from './global'

import { defineComponent, reactive, unref } from 'vue'
import { ElContainer, ElHeader, ElMain, ElAside } from 'element-plus'
import { RouterView } from 'vue-router'
import Sidebar from './components/Sidebar/Sidebar'

export default defineComponent({
  components: {
    Sidebar,
    ElContainer,
    ElHeader,
    ElMain,
    ElAside,
  },
  setup() {
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

    return () => (
      <>
        <ElContainer style={{ 'min-height': '100vh' }}>
          <ElAside>
            <Sidebar style={{ height: '100%' }} sidebar={SidebarDatas} />
          </ElAside>
          <ElContainer>
            <ElHeader></ElHeader>
            <ElMain>
              <RouterView />
            </ElMain>
          </ElContainer>
        </ElContainer>
      </>
    )
  },
})
