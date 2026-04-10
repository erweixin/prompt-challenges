# Prompt Challenges Site

A platform for prompt engineering challenges, similar to LeetCode but for prompt engineering skills.

## Features

- **Challenge Library**: A collection of prompt engineering challenges with different difficulty levels
- **Real-time Streaming Scoring**: AI-powered prompt scoring system with live streaming feedback using DeepSeek
- **Multi-language Support**: Chinese and English interfaces
- **Responsive Design**: Works on desktop and mobile devices
- **Dark Mode**: Built-in dark mode support
- **Cancellable Operations**: Users can cancel ongoing scoring requests

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prompt-challenges/site
```

2. Install dependencies:
```bash
npm install
# or
pnpm install
```

3. Set up environment variables:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your DeepSeek API key:
```bash
OPENROUTER_API_KEY=your_deepseek_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Running the Development Server

```bash
npm run dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Prompt Scoring System

The platform includes an AI-powered streaming scoring system that evaluates user prompts in real-time based on:

- **Clarity**: How clear and unambiguous the prompt is
- **Completeness**: Whether it includes all necessary information
- **Operability**: How easy it is to understand and execute
- **Adaptability**: How well it fits the target task

### Streaming Features

- **Real-time Feedback**: Watch AI analyze your prompt as it generates the evaluation
- **Progressive Display**: Content appears gradually, providing a natural reading experience
- **Cancellable Requests**: Cancel ongoing scoring operations at any time
- **Live Status Updates**: See the current status of the scoring process

### How to Use the Scoring System

1. Navigate to any challenge page
2. Scroll down to find the "Prompt Scoring System" section
3. Enter your prompt in the text area
4. Click "Get Score" to start the streaming evaluation
5. Watch AI generate the evaluation in real-time
6. Review the final score, feedback, and improvement suggestions
7. Use the "Cancel" button to stop the process if needed

### Scoring Criteria

- **Score Range**: 0-10 points
- **Excellent (9-10)**: Outstanding prompt quality
- **Good (7-8)**: Well-structured and effective
- **Average (5-6)**: Adequate but room for improvement
- **Needs Improvement (0-4)**: Requires significant optimization

## Project Structure

```
site/
├── src/
│   ├── app/                 # Next.js app router
│   │   ├── api/            # API routes
│   │   │   └── score/      # Streaming scoring API
│   │   ├── challenge/      # Challenge pages
│   │   ├── en/            # English pages
│   │   └── zh/            # Chinese pages
│   ├── components/         # React components
│   │   ├── PromptScorer.tsx # Streaming scoring component
│   │   └── ...
│   ├── utils/             # Utility functions
│   │   ├── challenge-parser.ts # Content parsing
│   │   └── ...
│   └── types/             # TypeScript types
├── questions/             # Challenge content
└── public/               # Static assets
```

## API Endpoints

### POST /api/score

Evaluates a user's prompt using AI with streaming response.

**Request Body:**
```json
{
  "userPrompt": "string",
  "question": "string", 
  "inputText": "string",
  "llmResult": "string"
}
```

**Streaming Response:**
```
data: {"type": "partial", "content": "部分内容"}

data: {"type": "complete", "data": {"评分": 8, "反馈": "详细反馈", "优化意见": "优化建议"}}
```

## Testing

### Manual Testing

1. Start the development server
2. Navigate to a challenge page
3. Use the streaming scoring system to test prompts

### Automated Testing

Run the streaming test script:
```bash
node test-scoring.js
```

This will test the complete streaming workflow including:
- Sending scoring requests
- Receiving streaming data
- Displaying real-time content
- Parsing final results

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or issues, please open an issue on GitHub.
