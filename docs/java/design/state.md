#### 导言

假设我们现在有一个糖果机项目，那么我们知道正常一般糖果机提供给用户的行为有这么几种：投入硬币、转动曲柄、退出硬币几种行为；那么糖果机呢一般有这几中状态，待机状态、持有硬币的准备状态、运行状态即正在售出状态和初始状态 这么几种正常状态。 我们发现处于不同状态的时候，持有的行为是不一样的，图如下：

![Candy Machine](\img\糖果机.png "糖果机")

如果我们采用传统的方法来写代码，那么在投入硬币这个行为操作的时候，我们会进行状态的判断，只有在处于待机状态情况下这种行为是正常的，而其他则非正常，那么其他行为也一样，都需要去先判断下当前的状态来进行操作。得到的代码则为：

```java
package study.designmode.statemode;

public class CandyMachine {
    final static int SoldOutState = 0; //初始状态
    final static int OnReadyState = 1;  //待机状态
    final static int HasCoin = 2;  //准备状态
    final static int SoldState = 3;  //售出状态

    private int state = SoldOutState; //变量,用于存放当前的状态值
    private int count; //糖果的数目

    public CandyMachine(int count) {
        this.count = count;
        if (count > 0) {
            state = OnReadyState;
        }
    }

    //投入硬币行为的时候，通过判断当前的状态来匹配所有的状态.
    public void insertCoin() {
        switch (state) {
            case SoldOutState:
                System.out.println("you can't insert coin,the machine sold out!");
                break;
            case OnReadyState: //只有在待机状态的时候,投入硬币行为正确,并将状态改变为准备状态
                state = HasCoin;
                System.out.println("you have inserted a coin,next,please turn crank!");
                break;
            case HasCoin:
                System.out.println("you can't insert another coin!");
                break;
            case SoldState:
                System.out.println("please wait!we are giving you a candy!");
                break;
        }
    }

    //回退硬币
    public void returnCoin() {
        switch (state) {
            case SoldOutState:
                System.out.println("you can't return,you haven't inserted a coin yet!");
                break;
            case OnReadyState:
                System.out.println("you haven't inserted a coin yet!");
                break;
            case HasCoin:
                System.out.println("coin return!");
                state = OnReadyState;
                break;
            case SoldState:
                System.out.println("sorry,you already have turned the crank!");
                break;
        }
    }

    //转动曲柄
    public void turnCrank() {
        switch (state) {
            case SoldOutState:
                System.out.println("you turned,but there are no candies!");
                break;
            case OnReadyState:
                System.out.println("you turned,but you haven't inserted a coin!");
                break;
            case HasCoin:
                System.out.println("crank turn...!");
                state = SoldState;
                dispense();
                break;
            case SoldState:
                System.out.println("we are giving you a candy,turning another get nothing,!");
                break;
        }
    }

    //触发发放糖果行为
    private void dispense() {
        count = count - 1;
        System.out.println("a candy rolling out!");
        if (count > 0) {
            state = OnReadyState;
        } else {
            System.out.println("Oo,out of candies");
            state = SoldOutState;
        }
    }

    public void printstate() {
        switch (state) {
            case SoldOutState:
                System.out.println("***SoldOutState***");
                break;
            case OnReadyState:
                System.out.println("***OnReadyState***");
                break;
            case HasCoin:
                System.out.println("***HasCoin***");
                break;
            case SoldState:
                System.out.println("***SoldState***");
                break;
        }
    }
}
```

那么上面这种方式存在什么问题呢？首先很直观的感受就是:

  1. 存在大量的switch case 语句 当然可以用if else 也是一样的。
  2. 可扩展性差，并且一旦要加入一种新的状态，那么就会要修改所有的switch case 不符合开闭原则
  3. 没有采用面向对象的方式去封装

比如，这个时候，新增加了一种状态，赢家状态，即可以获取到两粒糖果；那么如果用上面的方式，肯定是不符合开闭原则的，同时扩展性也是不好的；那么我们有什么其它的方式来解决呢？

#### 状态模式

为了解决上面的问题，我们首先分析项目中变化的部分和不变的部分，抽化出变化的部分，我们发现糖果机提供的行为一般是不变的，就是投入硬币、转动曲柄给、退回硬币、机器发放糖果；而糖果机的状态是可以变化的，可以新增出一种状态来，比如我们说的赢家状态。那么我们这个抽出变化的部分，即我们说的状态，于是出现了下面的结构设计方案：

![State Pattern](\img\状态模式设计.png)

这个结构图告诉我们，提炼出状态接口出来，然后将各个状态抽出，并去实现接口，每个状态都持有投入硬币，退回硬币，转动曲柄、售出糖果这几种行为对应的方法做出相应；而糖果机持有所有的状态，并通过引用状态接口来操作各个状态；这种设计架构就是我们说的状态模式。

> **状态模式定义**：对象行为的变化是由于状态的变化引入，那么即当内部状态发生变化的时候，就会改变对象的行为，而这种改变视乎就改变了整个类。

那么现在采用状态模式来解决问题：

##### 接口

```java
package study.designmode.statemode.state;

public interface State {
    void insertCoin();
    void returnCoin();
    void turnCrank();
    void dispense();
    void printState();
}
```

##### 准备状态

```java
package study.designmode.statemode.state;

import java.util.Random;

public class HasCoin implements State {
    private CandyMachine mCandyMachine;

    public HasCoin(CandyMachine mCandyMachine) {
        this.mCandyMachine = mCandyMachine;
    }

    @Override
    public void insertCoin() {
        System.out.println("you can't insert another coin!");
    }

    @Override
    public void returnCoin() {
        System.out.println("coin return!");
        mCandyMachine.setState(mCandyMachine.mOnReadyState);
    }

    @Override
    public void turnCrank() {
        System.out.println("crank turn...!");
        Random ranwinner=new Random();
        int winner=ranwinner.nextInt(10);
        if (winner==0) {
            mCandyMachine.setState(mCandyMachine.mWinnerState);

        } else {
            mCandyMachine.setState(mCandyMachine.mSoldState);
        }
    }

    @Override
    public void dispense() {
    }

    @Override
    public void printstate() {
        System.out.println("***HasCoin***");
    }
}
```

> **说明**：我们会发现里面存在一个糖果机的属性，而之所以存在这个属性，就是因为糖果机中持有所有的状态，而在准备状态下，肯定会由于某种行为发生状态改变，而要改变的状态都在糖果机中，所以持有一个糖果机属性，下面也一样，不在重复说明。

##### 待机状态

```java    
package study.designmode.statemode.state;

public class OnReadyState implements State {
    private CandyMachine mCandyMachine;
    public OnReadyState(CandyMachine mCandyMachine) {
        this.mCandyMachine=mCandyMachine;
    }

    @Override
    public void insertCoin() {
        System.out.println("you have inserted a coin,next,please turn crank!");
        mCandyMachine.setState(mCandyMachine.mHasCoin);
    }

    @Override
    public void returnCoin() {
        System.out.println("you haven't inserted a coin yet!");   
    }

    @Override
    public void turnCrank() {
        System.out.println("you turned,but you haven't inserted a coin!");
    }

    @Override
    public void dispense() {
    }

    @Override
    public void printstate() {
        System.out.println("***OnReadyState***");
    }
}
```

##### 初始状态

```java    
package study.designmode.statemode.state;

public class SoldOutState implements State {

    private CandyMachine mCandyMachine;
    public SoldOutState(CandyMachine mCandyMachine) {
        this.mCandyMachine=mCandyMachine;
    }

    @Override
    public void insertCoin() {
        System.out.println("you can't insert coin,the machine sold out!");
    }

    @Override
    public void returnCoin() {
        System.out.println("you can't return,you haven't inserted a coin yet!");
    }

    @Override
    public void turnCrank() {
        System.out.println("you turned,but there are no candies!");
    }

    @Override
    public void dispense() {
    }

    @Override
    public void printstate() {
        System.out.println("***SoldOutState***");
    }

}
```

##### 售出状态

```java    
package study.designmode.statemode.state;

public class SoldState implements State {
    private CandyMachine mCandyMachine;

    public SoldState(CandyMachine mCandyMachine) {
        this.mCandyMachine=mCandyMachine;
    }

    @Override
    public void insertCoin() {
        System.out.println("please wait!we are giving you a candy!");
    }

    @Override
    public void returnCoin() {
        System.out.println("you haven't inserted a coin yet!");
    }

    @Override
    public void turnCrank() {
        System.out.println("we are giving you a candy,turning another get nothing,!");
    }

    @Override
    public void dispense() {
        mCandyMachine.releaseCandy();
        if (mCandyMachine.getCount() > 0) {
            mCandyMachine.setState(mCandyMachine.mOnReadyState);
        } else {
            System.out.println("Oo,out of candies");
            mCandyMachine.setState(mCandyMachine.mSoldOutState);
        }
    }

    @Override
    public void printstate() {
        System.out.println("***SoldState***");
    }
}
```

##### 赢家状态

```java    
package study.designmode.statemode.state;

public class WinnerState implements State {

    private CandyMachine mCandyMachine;

    public WinnerState(CandyMachine mCandyMachine) {
        this.mCandyMachine = mCandyMachine;
    }

    @Override
    public void insertCoin() {
        System.out.println("please wait!we are giving you a candy!");
    }

    @Override
    public void returnCoin() {
        System.out.println("you haven't inserted a coin yet!");
    }

    @Override
    public void turnCrank() {
        System.out.println("we are giving you a candy,turning another get nothing,!");
    }

    @Override
    public void dispense() {
        mCandyMachine.releaseCandy();
        if (mCandyMachine.getCount() == 0) {
            mCandyMachine.setState(mCandyMachine.mSoldOutState);
        } else {
            System.out.println("you are a winner!you get another candy!");
            mCandyMachine.releaseCandy();
            if (mCandyMachine.getCount() > 0) {
                mCandyMachine.setState(mCandyMachine.mOnReadyState);
            } else {
                System.out.println("Oo,out of candies");
                mCandyMachine.setState(mCandyMachine.mSoldOutState);
            }
        }
    }

    @Override
    public void printstate() {
        System.out.println("***WinnerState***");
    }
}
```

##### 集成

糖果机要持有所有的状态，并在初始化的时候，要设置其开始的状态，然后糖果的各个行为，就委托到了各个状态中自己维护

```java
package study.designmode.statemode.state;

public class CandyMachine {

    State mSoldOutState;
    State mOnReadyState;
    State mHasCoin;
    State mSoldState;
    State mWinnerState;
    private State state;
    private int count;

    public CandyMachine(int count) {
        this.count = count;
        mSoldOutState = new SoldOutState(this);
        mOnReadyState = new OnReadyState(this);
        mHasCoin = new HasCoin(this);
        mSoldState = new SoldState(this);
        mWinnerState = new WinnerState(this);
        if (count > 0) {
            state = mOnReadyState;
        } else {
            state = mSoldOutState;
        }
    }

    public void setState(State state) {
        this.state = state;
    }

    public void insertCoin() {
        state.insertCoin();
    }

    public void returnCoin() {
        state.returnCoin();
    }

    public void turnCrank() {
        state.turnCrank();
        state.dispense();
    }

    void releaseCandy() {
        if (count > 0) {
            count = count - 1;
            System.out.println("a candy rolling out!");
        }
    }

    public int getCount() {
        return count;
    }

    public void printstate() {
        state.printstate();
    }
}
```

##### 测试

```java    
package study.designmode.statemode.state;

public class MainTest {
    public static void main(String[] args) {
        CandyMachine mCandyMachine = new CandyMachine(6);
        mCandyMachine.printstate();

        mCandyMachine.insertCoin();
        mCandyMachine.printstate();

        mCandyMachine.turnCrank();
        mCandyMachine.printstate();

        mCandyMachine.insertCoin();
        mCandyMachine.printstate();

        mCandyMachine.turnCrank();
        mCandyMachine.printstate();
    }
}
```

结果如下:

![Test Result](\img\状态模式测试结果.png)

和开始的传统方案对比，结果是一样的，但是具备了可扩展性。

#### 总结

  1. 状态模式允许对象在内部状态改变时改变它的行为，对象看起来好像修改了它的类。

> 这个模式将状态封装成独立的类，并将动作委托到代表当前状态的对象，这就是说行为会随着内部状态而改变。“看起来好像修改了它的类”是什么意思呢？从客户的视角来看：如果说你使用的对象能够完全改变它的行为，那么你会觉得，这个对象实际上是从别的类实例化而来的。然而，实际上，你知道我们是在使用组合通过简单引用不同的状态对象来造成类改变的假象

  2. 状态模式要点

* 客户不会和状态进行交互,全盘了解状态是 context的工作
* 在状态模式中，每个状态通过持有Context的引用，来实现状态转移
* 使用状态模式总是会增加设计中类的数目，这是为了要获得程序可扩展性，弹性的代价，如果你的代码不是一次性的，后期可能会不断加入不同的状态，那么状态模式的设计是绝对值得的。【同时也是一个缺点】
* 状态类可以被多个context实例共享

  3. 状态模式和策略模式对比

* 相似之处

  * 添加新的状态或策略都很容易，而且不需要修改使用它们的Context对象。
  * 它们都让你的代码符合OCP原则（软件对扩展应该是开发的，对修改应该是关闭的）。在状态模式和策略模式中，Context对象对修改是关闭的，添加新的状态或策略，都不需要修改Context。
  * 正如状态模式中的Context会有初始状态一样，策略模式同样有默认策略。
  * 状态模式以不同的状态封装不同的行为，而策略模式以不同的策略封装不同的行为。
  * 它们都依赖子类去实现相关行为
* 不同

  * 状态模式帮助对象管理状态，我们将一群行为封装早状态对象中,context的行为随时可委托到那些状态中的一个.随着时间的流逝，当前状态在状态对象集合中游走改变，以反映context内部状态，因此，context的行为也会跟着改变。当要添加新的状态时，不需要修改原来代码添加新的状态类即可。
  * 而策略模式允许Client选择不同的行为。通过封装一组相关算法，为Client提供运行时的灵活性。Client可以在运行时，选择任一算法，而不改变使用算法的Context。一些流行的策略模式的例子是写那些使用算法的代码，例如加密算法、压缩算法、排序算法。客户通常主动指定context所要组合的策略对象是哪一个.
  * **最根本的差异**在于策略模式是在求解同一个问题的多种解法，这些不同解法之间毫无关联；状态模式则不同，状态模式要求各个状态之间有所关联，以便实现状态转移。

#### 参考

  1. [JAVA设计模式：状态模式 - pony1223 - 博客园](http://www.cnblogs.com/pony1223/p/7518226.html)