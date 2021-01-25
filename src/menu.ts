//只有一个的时候渲染一级菜单，
//当有孩子的时候渲染二级菜单
// route 1 可以添加 route 2  route 2 可以添加 route 3
// 一级菜单1   子菜单2   菜单详情3
const menu = [
  {
    "redirect": null,
    "path": "/dashboard",
    "component": "dashboard/index",
    "route": "1",
    "meta": {
      "keepAlive": true,
      "internalOrExternal": false,
      "icon": "home",
      "componentName": "Analysis",
      "title": "首页"
    },
    "name": "dashboard-analysis",
  },
  {
    "redirect": null,
    "path": "/table",
    "component": "/table",
    "route": "1",
    "meta": {
      "keepAlive": true,
      "internalOrExternal": false,
      "icon": "table",
      "componentName": "table",
      "title": "表格组件"
    },
    "name": "table",
    children: [
      {
        "redirect": null,
        "path": "/table/tree-table",
        "component": "table/tree-table/index",
        "route": "2",
        "meta": {
          "keepAlive": true,
          "internalOrExternal": false,
          "icon": "home",
          "componentName": "tree-table",
          "title": "树形表格"
        },
        "name": "tree-table",
      },
      {
        "redirect": null,
        "path": "/table/merge-table",
        "component": "table/merge-table/index",
        "route": "2",
        "meta": {
          "keepAlive": true,
          "internalOrExternal": false,
          "icon": "home",
          "componentName": "merge-table",
          "title": "表格合并"
        },
        "name": "merge-table",
        children: [
          {
            path: "/table/merge-table/detail1",
            component: "table/merge-table/detail1/index",
            meta: {
              title: "三级菜单-1",
            }
          },
          {
            path: "/table/merge-table/detail2",
            component: "table/merge-table/detail2/index",
            meta: {
              title: "三级菜单-2",
            }
          }
        ],
        //详情页面
        details: [
          {
            path: '/table/merge-table/details',
            route: '3'
          }
        ]
      }
    ]
  }
]

export {
  menu
}
