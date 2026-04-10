import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center">
      <h2 className="text-2xl font-bold mb-4">404 - 页面未找到</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        很抱歉，您要查找的页面不存在。
      </p>
      <Link 
        href="/" 
        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md transition-colors"
      >
        返回首页
      </Link>
    </div>
  );
} 