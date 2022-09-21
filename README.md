# 杭州网达移动多端模板 wonder-mobile-template

## 开发准备

1. 克隆项目

2. 初始化

   ```
   # 使用 npm 安装依赖
   $ npm install

   # OR 使用 yarn
   $ yarn install
   ```

3. 全局安装 `@tarojs/cli` 脚手架，如已有可省略这一步

   ```
   # 使用 npm 安装 CLI
   $ npm install -g @tarojs/cli

   # OR 使用 yarn 安装 CLI
   $ yarn global add @tarojs/cli
   ```

4. 运行补丁包，如果项目中有修改node_modules的第三方库则运行，没有可省略

   ```
   # 使用 npm
   $ npm run postinstall

   # OR 使用 yarn
   $ yarn postinstall
   ```

5. 启动项目, 默认启动h5

   ```
   # 使用 npm
   $ npm run dev

   # OR 使用 yarn
   $ yarn dev
   ```

## git提交规范

1. 提交名称规范 **功能类型** + 文字说明
2. 功能类型说明如下：
   - chore 变构建流程、或者增加依赖库、工具等
   - docs 仅仅修改了文档，比如README
   - feat 新增功能
   - fix 修复bug
   - perf 优化相关，比如提升性能、体验
   - refactor 代码重构，没有加新功能或者修复bug
   - revert 回滚到上一个版本
   - style 仅仅修改了空格、格式缩进、逗号等等，不改变代码逻辑
   - test 测试用例，包括单元测试、集成测试等
   - merge 合并解决冲突

## 组件、接口、资源目录及引用方式
1. import 声明顺序遵循第三方库 > 公共文件夹 > 当前文件夹
```
import React, { useState, useEffect } from 'react'
import { View, Text } from '@tarojs/components'
import BasePage from '@/components/BasePage'
import './index.scss'
```
2. 目录
- 公共组件目录src/components
- 接口目录src/apis
- 资源目录src/assets


