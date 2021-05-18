import { defineComponent, reactive } from 'vue'
import { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu } from 'element-plus'

export default defineComponent({
  components: {
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubmenu,
  },
  setup() {
    const SidebarDatasDefaultOpeneds = reactive(['1', '1-4'])

    const SidebarDatas = reactive([
      {
        index: '1',
        title: '导航一',
        icon: 'el-icon-lcation',
        children: [
          {
            title: '分组1',
            group: [
              {
                index: '1-1',
                title: '选项1',
              },
              {
                index: '1-2',
                title: '选项2',
              },
            ],
          },

          {
            title: '分组2',
            group: [
              {
                index: '1-3',
                title: '选项3',
              },
            ],
          },

          {
            title: '分组3',
            index: '1-4',
            children: [
              {
                index: '1-4-1',
                title: '选项1',
              },

              {
                index: '1-4-2',
                title: '选项2',
              },

              {
                index: '1-4-3',
                title: '选项3',
              },
            ],
          },
        ],
      },

      {
        index: '2',
        title: '导航二',
        icon: 'el-icon-menu',
      },

      {
        index: '3',
        title: '导航三',
        icon: 'el-icon-menu',
      },
      {
        index: '4',
        title: '导航四',
        icon: 'el-icon-menu',
      },
    ])

    return () => (
      <ElMenu default-openeds={SidebarDatasDefaultOpeneds}>
        {SidebarDatas.map((item, n) => {
          console.log(item)
          return (
            <ElMenuItem
              index={item.index}
              v-slots={{ title: () => <>{item.title}</> }}
            >
              <i class="el-icon-menu"></i>
            </ElMenuItem>
          )
        })}
        {/* <ElSubmenu
          index="1"
          v-slots={{
            title: () => (
              <>
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </>
            ),
          }}
        >
          <ElMenuItemGroup title="分组一">
            <ElMenuItem index="1-1">选项1</ElMenuItem>
            <ElMenuItem index="1-2">选项2</ElMenuItem>
          </ElMenuItemGroup>

          <ElMenuItemGroup title="分组2">
            <ElMenuItem index="1-3">选项3</ElMenuItem>
          </ElMenuItemGroup>

          <ElSubmenu index="1-4" v-slots={{ title: () => <>子导航</> }}>
            <ElMenuItem index="1-4-1">选项1</ElMenuItem>
            <ElMenuItem index="1-4-2">选项2</ElMenuItem>
            <ElMenuItem index="1-4-3">选项3</ElMenuItem>
          </ElSubmenu>
        </ElSubmenu>

        <ElMenuItem index="2" v-slots={{ title: () => <>导航二</> }}>
          <i class="el-icon-menu"></i>
        </ElMenuItem>

        <ElMenuItem
          index="3"
          v-slots={{
            title: () => <>导航三</>,
          }}
        >
          <i class="el-icon-document"></i>
        </ElMenuItem>

        <ElMenuItem
          index="4"
          v-slots={{
            title: () => <>导航四</>,
          }}
        >
          <i class="el-icon-menu"></i>
        </ElMenuItem> */}
      </ElMenu>
    )
  },
})
