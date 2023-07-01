
/**
 * 获取模板列表
 * @returns Promise
 */
async function getRepoList() {
  return [
    {
      name:'React-Ts',
      url:'https://github.com/laterly/react-ts.git'
    },
    {
      name:'Vue3-Ts',
      url:'https://github.com/laterly/vue3-ts-webpack5.git'
    }
  ]
}

module.exports = {
  getRepoList
}