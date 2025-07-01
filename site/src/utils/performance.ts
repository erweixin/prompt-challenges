interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, unknown>;
}

class PerformanceMonitor {
  private metrics: Map<string, PerformanceMetric> = new Map();

  /**
   * 开始计时
   */
  start(name: string, metadata?: Record<string, unknown>): void {
    this.metrics.set(name, {
      name,
      startTime: performance.now(),
      metadata
    });
  }

  /**
   * 结束计时
   */
  end(name: string): PerformanceMetric | null {
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`Performance metric "${name}" not found`);
      return null;
    }

    metric.endTime = performance.now();
    metric.duration = metric.endTime - metric.startTime;
    
    return metric;
  }

  /**
   * 获取计时结果
   */
  getMetric(name: string): PerformanceMetric | null {
    return this.metrics.get(name) || null;
  }

  /**
   * 清除所有指标
   */
  clear(): void {
    this.metrics.clear();
  }

  /**
   * 获取所有指标
   */
  getAllMetrics(): PerformanceMetric[] {
    return Array.from(this.metrics.values());
  }

  /**
   * 测量异步函数执行时间
   */
  async measureAsync<T>(
    name: string, 
    fn: () => Promise<T>, 
    metadata?: Record<string, unknown>
  ): Promise<T> {
    this.start(name, metadata);
    try {
      const result = await fn();
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }

  /**
   * 测量同步函数执行时间
   */
  measureSync<T>(
    name: string, 
    fn: () => T, 
    metadata?: Record<string, unknown>
  ): T {
    this.start(name, metadata);
    try {
      const result = fn();
      this.end(name);
      return result;
    } catch (error) {
      this.end(name);
      throw error;
    }
  }
}

// 创建全局性能监控实例
export const performanceMonitor = new PerformanceMonitor();

// 便捷的装饰器函数
export function withPerformanceMonitoring<T extends unknown[], R>(
  name: string,
  fn: (...args: T) => R | Promise<R>
) {
  return async (...args: T): Promise<R> => {
    const result = fn(...args);
    if (result instanceof Promise) {
      return performanceMonitor.measureAsync(name, () => result);
    } else {
      return performanceMonitor.measureSync(name, () => result);
    }
  };
}

// 获取当前内存使用情况（仅在Node.js环境中可用）
export function getMemoryUsage(): Record<string, number> | null {
  if (typeof process !== 'undefined' && process.memoryUsage) {
    const usage = process.memoryUsage();
    return {
      rss: Math.round(usage.rss / 1024 / 1024), // MB
      heapTotal: Math.round(usage.heapTotal / 1024 / 1024), // MB
      heapUsed: Math.round(usage.heapUsed / 1024 / 1024), // MB
      external: Math.round(usage.external / 1024 / 1024), // MB
    };
  }
  return null;
} 