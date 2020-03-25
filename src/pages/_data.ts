import { ListItem } from './index'

const mockData: ListItem[] = [{
  id: 'g1',
  title: '科目一',
  person: '随机人',
  department: '网络开发部',
  finishRate: 0.97,
  childList: [
    {
      id: 'g11',
      title: '科目1下属1',
      person: '负责人1',
      department: '运营部门',
      finishRate: 0,
      childList: [
        {
          id: 'g111',
          title: '科目1下属1dddd',
          person: '负责人1',
          department: '运营部门',
          finishRate: 0.34
        }
      ]
    },
    {
      id: 'g12',
      title: '科目1下属2',
      person: '负责人1',
      department: '运营部门',
      finishRate: 0
    },
    {
      id: 'g13',
      title: '科目1下属3',
      person: '负责人1',
      department: '运营部门',
      finishRate: 0
    },
    {
      id: 'g14',
      title: '科目1下属4',
      person: '负责人1',
      department: '运营部门',
      finishRate: 0
    },
  ]
}]

export default mockData
