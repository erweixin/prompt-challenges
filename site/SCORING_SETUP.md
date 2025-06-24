# Prompt 评分功能设置指南

## 环境变量配置

要使用评分功能，你需要配置以下环境变量：

1. 创建 `.env.local` 文件在 `site/` 目录下
2. 添加以下配置：

```bash
# DeepSeek API Configuration
# 从 https://platform.deepseek.com/ 获取你的 API key
OPENROUTER_API_KEY=your_deepseek_api_key_here

# Site URL for API headers
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 获取 DeepSeek API Key

1. 访问 [DeepSeek Platform](https://platform.deepseek.com/)
2. 注册或登录账户
3. 进入 API Keys 页面
4. 创建新的 API key
5. 将 API key 复制到 `.env.local` 文件中

## 功能说明

### 流式评分系统
- 使用 DeepSeek Chat 模型进行 prompt 评分
- **实时流式处理**：用户可以看到 AI 实时生成评分过程
- 评分标准：满分 10 分
- 提供详细的反馈和优化建议
- 支持中文和英文界面
- 支持取消正在进行的评分请求

### 流式处理优势
- **实时反馈**：用户可以看到 AI 正在思考和分析
- **更好的用户体验**：不需要等待完整响应
- **可取消操作**：用户可以随时取消正在进行的评分
- **渐进式显示**：评分内容逐步显示，更自然

### 使用方法
1. 进入任意挑战页面
2. 在页面底部找到"Prompt 评分系统"
3. 输入你的 prompt
4. 点击"获取评分"按钮
5. 观察 AI 实时生成评分过程
6. 查看最终评分结果和反馈
7. 如需取消，点击"取消"按钮

### 评分标准
- **清晰度**：prompt 是否清晰明确
- **完整性**：是否包含所有必要信息
- **可操作性**：是否易于理解和执行
- **适应性**：是否适合目标任务

## 技术实现

- **API Route**: `/api/score` - 处理流式评分请求
- **组件**: `PromptScorer` - 前端流式评分界面
- **模型**: DeepSeek Chat via DeepSeek API
- **流式处理**: Server-Sent Events (SSE)
- **评分 Prompt**: 基于 `questions/extreme/04-prompt.ts` 模板

### 流式处理流程
1. 前端发送评分请求
2. 后端调用 DeepSeek API 启用流式模式
3. 实时接收 AI 生成的内容片段
4. 前端逐步显示生成的内容
5. 完成后解析 JSON 结果并显示最终评分

## 故障排除

### 常见问题

1. **API Key 错误**
   - 确保 API key 正确配置
   - 检查 DeepSeek 账户余额
   - 验证 API key 权限

2. **流式连接失败**
   - 检查网络连接
   - 验证 API 端点可访问性
   - 查看浏览器控制台错误信息

3. **解析错误**
   - 系统会自动处理 AI 响应解析问题
   - 如果持续失败，请检查 prompt 格式

4. **流式显示问题**
   - 确保浏览器支持 Server-Sent Events
   - 检查网络连接稳定性

### 调试模式

在开发环境中，可以在浏览器控制台查看详细的错误信息。

### 测试流式功能

运行测试脚本：
```bash
node test-scoring.js
```

这将测试完整的流式处理流程，包括：
- 发送评分请求
- 接收流式数据
- 显示实时内容
- 解析最终结果 