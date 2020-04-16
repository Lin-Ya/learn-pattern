// 抽象工厂模式

// 上回提及到的简单工厂模式
{
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
      case 'boss':
        work = ['喝茶', '看报', '见客户']
        break
      // ...其他工种
    }
    return new User(name, age, career, work)
  }
}

// 假如需要把管理层、老板这些身份与普通员工的权限区分开，或者对某些特定的群体添加特性的逻辑处理？
// 统统在factory函数里面处理吗？不利于拓展跟管理，函数日后会变得异常庞大
// 以手机作为例子，一个手机是 软件+硬件
{
  class MobilePhoneFactory {
    // 软件
    createOS () {
      throw new Error('抽象工厂方法不允许直接调用，你要将我重写')
    }

    // 硬件
    createHardWare () {
      throw new Error('抽象工厂方法不允许直接调用，你要将我重写')
    }
  }

  //MobilePhoneFactory这就是一个抽象工厂类，不允许直接调用，而应该通过继承的方式创建具体的工厂类
  // 下面实现一个具体工厂类
  class XiaoMiFactory extends MobilePhoneFactory {
    createOS () {
      // 使用安卓实例
      return new AndroidOS()
    }

    createHardWare () {
      // 使用高通实例
      return new QualcommHardWare()
    }
  }

  // 紧接着开始实现 抽象产品类（工厂当然包括有产品啦，工厂有抽象跟具体之分，那么产品也可以有抽象和具体）
  class OS {
    controlHardWare () {
      throw new Error('你不应该直接调用我，而是重写我')
    }
  }
  // 具体产品类
  class AndroidOS extends OS {
    controlHardWare () {
      console.log('使用安卓的方式来控制硬件')
    }
  }
  class AppleOS extends OS {
    controlHardWare () {
      console.log('使用苹果的方式来控制硬件')
    }
  }

  // 硬件同理
  class HardWare {
    operateByOrder () {
      throw new Error('你不应该直接调用我，而是重写我')
    }
  }
  class QualcommHardWare extends HardWare {
    operateByOrder () {
      console.log('使用高通硬件的方式运行')
    }
  }

  const miPhone = new XiaoMiFactory()
  const miui = miPhone.createOS()
  const mi10 = miPhone.createHardWare()
  miui.controlHardWare() //运行软件
  mi10.operateByOrder() //运行硬件

  // 当以后需要拓展新的手机工厂，只需要重新构建一个新的具体工厂类即可
  class ApplePhone extends MobilePhoneFactory {
    createOS () {
      return new AppleOS()
    }
    createHardWare () {
      return new QualcommHardWare()
    }
  }
}
