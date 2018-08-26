render: function(createElement) {
    return createElement(
        'div', // HTML标签字符串或组件名
        {}, // 属性 
        [
            '我是div里的文字', 
            createElement(), 
            createElement(), 
            ...
        ] // String或者Array
    )
}

{
    // 和`v-bind:class`一样的 API
    // 接收一个字符串、对象或字符串和对象组成的数组
    'class': {
      foo: true,
      bar: false
    },
    // 和`v-bind:style`一样的 API
    // 接收一个字符串、对象或对象组成的数组
    style: {
      color: 'red',
      fontSize: '14px'
    },
    // 正常的 HTML 特性
    attrs: {
      id: 'foo'
    },
    // 组件 props
    props: {
      myProp: 'bar'
    },
    // DOM 属性
    domProps: {
      innerHTML: 'baz'
    },
    // 事件监听器基于 `on`
    // 所以不再支持如 `v-on:keyup.enter` 修饰器
    // 需要手动匹配 keyCode。
    on: {
      click: this.clickHandler
    },
    // 仅对于组件，用于监听原生事件，而不是组件内部使用
    // `vm.$emit` 触发的事件。
    nativeOn: {
      click: this.nativeClickHandler
    },
    // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
    // 赋值，因为 Vue 已经自动为你进行了同步。
    directives: [
      {
        name: 'my-custom-directive',
        value: '2',
        expression: '1 + 1',
        arg: 'foo',
        modifiers: {
          bar: true
        }
      }
    ],
    // 作用域插槽格式
    // { name: props => VNode | Array<VNode> }
    scopedSlots: {
      default: props => createElement('span', props.text)
    },
    // 如果组件是其他组件的子组件，需为插槽指定名称
    slot: 'name-of-slot',
    // 其他特殊顶层属性
    key: 'myKey',
    ref: 'myRef'
  }

<el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
        城市<i class="el-icon-arrow-down el-icon--right"></i> 
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="1">北京</el-dropdown-item> 
        <el-dropdown-item command="2">南京</el-dropdown-item>
    </el-dropdown-menu>
</el-dropdown>

renderCityName(createElement) {
    return createElement(
        'el-dropdown',
        { on: { command: this.handleCommand }},
        [
            createElement(
                'span',
                { 'class': 'el-dropdown-link' }, 
                '城市',
                createElement(
                    'i',
                    { 'class': 'el-icon-arrow-down el-icon–right' } 
                )
            ),
            createElement(
                'el-dropdown-menu',
                { slot: 'dropdown' },
                [
                    createElement( 
                        'el-dropdown-item',
                        { props: { command: '1' }}, 
                        '北京'
                    ),
                    createElement(
                        'el-dropdown-item',
                        { props: { command: '2' }}, 
                        '南京'
                    ) 
                ]
            ) 
        ]
    ) 
}

createDropdownColumnTitle(createElement, spanWord, commandList, handleCommand) {
    let dropdownMenu = []
    for (let key in commandList) {
        dropdownMenu.push(createElement(
            'el-dropdown-item', {
                props: {
                    command: key
                } 
            },
            commandList[key]
        ))
    }
    return createElement(
        'el-dropdown', {
            on: {
                command: handleCommand
            }
        }, [
            createElement(
                'span', {
                    'class': 'el-dropdown-link'
                }, [
                    spanWord,
                    createElement(
                        'i', {
                            'class': "el-icon-arrow-down el-icon--right"
                        }
                    ) 
                ]
            ),
            createElement(
                'el-dropdown-menu', {
                    slot: "dropdown"
                },
                dropdownMenu
            )
        ] 
    )
}

data(){
    spanCity: "城市", 
    commandCityList: {
        "1": "北京",
        "2": "南京" 
    }
}
methods: {
    handleCityCommand(command){
        console.log(command)
    } 
}
renderCity(createElement, { column, $index }) {
    return this.createDropdownColumnTitle( createElement, this.spanCity, 
        this.commandCityList,this.handleCityCommand)
}

renderCity(h){
    return (
        <el-dropdown onCommand={ this.handleCommand }>
            <span class="el-dropdown-link">
                城市<i class="el-icon-arrow-down el-icon--right"></i> 
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command='1'>北京</el-dropdown-item>
                <el-dropdown-item command='2'>南京</el-dropdown-item> 
            </el-dropdown-menu>
        </el-dropdown>
    )
}

<el-dropdown @command="handleCityCommand">
    <span class="el-dropdown-link">
        {{spanCity}}<i class="el-icon-arrow-down el-icon--right"></i>
    </span>
    <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="(value, key) in commandCityList" :key="key" :command="key">
            {{value}}
        </el-dropdown-item>
    </el-dropdown-menu>
</el-dropdown>

createDropdownColumnTitle(h, spanWord, commandList, handleCommand) {
    return (
        <el-dropdown onCommand={handleCommand}>
            <span class="el-dropdown-link">
                {spanWord} <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                {Object.keys(commandList).map(key=>
                    <el-dropdown-item command={key}>
                        {commandList[key]}
                    </el-dropdown-item>
                )}
            </el-dropdown-menu>
        </el-dropdown>
    ) 
}
renderCity(h, { column, $index }) {
     return this.createDropdownColumnTitle( h, this.spanCity, this.commandCityList, 
        this.handleCityCommand)
}