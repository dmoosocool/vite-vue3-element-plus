import { defineComponent } from 'vue'
import { ElContainer, ElHeader, ElMain, ElAside } from 'element-plus'

import Sidebar from './components/Sidebar/Sidebar'
export default defineComponent({
  components: {
    Sidebar,
  },
  setup() {
    return () => (
      <>
        <ElContainer>
          <ElAside width="200px">
            <Sidebar />
          </ElAside>
          <ElContainer>
            <ElHeader></ElHeader>
            <ElMain>
              <router-view></router-view>
            </ElMain>
          </ElContainer>
        </ElContainer>
      </>
    )
  },
})
