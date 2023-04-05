---
title: 前端组件设计
---

# [前端组件设计，得这样玩！](https://mp.weixin.qq.com/s?__biz=MzI3NTM5NDgzOA==&mid=2247511060&idx=1&sn=7ee9993caae2bf5c1be3829e67aaa34e&chksm=eb07946ddc701d7b5b358549ad94327613bca0cb4856ea44e75615ab2307d3260e1b815a2a1a&scene=90&sessionid=1677142237&subscene=236&key=46ff8a959fee0889f3b02449afd64d2a0dc6e97b2c230ad5933e313a0ee3fabbf17cedabf2b29dc078c0383437ccefbe8f6b8df449ffde8c032a1e32997f46c65a83a778667347efba0b835c042e3cfde7d3dbba67d0714fb83844fd3e2d52e3cb47e5fb943abe4f2de9b820a4bb8bece20eadb373ed974dd16cf528efa5f721&ascene=0&uin=NDc5MjEzODgy&devicetype=Windows+10+x64&version=6309001c&lang=zh_CN&countrycode=CN&exportkey=n_ChQIAhIQ1AGGxVsrxBp1Sa33UNdJFxLgAQIE97dBBAEAAAAAAGcCBIzZyK8AAAAOpnltbLcz9gKNyK89dVj0I1YA5D1cbfhd27s07RM9VJikhfPP7%2B4YZzgMNtaF718LK0SXZ60FD12eBIs7inO23JIpLFhz0jdrGW%2FMW%2FIF%2BtTYmPPJfA3FQVyr%2FAkmvj8bIielLrCKkdwCA7HWbX7IqZaMKMlvUsKK8evqSm5VefKf%2BUQOHHpAQDq1f9DMbZZgk%2FwMEgn9TEKc1sa3x8GjoHtBF0umaZIFDwv600Sibu3TqzkIQRG2JEYaaECJ5mS%2BLlRV5KdMbhxU&acctmode=0&pass_ticket=59I%2Fiew2q7JAXrCiidL5yao2eU7or%2B8GW%2Fko5lwzUrTPxGN41z9xclnjdiF6Mo2EPJMMK%2FWWL1VYoMJxilFnKA%3D%3D&wx_header=1&fontgear=2)

## **为何要进行前端组件设计？**

> “组件是对数据和方法的简单封装，是软件中具有相对独立功能、接口由契约指定、和语境有明显依赖关系、可独立部署、可组装的软件实体。”
>
> 这段百科中摘取的组件定义，揭示了组件所需要具备的特性：功能独立、约定一致、可集成、服务于场景。

## **如何提升组件易用性？**

### 合理的组件封装

前端组件按类型可以分为容器组件、功能组件和展示组件，一个优秀的组件应该保证：功能内聚、样式统一、并且与父元素仅通过Props通信。

1. **当该组件需要承载具体的额外功能时，相较于新增** **API** **，封装成独立的组件是更好的选择。**

1. **当组件中存在可能被单独使用、可以承载独立功能的子组件时，可以将其以内部组件的形式提供。**

### 规范的API编写

一个易用的组件，使用者无需阅读文档或仅快速浏览文档即可上手使用，并且应当在使用过程中给予清晰的注释和代码提示。希望以下API编写建议能够给组件开发者一些参考：

1. 减少必填的API项，尽可能多地提供默认值，降低组件的使用成本；

2. 使用通用且有意义的API命名：

3. 1. onXXX：命名监听/触发方法
   2. renderXXX：命名渲染方法
   3. beforeXXX/afterXXX：命名前置/后置动作
   4. xxxProps：命名子组件属性
   5. 优先使用常见单词进行命名，如：value、visible、size、disabled、label、type等等

4. 单独维护类型文件，并将其打包至组件产物包中，这样使用者在开发过程中能够实时看到对应的类型提示；

5. 在类型文件中，为API编写注释；

### [Slot] 与 [Props] 的选择

**使用Props存在的问题？**

当我们需要实现一个较为复杂的卡片需求组件时，为了最大程度地还原UI、减少用户的样式开发成本，首次设计时我们会设计出这样的API：

```
export type CardProps = {
  // 底部信息展示
  infoProps?: {
     title?: ReactNode;
     content?: ReactNode;
  };
  // 弹层信息展示
  moreInfoProps?: {
     info?: ReactNode;
     triggerProps?: TriggerProps;
     descriptionsProps?: DescriptionsProps;
  };
  className?: string;
  style?: CSSStyleSheet;
  width?: number | string;
  imageProps?: {
    srcList?: Array<SrcList>; // 图片url数组
    afterImgs?: React.ReactNode; // 插槽，在图片dom节点中
    aspectRatio?: string; // 宽高比  默认3:4
    buttonProps?: ButtonProps;
    current?: number; // 受控展示图
    defaultCurrent?: number; // 默认展示图
    onChangeCurrent?: (current: number) => undefined; // 设置current
    PreviewGroupProps?: ImagePreviewGroupProps;
    src?: string;
  };
  children?: React.ReactNode;
} & CardCheckboxProps;
```

可以看到，这个业务卡片组件是由多个不同组件组合而成，其承载了渲染和操作（选中操作、图片切换和弹层操作），这个设计的缺陷是显而易见的：

1. 需要编写很多分散的JSX代码，无论是写在Props中还是定义成单独的组件，其可读性都不高；
2. 需要在Card组件中杂糅许多额外的Props，例如triggerProps和descriptionsProps，增加了该组件的学习成本；

如果以插槽的方式对Card组件进行改造，通过内部组件间的组合来实现需求，避免了大量组件Props的堆砌，层次清晰、可读性高，这样的组件结构明显易用性更高。

```
<Card type="verticle" {...cardProps}>
  <CardImage {...ImageProps} />
  <CardContent {...InfoProps} >
      <div className="card-title">title</div>
      <div className="card-content">content</div>
      <Tag>Tag</Tag>
  </CardContent>
  <CardTrigger {...triggerProps}>
      <Description {...descriptionProps}/>
  </CardTrigger>
</Card>
```

**Slot(内部组件)的使用时机？**

- 布局类组件优先使用Slot，为开发者提供更灵活的使用方式，参考Typography、Layout、Card等组件，开发者可以随意地在这些组件内部插入自定义实现。上文提到的业务卡片组件，实质上也是一个封装了多图预览功能的布局组件，因此更适合使用Slot来组织代码。
- 内容复杂、定制化程度高的组件更适合使用Slot
- 功能类组件中，以Props传递ReactNode的方式来接管内部元素，尽量避免传递基础类型元素进行展示。

```
// ❌ 扩展性低
type CardProps {
    title?: string;
    tags?: string[];
}
// ✅ 为开发者提供对应的“插槽”
type CardProps {
    title?: string | ReactNode;
    tag?: string[] | ReactNode;
}
```

##  如何提升组件可扩展性？

开闭原则：对扩展开放，模块的行为可以被扩展；对修改关闭，模块中的源代码不应该被修改

### 将DOM交予用户接管

在前端组件中，应该提供对应的API属性或方法来支持额外的功能，给予开发者更充分的扩展空间，而不是有部分需求无法满足时放弃使用组件。

<img src="http://cdn.chen-zeqi.cn/image-20230223195332247.png" alt="image-20230223195332247" style="zoom: 50%;" />

<img src="http://cdn.chen-zeqi.cn/image-20230223195344880.png" alt="image-20230223195344880" style="zoom:50%;" />

### 设计可扩展的API

组件开发前，整理组件所需实现的功能，并以功能为维度设计组件API。

例：地区选择器、级联选择器（以功能划分）



##  Reference

https://arco.design/react/docs/start

https://juejin.cn/post/7160223720236122125

https://juejin.cn/post/6844904032700481550