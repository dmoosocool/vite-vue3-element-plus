import type { JSON, SidebarItem } from '@/global'
import { defineComponent, ref, unref } from 'vue'
import { ElMenu, ElMenuItem, ElMenuItemGroup, ElSubmenu } from 'element-plus'
import { listenerRouteChange } from '@/logics/mitt/routeChange'
import { REDIRECT_NAME } from '@/router/constants'

export default defineComponent({
  components: {
    ElMenu,
    ElMenuItem,
    ElMenuItemGroup,
    ElSubmenu,
  },

  props: {
    sidebar: {
      type: Object as () => SidebarItem[],
      required: true,
    },
  },

  setup({ sidebar }) {
    // currentActiveMenu default by index: 1
    const currentActiveMenu = ref('1')

    listenerRouteChange((route) => {
      if (route.name === REDIRECT_NAME) return

      let currentItem = sidebar.find((item) => {
        const { route: currentRoute } = item
        return currentRoute.name === route.name
      })
      currentActiveMenu.value = currentItem?.index as string
    })

    const genSidebar = (datas: SidebarItem[]) => {
      return (
        <ElMenu
          default-active={unref(currentActiveMenu)}
          unique-opened={true}
          router={true}
        >
          {datas.map((item) => {
            const hasChildren = Object.keys(item).includes('children')
            return hasChildren ? (
              <ElSubmenu
                index={item.index}
                v-slots={{
                  title: () => (
                    <>
                      <i class={item.icon}></i>
                      <span>{item.title}</span>
                    </>
                  ),
                }}
              >
                {item.children?.map((childItem) => {
                  const hasGroup = Object.keys(childItem).includes('group')
                  const hasChildren =
                    Object.keys(childItem).includes('children')
                  if (hasGroup) {
                    return (
                      <ElMenuItemGroup title={childItem.title}>
                        {childItem.group?.map((childItemGroup) => {
                          return (
                            <ElMenuItem index={childItemGroup.index}>
                              {childItemGroup.title}
                            </ElMenuItem>
                          )
                        })}
                      </ElMenuItemGroup>
                    )
                  }

                  if (hasChildren) {
                    return (
                      <ElSubmenu
                        index={childItem.index}
                        v-slots={{ title: () => <>{childItem.title}</> }}
                      >
                        {childItem.children?.map((childItemChildren) => {
                          return (
                            <ElMenuItem index={childItemChildren.index}>
                              {childItemChildren.title}
                            </ElMenuItem>
                          )
                        })}
                      </ElSubmenu>
                    )
                  }
                })}
              </ElSubmenu>
            ) : (
              <ElMenuItem
                index={item.index}
                route={item.route}
                v-slots={{ title: () => <>{item.title}</> }}
              >
                <i class={item.icon}></i>
              </ElMenuItem>
            )
          })}
        </ElMenu>
      )
    }

    return () => genSidebar(sidebar)
  },
})
