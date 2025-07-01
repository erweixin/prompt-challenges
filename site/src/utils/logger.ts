interface LogContext {
  requestId?: string;
  userId?: string;
  difficulty?: string;
  testCaseCount?: number;
  userAgent?: string;
  ip?: string;
  duration?: number;
  userPromptLength?: number;
  questionLength?: number;
  promptLength?: number;
  model?: string;
  retryCount?: number;
  memoryUsage?: Record<string, number>;
}

interface LogEntry {
  timestamp: string;
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG';
  message: string;
  context?: LogContext;
  data?: unknown;
  error?: {
    name: string;
    message: string;
    stack?: string;
  };
}

class Logger {
  private logLevel: string;
  private isDevelopment: boolean;

  constructor() {
    this.logLevel = process.env.LOG_LEVEL || 'info';
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private shouldLog(level: string): boolean {
    const levels = { DEBUG: 0, INFO: 1, WARN: 2, ERROR: 3 };
    const currentLevel = levels[this.logLevel.toUpperCase() as keyof typeof levels] ?? 1;
    const messageLevel = levels[level as keyof typeof levels] ?? 1;
    return messageLevel >= currentLevel;
  }

  private formatLog(entry: LogEntry): string {
    if (this.isDevelopment) {
      // 开发环境：彩色控制台输出
      const colors = {
        INFO: '\x1b[36m', // 青色
        WARN: '\x1b[33m', // 黄色
        ERROR: '\x1b[31m', // 红色
        DEBUG: '\x1b[35m', // 紫色
        RESET: '\x1b[0m'
      };
      
      let output = `${colors[entry.level]}${entry.level}${colors.RESET} [${entry.timestamp}] ${entry.message}`;
      
      if (entry.context) {
        output += ` | Context: ${JSON.stringify(entry.context)}`;
      }
      
      if (entry.data) {
        output += ` | Data: ${JSON.stringify(entry.data)}`;
      }
      
      if (entry.error) {
        output += ` | Error: ${entry.error.name}: ${entry.error.message}`;
      }
      
      return output;
    } else {
      // 生产环境：结构化JSON格式
      return JSON.stringify(entry);
    }
  }

  private log(level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG', message: string, context?: LogContext, data?: unknown, error?: Error) {
    if (!this.shouldLog(level)) return;

    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      context,
      data,
      error: error ? {
        name: error.name,
        message: error.message,
        stack: this.isDevelopment ? error.stack : undefined
      } : undefined
    };

    const formattedLog = this.formatLog(entry);
    
    switch (level) {
      case 'ERROR':
        console.error(formattedLog);
        break;
      case 'WARN':
        console.warn(formattedLog);
        break;
      case 'DEBUG':
        console.debug(formattedLog);
        break;
      default:
        console.log(formattedLog);
    }
  }

  info(message: string, context?: LogContext, data?: unknown) {
    this.log('INFO', message, context, data);
  }

  warn(message: string, context?: LogContext, data?: unknown) {
    this.log('WARN', message, context, data);
  }

  error(message: string, context?: LogContext, error?: Error) {
    this.log('ERROR', message, context, undefined, error);
  }

  debug(message: string, context?: LogContext, data?: unknown) {
    this.log('DEBUG', message, context, data);
  }

  // 专门用于API请求的日志方法
  apiRequest(requestId: string, method: string, url: string, context?: Omit<LogContext, 'requestId'>) {
    this.info(`API Request: ${method} ${url}`, { requestId, ...context });
  }

  apiResponse(requestId: string, statusCode: number, duration: number, context?: Omit<LogContext, 'requestId'>) {
    this.info(`API Response: ${statusCode} (${duration}ms)`, { requestId, duration, ...context });
  }

  // 专门用于AI模型调用的日志方法
  aiModelCall(requestId: string, model: string, duration: number, success: boolean, context?: Omit<LogContext, 'requestId'>) {
    const message = `AI Model Call: ${model} (${duration}ms) - ${success ? 'SUCCESS' : 'FAILED'}`;
    if (success) {
      this.info(message, { requestId, duration, ...context });
    } else {
      this.warn(message, { requestId, duration, ...context });
    }
  }

  // 专门用于测试用例执行的日志方法
  testCaseExecution(requestId: string, testCaseIndex: number, success: boolean, duration: number, context?: Omit<LogContext, 'requestId'>) {
    const message = `Test Case ${testCaseIndex}: ${success ? 'PASS' : 'FAIL'} (${duration}ms)`;
    if (success) {
      this.debug(message, { requestId, duration, ...context });
    } else {
      this.warn(message, { requestId, duration, ...context });
    }
  }

  // 专门用于评分结果的日志方法
  scoringResult(requestId: string, score: number, difficulty: string, context?: Omit<LogContext, 'requestId'>) {
    this.info(`Scoring Result: ${score}/10 (${difficulty})`, { requestId, ...context });
  }
}

// 创建单例实例
export const logger = new Logger();

// 生成请求ID的工具函数
export function generateRequestId(): string {
  return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// 数据脱敏工具函数
export function sanitizeData(data: unknown, maxLength: number = 100): unknown {
  if (typeof data === 'string') {
    return data.length > maxLength ? data.substring(0, maxLength) + '...' : data;
  }
  if (typeof data === 'object' && data !== null) {
    const sanitized: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(data)) {
      // 跳过敏感字段
      if (['apiKey', 'token', 'password', 'secret'].includes(key.toLowerCase())) {
        sanitized[key] = '[REDACTED]';
      } else {
        sanitized[key] = sanitizeData(value, maxLength);
      }
    }
    return sanitized;
  }
  return data;
} 