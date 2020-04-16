// 少量用户
const zhangsan = {
  name: '张三',
  age: 25,
  career: 'coder'
}

const lisi = {
  name: '李四',
  age: 25,
  career: 'product manager'
}

// 使用构造函数来优化

function User (name, age, career) {
  this.name = name
  this.age = age
  this.career = career
}

// 上述是所有用户都具有的共性，假如需要根据不同的用户类型来添加不同的权限呢？

function Coder (name, age) {
  this.name = name
  this.age = age
  this.career = 'coder'
  this.work = ['写代码', '修bug']
}

function ProductManager (name, age) {
  this.name = name
  this.age = age
  this.career = 'product manager'
  this.work = ['写需求', '订会议室']
}

function Factory (name, age, career) {
  switch (career) {
    case 'coder':
      return new Coder(name, age)
      break
    case 'product manager':
      return new ProductManager(name, age)
      break
    // ...
  }
}

// 这样的话就就要写很多不同用户的构造函数了。。。

// 用工厂生产产品，工厂里面有不同的产品线，我们只管把原材料扔进去给工厂，让工厂来操心生产出什么产品，还需要抽离共性代码
function User (name, age, career, work) {
  this.name = name
  this.age = age
  this.career = career
  this.work = work
}

function Factory (name, age, career) {
  let work
  switch (career) {
    case 'coder':
      work = ['写代码', '修bug']
      break
    case 'product manager':
      work = ['写需求', '订会议室']
      break
  }
  return new User(name, age, career, work)
}

// 工厂模式其实就是将创建对象的过程单独封装