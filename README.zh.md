# Prompt Challenges

面向普通人的 **大模型学习路径**：从类豆包的单轮查询，到 Cursor 式 IDE 协作，再到 OpenClaw 类本地 Agent 的 MCP、Skills、Harness 与安全治理。技术栈为 **[Astro 5](https://astro.build/)**，目标部署在 **Cloudflare Pages**（静态页面 + Worker 承载 `/api/score`）。

- 正式题目与读本：[`src/content/challenges/`](src/content/challenges/)（按 `foundation → prompt → tools → mcp → skills → harness → cross_cut` 排序，现已扩成双语读本串 + 练习串）
- 首页 `#resources`：按学习顺序组织的外链资源，覆盖结构化提示、工具 / IDE 协作、MCP、本地 Agent、Skills、Harness 与安全治理
- 旧 Next 站点（仅供参考）：[`_legacy/site/`](_legacy/site/)
- 旧题库归档：[`_archive/questions/`](_archive/questions/)

## 常用命令

```bash
npm install
npm run dev      # 默认跳转 /zh/
npm run build
npm run preview
```

## 评分接口

练习页会请求 `POST /api/score`。本地复制环境变量：

```bash
cp .env.example .env
# 填写 OPENROUTER_API_KEY（与旧站一致，走 DeepSeek 兼容端点）
```

云上在 Cloudflare Pages 项目里配置同名环境变量即可。

## Cloudflare Pages 设置

- 构建命令：`npm run build`
- 输出目录：`dist`

## 双语路由

`/zh/`、`/en/`；根路径 `/` 会 302 到 `/zh/`。
