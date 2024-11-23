# React

## JSX

```jsx
// create a virtual dom
const element = <div>Hello World</div>;

// render the virtual dom to the DOM
ReactDOM.render(element, document.getElementById("root"));

// use js variables and define inline style
const name = "World";
const Welcome = <div style={{color: "red"}}>welcome, {name}</div>;

// A tag is treat as a html tag if its name starts with lowercase letter,
// otherwise a custom component
const MyComponent = (
    <div>
        <h1>Hello World</h1>
        <Welcome/>
    </div>
);
```

## 组件

React 组件可以通过函数和和类两种方式创建。

```jsx
// function component
const FuncComponent = () => {
    return <div>Hello World</div>;
};

// class component
import {Component} from "react";

class ClassComponent extends Component {
    render() {
        return <div>Hello World</div>;
    }
}
```

### 属性

`state` 是组件实例内部的状态，`props` 是组件外部传入的属性。

```jsx
import {Component} from "react";
import PropTypes from "prop-types";

class MyComponent extends Component {
    // define props type
    static propTypes = {
        title: PropTypes.string.isRequired,
    };

    // define state
    state = {
        count: 0,
    };

    handleClick = () => {
        // update state
        this.setState({count: this.state.count + 1});
    };

    render() {
        return (
            <div>
                <h1>{this.props.title}</h1>
                <p>{this.state.count}</p>
                <button onClick={this.handleClick}></button>
            </div>
        );
    }
}
```

### 生命周期

```jsx
import {Component} from "react";

class Life extends Component {
    state = {
        opacity: 1,
    };

    /**
     * Called immediately after a component is mounted.
     */
    componentDidMount() {
        this.timer = setInterval(() => {
            let {opacity} = this.state;
            opacity = opacity < 0.1 ? 1 : opacity - 0.1;
            this.setState({opacity: opacity});
        }, 200);
    }

    /**
     * Called immediately before a component is destroyed.
     */
    componentWillUnmount() {
        clearInterval(this.timer);
    }

    /**
     * Called every time the state is updated or the component is rendered initially
     */
    render() {
        return (
            <div style={{opacity: this.state.opacity}}>
                <h1>Hello World</h1>
            </div>
        );
    }
}
```

## PubSub

使用 [PubSub](https://github.com/mroderick/PubSubJS) 实现消息发布/订阅机制。

```jsx
import {Component} from "react";
import PubSub from "pubsub-js";

class Subscriber extends Component {
    state = {
        input: "",
    };

    componentDidMount() {
        // subscribe input change
        PubSub.subscribe("input-change", (_, data) => {
            this.setState({
                input: data,
            });
        });
    }

    render() {
        return (
            <div>
                <span>input: {this.state.input}</span>
            </div>
        );
    }
}

class Publisher extends Component {
    handleChange = (e) => {
        // publish input change
        PubSub.publish("input-change", e.target.value);
    };

    render() {
        return (
            <div>
                <input type={"text"} onChange={this.handleChange}/>
            </div>
        );
    }
}

export default class Container extends Component {
    render() {
        return (
            <div>
                <Publisher/>
                <Subscriber/>
            </div>
        );
    }
}
```

## 路由

### 路由组件

## 参考

- [React Reference](https://react.dev/reference/react)
- [尚硅谷 React 教程](https://www.bilibili.com/video/BV1wy4y1D7JT)
- [GitHub - mroderick/PubSubJS: Dependency free publish/subscribe for JavaScript](https://github.com/mroderick/PubSubJS)
- [Home | React Router](https://reactrouter.com/en/main)
